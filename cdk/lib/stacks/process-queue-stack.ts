import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';

interface ProcessQueueStackProps extends cdk.StackProps {
  config: { envName: string; s3BucketName: string, lambdaEnvVars: Record<string, string> };
  buildVersion: string;
}

export class ProcessQueueStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ProcessQueueStackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'MyQueue', {
      visibilityTimeout: cdk.Duration.seconds(30),
      retentionPeriod: cdk.Duration.days(4),
    });

    const datadogLayer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      'DatadogLambdaLayer',
      `arn:aws:lambda:${props.env?.region}:464622532012:layer:Datadog-Node18-x:98`
    );

    const processQueueFunction = new lambda.Function(this, 'ProcessQueueFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      layers: [datadogLayer],
      code: lambda.Code.fromBucket(
        s3.Bucket.fromBucketName(this, 'LambdaArtifactsBucket', props.config.s3BucketName),
        `lambdas/processQueueMessage_${props.buildVersion}.zip`
      ),
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
      environment: {
        ...props.config.lambdaEnvVars,
        DD_TRACE_ENABLED: 'true',
        DD_ENV: props.config.envName,
        DD_SERVICE: 'your-service-name',
        DD_VERSION: props.buildVersion,
        DD_SITE: 'datadoghq.com',
        DD_LOGS_INJECTION: 'true'
      }
    });

    // Grant the Lambda permissions to consume messages
    queue.grantConsumeMessages(processQueueFunction);

    // Attach the queue as an event source to Lambda
    processQueueFunction.addEventSource(new lambdaEventSources.SqsEventSource(queue, {
      batchSize: 5,
    }));
  }
}

import { aws_s3, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

interface CreateUserStackProps extends StackProps {
  config: { envName: string; s3BucketName: string; lambdaEnvVars: Record<string, string> };
  buildVersion: string;
  lambdaEnvVars: { [key: string]: string };
}

export class CreateUserStack extends Stack {
  constructor(scope: Construct, id: string, props: CreateUserStackProps) {
    super(scope, id, props);

    const datadogLayer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      'DatadogLambdaLayer',
      `arn:aws:lambda:${props.env?.region}:464622532012:layer:Datadog-Node18-x:98`
    );

    new lambda.Function(this, 'CreateUserFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      layers: [datadogLayer],
      code: lambda.Code.fromBucket(
        aws_s3.Bucket.fromBucketName(this, 'LambdaBucket', props.config.s3BucketName),
        `lambdas/createUser_${props.buildVersion}.zip`
      ),
      environment: {
        ...props.config.lambdaEnvVars,
        DD_TRACE_ENABLED: 'true',
        DD_ENV: props.config.envName,
        DD_SERVICE: 'your-service-name',
        DD_VERSION: props.buildVersion,
        DD_SITE: 'datadoghq.com',
        DD_LOGS_INJECTION: 'true'
      },
      memorySize: 512,
      timeout: Duration.seconds(10),

    });
  }
}

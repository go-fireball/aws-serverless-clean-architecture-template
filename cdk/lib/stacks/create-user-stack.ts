import { aws_s3, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

interface CreateUserStackProps extends StackProps {
  config: { envName: string; s3BucketName: string; lambdaEnvVars: Record<string, string> };
  buildVersion: string;
}

export class CreateUserStack extends Stack {
  constructor(scope: Construct, id: string, props: CreateUserStackProps) {
    super(scope, id, props);

    new lambda.Function(this, 'CreateUserFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromBucket(
        aws_s3.Bucket.fromBucketName(this, 'LambdaBucket', props.config.s3BucketName),
        `lambdas/createUser_${props.buildVersion}.zip`
      ),
      environment: props.config.lambdaEnvVars,
      memorySize: 512,
      timeout: Duration.seconds(10),
    });
  }
}

export const devConfig = {
  envName: 'dev',
  account: '111111111111',
  region: 'us-east-1',
  lambdaEnvVars: {
    NODE_ENV: 'development',
    PAYMENT_SERVICE_URL: 'https://dev-payment.example.com',
    USER_TABLE: 'DevUserTable',
    LOG_LEVEL: 'debug',
    DD_TRACE_ENABLED: 'true',
    DD_SERVICE: 'your-service-name',
    DD_ENV: 'dev',
    DD_SITE: 'datadoghq.com'
  },
  s3BucketName: 'your-dev-lambda-artifacts',
};

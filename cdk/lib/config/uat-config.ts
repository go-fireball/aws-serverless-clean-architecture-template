export const uatConfig = {
  envName: 'dev',
  account: '111111111111',
  region: 'us-east-1',
  lambdaEnvVars: {
    NODE_ENV: 'development',
    PAYMENT_SERVICE_URL: 'https://dev-payment.example.com',
    USER_TABLE: 'DevUserTable'
  },
  s3BucketName: 'your-dev-lambda-artifacts',
};

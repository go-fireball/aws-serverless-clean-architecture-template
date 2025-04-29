#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CreateUserStack } from '../lib/stacks/create-user-stack';
import { devConfig } from '../lib/config/dev-config';
import { uatConfig } from '../lib/config/uat-config';
import { prodConfig } from '../lib/config/prod-config';
import { ProcessQueueStack } from '../lib/stacks/create-queue-stack';

const app = new cdk.App();

// Read stage and buildVersion from context
const stage = app.node.tryGetContext('stage') || 'dev';
const buildVersion = app.node.tryGetContext('buildVersion') || 'local';

let config;
switch (stage) {
  case 'dev':
    config = devConfig;
    break;
  case 'uat':
    config = uatConfig;
    break;
  case 'prod':
    config = prodConfig;
    break;
  default:
    throw new Error(`Unknown stage: ${stage}`);
}

// Pass buildVersion inside stack props if needed
new CreateUserStack(app, `${config.envName}-CreateUserStack`, {
  env: { account: config.account, region: config.region },
  config,
  buildVersion, // Pass explicitly to your Stack
});


new ProcessQueueStack(app, `${config.envName}-ProcessQueueStack`, {
  env: { account: config.account, region: config.region },
  config,
  buildVersion,
});
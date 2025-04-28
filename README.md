# AWS Serverless Clean Architecture Template

A production-grade AWS Lambda starter kit using Node.js, TypeScript, AWS CDK, esbuild bundling, S3 artifact deployments, and Clean Architecture layering.

## About this Template

This template provides a scalable and maintainable starting point for building AWS Lambda serverless applications with a clean, layered architecture.  
It is ideal for backend teams looking for:

- Multi-environment support (Dev, UAT, Prod)
- Clean separation of business logic, data access, and external integrations
- Fast builds and deployments with esbuild and AWS CDK
- Automated CI/CD pipelines using Azure DevOps

Designed for serious production projects, this template ensures scalability, testability, and easy maintenance.

## Built With

- [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/home.html) - Infrastructure as Code
- [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) - Serverless compute
- [TypeScript](https://www.typescriptlang.org/) - Strongly-typed JavaScript
- [esbuild](https://esbuild.github.io/) - Fast JavaScript bundler
- [Jest](https://jestjs.io/) - Unit testing framework
- [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/) - CI/CD Pipelines
- [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) - Code quality and formatting


## 🚀 Features

- Clean modular project structure (Handlers, Business Services, Data Services, Data Layer, Service Clients)
- AWS CDK for infrastructure (multi-stack, multi-environment)
- esbuild for fast bundling of individual Lambda functions
- Azure DevOps pipeline ready (build once, deploy many)
- Lambda artifacts are zipped and uploaded to S3 with build versioning
- CDK deploys Lambda functions from S3 versioned artifacts
- Unit-testable service layers (Jest preconfigured)
- Prettier + ESLint + Path aliasing (e.g., `@shared/*`)

---

## 📁 Folder Structure

```plaintext
src/
  lambdas/
    createUser/
      handler.ts
  shared/
    models/
    dtos/
    business-services/
    data-services/
    data-layer/
    service-clients/
    utils/
    constants/
    types/

cdk/
  bin/
  lib/
    stacks/
    config/

build/
  lambdas/
    createUser/
    ...

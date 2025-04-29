export class MessageProcessorService {
  constructor() {}

  async processMessage(message: never): Promise<void> {
    console.log('Processing SQS Message:', JSON.stringify(message, null, 2));
    // Future: Add actual business logic here
  }
}

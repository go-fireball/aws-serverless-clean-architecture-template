import { SQSEvent, Context } from 'aws-lambda';
import { MessageProcessorService } from '@shared/business-services/message-processor.service';

const messageProcessorService = new MessageProcessorService();

export const handler = async (event: SQSEvent, context: Context): Promise<void> => {
  for (const record of event.Records) {
    try {
      const messageBody = JSON.parse(record.body);
      await messageProcessorService.processMessage(messageBody);
    } catch (error) {
      console.error('Error processing message', error);
      // Optional: DLQ handling strategy
      throw error; // Rethrow to make Lambda fail and move message to DLQ after retries
    }
  }
};

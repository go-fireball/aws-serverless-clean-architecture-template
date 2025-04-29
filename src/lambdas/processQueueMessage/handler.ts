import { SQSEvent, Context } from 'aws-lambda';
import { withLambdaContext } from '@shared/utils/logger';
import { MessageProcessorService } from '@shared/business-services/message-processor.service';

export const handler = async (event: SQSEvent, context: Context): Promise<void> => {
  const log = withLambdaContext(context);

  const messageProcessorService = new MessageProcessorService(log);

  log.info('Received SQS event', { recordsCount: event.Records.length });

  for (const record of event.Records) {
    try {
      const messageBody = JSON.parse(record.body);
      log.info('Processing message', { messageBody });
      await messageProcessorService.processMessage(messageBody);
    } catch (error) {
      log.error({ err: error }, 'Error processing message');
      throw error;
    }
  }

  log.info('Finished processing SQS batch.');
};

import { Logger } from 'pino';

export class MessageProcessorService {
  constructor(private readonly logger: Logger) {}

  async processMessage(message: unknown): Promise<void> {
    this.logger.info('Processing message inside service', { message });
    // Future logic here
  }
}

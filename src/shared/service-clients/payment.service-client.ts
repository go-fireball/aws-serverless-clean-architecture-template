import axios from 'axios';
import { logger } from '@shared/utils/logger';


export class PaymentServiceClient {
    private readonly baseUrl = process.env.PAYMENT_SERVICE_URL || '';

    async createUserBillingAccount(userId: string): Promise<void> {
        try {
            await axios.post(`${this.baseUrl}/billing/accounts`, { userId });
            logger.info(`Billing account created for user: ${userId}`);
        } catch (error) {
            logger.info('Failed to create billing account: ' + error);
            // You might want to handle retries or fallback here
        }
    }
}

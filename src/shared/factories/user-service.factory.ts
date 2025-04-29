// shared/factories/user-service.factory.ts

import { UserService } from '@shared/business-services/user.service';
import { UserRepository } from '@shared/data-services/user.repository';
import { PaymentServiceClient } from '@shared/service-clients/payment.service-client';
import { Logger } from 'pino';

export function createUserService(logger: Logger): UserService {
    return new UserService(
        new UserRepository(),
        new PaymentServiceClient(),
        logger
    );
}

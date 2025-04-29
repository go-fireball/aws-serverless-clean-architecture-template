import { UserRepository } from '@shared/data-services/user.repository';
import { PaymentServiceClient } from '@shared/service-clients/payment.service-client';
import { CreateUserDto } from '@shared/dtos/create-user.dto';
import { User } from '@shared/models/user.model';
import {Logger} from "pino";

export class UserService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly paymentClient: PaymentServiceClient,
        private readonly logger: Logger
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.userRepo.createUser(dto);

        // (Optional) Interact with external services, e.g., notify billing
        await this.paymentClient.createUserBillingAccount(user.userId);

        return user;
    }
}

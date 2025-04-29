import { UserService } from '@shared/business-services/user.service';
import { UserRepository } from '@shared/data-services/user.repository';
import { PaymentServiceClient } from '@shared/service-clients/payment.service-client';
import { APIGatewayProxyHandler } from '@shared/types/api-gateway.types';
import { logger } from '@shared/utils/logger';


export const userService = new UserService(
    new UserRepository(),
    new PaymentServiceClient(),
);

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const body = JSON.parse(event.body || '{}');

        const newUser = await userService.createUser({
            email: body.email,
            password: body.password,
        });

        return {
            statusCode: 201,
            body: JSON.stringify(newUser),
        };
    } catch (error) {
        logger.error('Error creating user: ' + error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};

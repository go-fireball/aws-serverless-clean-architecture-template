import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { datadog } from 'datadog-lambda-js';
import { getLoggerWithTraceContext } from '@shared/utils/logger';
import {createUserService} from "@shared/factories/user-service.factory";


export const createUserHandler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
    context: Context,
): Promise<APIGatewayProxyResult> => {
    const logger = getLoggerWithTraceContext(context);

    try {
        const body = JSON.parse(event.body ?? '{}');
        const userService = createUserService(logger);

        const newUser = await userService.createUser({
            email: body.email,
            password: body.password,
        });

        logger.info({ userEmail: newUser.email }, 'User created successfully');

        return {
            statusCode: 201,
            body: JSON.stringify(newUser),
        };
    } catch (error: any) {
        logger.error({ err: error, message: error?.message }, 'Error creating user');

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};

export const handler = datadog(createUserHandler);

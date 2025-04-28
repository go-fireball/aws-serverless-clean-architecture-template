import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export type APIGatewayProxyHandler = (
    event: APIGatewayProxyEvent
) => Promise<APIGatewayProxyResult>;

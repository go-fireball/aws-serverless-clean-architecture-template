import { dynamoDbClient } from './dynamodb-client';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { CreateUserDto } from '@shared/dtos/create-user.dto';
import { User } from '@shared/models/user.model';
import { v4 as uuidv4 } from 'uuid';

export class UserDynamoDbDao {
    async createUser(dto: CreateUserDto): Promise<User> {
        const user: User = {
            userId: uuidv4(),
            email: dto.email,
            createdAt: new Date().toISOString(),
        };

        const command = new PutItemCommand({
            TableName: process.env.USER_TABLE!,
            Item: {
                userId: { S: user.userId },
                email: { S: user.email },
                createdAt: { S: user.createdAt },
            },
        });

        await dynamoDbClient.send(command);

        return user;
    }
}

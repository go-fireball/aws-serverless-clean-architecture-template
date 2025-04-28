import { UserDynamoDbDao } from '@shared/data-layer/dynamodb/user-dynamodb-dao';
import { CreateUserDto } from '@shared/dtos/create-user.dto';
import { User } from '@shared/models/user.model';

export class UserRepository {
    private readonly userDao = new UserDynamoDbDao();

    async createUser(dto: CreateUserDto): Promise<User> {
        return await this.userDao.createUser(dto);
    }
}

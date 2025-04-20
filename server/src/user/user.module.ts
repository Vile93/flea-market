import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryService } from './user-repository.service';

@Module({
    exports: [UserRepositoryService],
    controllers: [UserController],
    providers: [UserService, UserRepositoryService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryService } from './user-repository.service';
import { StorageModule } from 'src/storage/storage.module';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { OfferModule } from 'src/offer/offer.module';

@Module({
    imports: [StorageModule, BcryptModule, OfferModule],
    exports: [UserRepositoryService],
    controllers: [UserController],
    providers: [UserService, UserRepositoryService],
})
export class UserModule {}

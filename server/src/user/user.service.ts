import { Injectable, NotFoundException } from '@nestjs/common';
import { FindCategoryDto } from 'src/category/dto/find-category.dto';
import { Payload } from 'src/common/types/payload.interface';
import { StorageService } from 'src/storage/storage.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserRepositoryService } from 'src/user/user-repository.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepositoryService,
        private readonly storageService: StorageService,
        private readonly bcryptService: BcryptService,
    ) {}

    async findAll(findCategoryDto: FindCategoryDto) {
        const users = await this.userRepository.findAll(findCategoryDto);
        return users.map((user) => new UserEntity(user));
    }
    async findById(id: number) {
        const user = await this.userRepository.find({ id });
        if (!user) {
            throw new NotFoundException();
        }
        return new UserEntity(user);
    }
    async profile(payload: Payload) {
        const user = await this.userRepository.find({ id: payload.userId });
        if (!user) {
            throw new NotFoundException();
        }
        return new UserEntity(user);
    }
    async delete(id: number) {
        const user = await this.userRepository.find({ id });
        if (!user) {
            throw new NotFoundException();
        }
        await this.userRepository.delete({ id });
        return new UserEntity(user);
    }
    async updateUserProfile(payload: Payload, logo: Express.Multer.File, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.find({ id: payload.userId });
        if (!user) {
            throw new NotFoundException();
        }
        if (logo && user.avatar_path) {
            await this.storageService.deleteFile(user.avatar_path);
        }
        if (logo) {
            const logoPath = await this.storageService.uploadFile(logo, 'public-read');
            const updatedUser = await this.userRepository.update({
                data: { ...updateUserDto, avatar_path: logoPath },
                where: { id: payload.userId },
            });
            return updatedUser;
        }
        const updatedUser = await this.userRepository.update({
            data: updateUserDto,
            where: { id: payload.userId },
        });
        return updatedUser;
    }
    async updateUserByAdmin(id: number, logo: Express.Multer.File, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.find({ id });
        if (!user) {
            throw new NotFoundException();
        }
        if (logo && user.avatar_path) {
            await this.storageService.deleteFile(user.avatar_path);
        }
        if (logo) {
            const logoPath = await this.storageService.uploadFile(logo, 'public-read');
            const updatedUser = await this.userRepository.update({
                data: { ...updateUserDto, avatar_path: logoPath },
                where: { id },
            });
            return updatedUser;
        }
        const updatedUser = await this.userRepository.update({
            data: updateUserDto,
            where: { id },
        });
        return updatedUser;
    }
    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await this.bcryptService.hash(createUserDto.password);
        const user = await this.userRepository.create({ ...createUserDto, password: hashedPassword });
        return new UserEntity(user);
    }
}

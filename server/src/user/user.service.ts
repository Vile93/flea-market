import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Payload } from 'src/common/types/payload.type';
import { StorageService } from 'src/storage/storage.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserRepositoryService } from 'src/user/user-repository.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { BUCKET_NAMES } from 'src/common/constants';
import { FindOpts } from 'src/common/types/find-opts.interface';
import { Role } from '@prisma/client';
@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepositoryService,
        private readonly storageService: StorageService,
        private readonly bcryptService: BcryptService,
    ) {}

    async findAll(findOpts: FindOpts) {
        const totalCount = await this.userRepository.count(findOpts.where);
        const users = await this.userRepository.findAll(findOpts);
        return { data: users.map((user) => new UserEntity(user)), totalCount };
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
    async delete(id: number, payload: Payload) {
        const user = await this.userRepository.find({ id });
        if (!user) {
            throw new NotFoundException();
        }
        if (user.id === payload.userId) {
            throw new ForbiddenException('You cannot delete your own account');
        }
        if (user.role === Role.ROOT) {
            throw new ForbiddenException('You cannot delete root account');
        }
        if (user.role === Role.ADMIN && payload.role !== Role.ROOT) {
            throw new ForbiddenException('You cannot delete admin account');
        }
        if (user.role === Role.MODERATOR && payload.role !== Role.ROOT) {
            throw new ForbiddenException('You cannot delete moderator account');
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
            await this.storageService.deleteFile(user.avatar_path, BUCKET_NAMES.AVA_IMAGES);
        }
        if (logo) {
            const logoPath = await this.storageService.uploadFile(logo, BUCKET_NAMES.AVA_IMAGES, 'public-read');
            const updatedUser = await this.userRepository.update({
                data: { ...updateUserDto, avatar_path: logoPath },
                where: { id: payload.userId },
            });
            return new UserEntity(updatedUser);
        }
        const updatedUser = await this.userRepository.update({
            data: updateUserDto,
            where: { id: payload.userId },
        });
        return new UserEntity(updatedUser);
    }
    async updateUserByAdmin(id: number, logo: Express.Multer.File, payload: Payload, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.find({ id });
        if (!user) {
            throw new NotFoundException();
        }
        if (user.id === payload.userId && user.role !== updateUserDto.role) {
            throw new ForbiddenException('You cannot change your own role');
        }
        if (user.role !== updateUserDto.role && payload.role !== Role.ROOT) {
            throw new ForbiddenException('You can update only user account');
        }
        if (logo && user.avatar_path) {
            await this.storageService.deleteFile(user.avatar_path, BUCKET_NAMES.AVA_IMAGES);
        }
        const { password } = updateUserDto;
        let hashedPassword: string | undefined;
        if (password) {
            hashedPassword = await this.bcryptService.hash(password);
        }
        if (logo) {
            const logoPath = await this.storageService.uploadFile(logo, BUCKET_NAMES.AVA_IMAGES, 'public-read');
            const updatedUser = await this.userRepository.update({
                data: {
                    ...updateUserDto,
                    avatar_path: logoPath,
                    password: hashedPassword ? hashedPassword : user.password,
                },
                where: { id },
            });
            return new UserEntity(updatedUser);
        }
        const updatedUser = await this.userRepository.update({
            data: updateUserDto,
            where: { id },
        });
        return new UserEntity(updatedUser);
    }
    async create(createUserDto: CreateUserDto, payload: Payload) {
        if (payload.role !== Role.ROOT) {
            throw new ForbiddenException('You cannot create user');
        }
        const hashedPassword = await this.bcryptService.hash(createUserDto.password);
        const user = await this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
            is_verified: true,
            avatar_path: null,
        });
        return new UserEntity(user);
    }
}

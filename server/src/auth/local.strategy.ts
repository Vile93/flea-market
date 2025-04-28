import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UserRepositoryService } from 'src/user/user-repository.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userRepository: UserRepositoryService,
        private readonly bcryptService: BcryptService,
    ) {
        super({
            usernameField: 'login',
        });
    }

    async validate(login: string, password: string) {
        const candidate = await this.userRepository.findByLogin(login);
        if (!candidate) return null;
        const isCorrect = await this.bcryptService.compare(password, candidate.password);
        if (!isCorrect) return null;
        return { info: candidate };
    }
}

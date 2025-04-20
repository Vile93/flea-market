import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { UserRepositoryService } from 'src/user/user-repository.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userRepository: UserRepositoryService) {
        super({
            usernameField: 'login',
        });
    }

    async validate(login: string, password: string) {
        const candidate = await this.userRepository.findByLogin(login);
        if (!candidate) return null;
        const isCorrect = await bcrypt.compare(password, candidate.password);
        if (!isCorrect) return null;
        return { info: candidate };
    }
}

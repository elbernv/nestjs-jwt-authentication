import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthService } from '../services/jwt-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private jwtAuthService: JwtAuthService) {
        super({ usernameField: 'email', passwordField: 'password' });
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.jwtAuthService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

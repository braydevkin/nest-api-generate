import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SALT } from '@config/Constants';
import { TokenInfos } from '@shared/models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SALT,
        });
    }

    async validate(payload: TokenInfos): Promise<TokenInfos> {
        console.log('Passou');
        return {
            _id: payload._id,
            email: payload.email,
            name: payload.name,
            lastname: payload.lastname,
            roles: payload.roles,
        };
    }
}

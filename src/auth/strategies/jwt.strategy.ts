import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload, UserType } from '../../models';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromHeader('authorization'),
      ]),
      secretOrKey: configService.get('JWT_SECRET', 'jwt_secret'),
    });
  }

  validate({ sub, email }: JwtPayload): Pick<UserType, 'id' | 'email'> {
    return { id: sub, email };
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from '@shared/logger/Logger';
import { Model } from 'mongoose';
import { User } from '@mongoose/schemas/User';
import { InjectModel } from '@nestjs/mongoose';
import { APP_HOST, ROLES } from '@/config';
import { UsersService } from '../users/users.service';
import { SendProducerInviteInDTO } from './dto/send-producer-invite.dto';

@Injectable()
export class AuthenticationsService {
    constructor(private readonly usersService: UsersService, private logger: Logger) {
        this.logger.setContext(`${User.name}Service`);
    }
}

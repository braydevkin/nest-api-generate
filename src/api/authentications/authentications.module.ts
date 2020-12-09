import { Module } from '@nestjs/common';
import { User, UserSchema } from '@mongoose/schemas/User';
import { AuthenticationsController } from './authentications.controller';
import { AuthenticationsService } from './authentications.service';

import { LoggerModule } from '@shared/logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';

const mongooseFeatures = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]);
@Module({
    imports: [UsersModule, mongooseFeatures, LoggerModule],
    controllers: [AuthenticationsController],
    providers: [AuthenticationsService],
    exports: [mongooseFeatures, AuthenticationsService],
})
export class AuthenticationsModule {}

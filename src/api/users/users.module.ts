import { Module } from '@nestjs/common';
import { User, UserSchema } from '@mongoose/schemas/User';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerModule } from '@shared/logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';

const mongooseFeatures = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]);
@Module({
    imports: [mongooseFeatures, LoggerModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [mongooseFeatures, UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerModule } from '@shared/logger/logger.module';
import { User } from '@/database/entity/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const databaseEntitities = TypeOrmModule.forFeature([User]);
@Module({
    imports: [databaseEntitities, LoggerModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [databaseEntitities, UsersService],
})
export class UsersModule {}

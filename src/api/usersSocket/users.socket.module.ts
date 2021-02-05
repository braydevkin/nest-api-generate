import { Module } from '@nestjs/common';
import { LoggerModule } from '@shared/logger/logger.module';
import { UsersSocketGateway } from './users.socket.gateway';

@Module({
    imports: [LoggerModule],
    providers: [UsersSocketGateway],
    exports: [UsersSocketGateway],
})
export class UsersSocketModule {}

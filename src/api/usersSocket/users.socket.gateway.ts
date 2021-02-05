import { SocketGateway } from '@shared/socket/socket.gateway';
import { WebSocketGateway, GatewayMetadata } from '@nestjs/websockets';
import { Logger } from '@shared/logger/Logger';
import { Notification } from './types/Notification';
import { EmitToAllSockets } from '@/shared/socket/types/EmitToAllSockets';

@WebSocketGateway({
    origins: '*:*',
    namespace: '/users-socket',
} as GatewayMetadata)
export class UsersSocketGateway extends SocketGateway {
    constructor(private logger: Logger) {
        super();
        this.logger.setContext('UsersSocketGateway');
    }

    sendNotification(dto: EmitToAllSockets<Notification>): void {
        this.emitToAllSocketsByConnectionId(dto);
    }
}

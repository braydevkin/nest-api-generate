import { OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Connections, ConnectedSockets } from './types';
import { Server, Socket } from 'socket.io';
import { Cron } from '@nestjs/schedule';
import { EmitToAllSockets } from './types/EmitToAllSockets';

export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    connections: Connections = {};
    sockets: ConnectedSockets = {};

    emitToAllSocketsByConnectionId({ socketConnectionId, event, data }: EmitToAllSockets): void {
        const connection = this.connections[socketConnectionId];
        if (connection) {
            const socketIds = connection.socketIds;
            for (const socketId of socketIds) {
                const socket = this.sockets[socketId];
                if (socket) {
                    socket.socket.emit(event, data);
                }
            }
        }
    }

    @Cron('*/5 * * * *')
    cleanUnusedConnections(): void {
        const connectionIds = Object.keys(this.connections);

        for (const connectionId of connectionIds) {
            const connection = this.connections[connectionId];

            connection.socketIds = connection.socketIds.filter((socketId) => {
                return !!this.sockets[socketId];
            });

            if (connection.socketIds.length < 1) {
                delete this.connections[connectionId];
            } else {
                this.connections[connectionId] = connection;
            }
        }
    }

    handleConnection(socket: Socket): void {
        const { id } = socket.handshake.query;

        if (!this.connections[id]) {
            this.connections[id] = {
                socketIds: [socket.id],
            };
        } else {
            const socketIds = [...this.connections[id].socketIds, socket.id];
            this.connections[id] = {
                ...this.connections[id],
                socketIds: socketIds,
            };
        }

        this.sockets[socket.id] = {
            socket: socket,
        };
    }

    handleDisconnect(socket: Socket): void {
        delete this.sockets[socket.id];
    }
}

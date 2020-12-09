import { Socket } from 'socket.io';
import * as venom from 'venom-bot';

export interface SocketClientInfo {
    socket: Socket;
    socketId: string;
    userId: string;
    firebaseId: string;
}
export interface SocketClients {
    [key: string]: SocketClientInfo;
}

export interface Connection {
    userId: string;
    firebaseId: string;
}

export interface Connections {
    [key: string]: Connection;
}

export interface ConnectedSocket {
    socket: Socket;
    socketId: string;
}

export interface ConnectedSockets {
    [key: string]: ConnectedSocket[];
}

export interface ConnectedWhatsapp {
    session: string;
    client: venom.Whatsapp;
}

export interface ConnectedWhatsapps {
    [key: string]: ConnectedWhatsapp[];
}

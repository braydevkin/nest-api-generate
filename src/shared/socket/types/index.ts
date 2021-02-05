import { Socket } from 'socket.io';

export interface JSONObject {
    [key: string]: any;
}

export interface Connection {
    socketIds: string[];
    metadata?: JSONObject;
}

export interface Connections {
    [key: string]: Connection;
}

export interface ConnectedSocket {
    socket: Socket;
}

export interface ConnectedSockets {
    [socketId: string]: ConnectedSocket;
}

export interface EmitToAllSockets<Data = any> {
    socketConnectionId: string;
    event: string;
    data: Data;
}

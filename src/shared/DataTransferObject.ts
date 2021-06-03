import { Socket } from "socket.io";

export default interface SocketTypes extends Socket {
    userId?: number;
    nickname?: string;
    currentRoom?: string;
}

export default interface Payload extends Object {
    [key: string]: any
}
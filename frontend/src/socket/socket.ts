// socket.ts
import { io, Socket } from "socket.io-client";

const socketUrl = process.env.REACT_APP_SOCKET_URL;
console.log(socketUrl);
export const socket: Socket = io(socketUrl, {
  transports: ["websocket"],
});

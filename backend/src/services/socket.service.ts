import { Server, Socket } from "socket.io";
import { MessageResponseDto } from "../dtos/response/message.response.dto";
import { ChatResponseDto } from "../dtos/response/chat.response.dto";

export class SocketService {
  private io: Server;
  private userSockets: Map<string, string>; // userId -> socketId

  constructor(io: Server) {
    this.io = io;
    this.userSockets = new Map();

    this.io.on("connection", this.onConnection.bind(this));
  }

  private onConnection(socket: Socket) {
    socket.on("register", (userId: string) => {
      this.userSockets.set(userId, socket.id);
      socket.data.userId = userId;
    });

    socket.on("disconnect", () => {
      const userId = socket.data.userId;

      if (userId) {
        this.userSockets.delete(userId);
      }
    });
  }

  public sendToUser(message: MessageResponseDto, chat: ChatResponseDto) {
    const socketId = this.userSockets.get(chat.owner._id.toString());

    if (socketId) {
      this.io.to(socketId).emit("message", {
        message,
        chatId: chat._id,
      });
    }
  }
}

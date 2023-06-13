import { log } from "console";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
const secretKey = String(process.env.JWTSecret);
// socket server
// config io

class SocketIOServer {
  io: any;
  constructor(httpServer) {
    this.io = new Server(httpServer);
    this.setDefault();
  }

  setDefault() {
    this.io.use((socket, next) => {
      // Authentication in socket
      try {
        const token = socket.handshake.auth.token;
        const decoded = jwt.verify(token, secretKey);

        socket.join(`${socket.handshake.query.group}`);
        socket.user = decoded;
        next();
      } catch (error) {
        this.io.emit("error", new Error("Authentication error"));
        return next(new Error("Authentication error"));
      }
    });
    this.io.on("connection", (socket) => {
      // Xử lý sự kiện nhận tin nhắn từ khách hàng
      socket.on("message", (data) => {
        console.log("Received message:", data);
        const { group } = socket.handshake.query;
        // Gửi tin nhắn đã nhận cho tất cả các khách hàng đang kết nối
        this.io.to(group).emit("message", data);
      });

      socket.on("disconnect", () => {
        // console.log("Client disconnected");
      });
      socket.on("error", (error: Error) => {
        // console.log("Authentication error:", error.message);
      });
    });
  }
}

export { SocketIOServer };

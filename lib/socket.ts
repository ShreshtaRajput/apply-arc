import { Server } from "socket.io";

export default function getIO() {
  if (!(global as any).io) {
    throw new Error("Socket.io server not initialized");
  }
  return (global as any).io as Server;
}

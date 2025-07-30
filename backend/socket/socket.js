import http from "http";
import express from "express";
import { Server } from "socket.io"; // Use ESM import here

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:8000', 'http://localhost:8001', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
  console.log("🔍 Looking for receiver socket ID for user:", receiverId);
  console.log("🔍 Current userSocketMap:", userSocketMap);
  const socketId = userSocketMap[receiverId];
  console.log("🔍 Found socket ID:", socketId);
  return socketId;
};

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);
  const userId = socket.handshake.query.userId;
  console.log("🔍 User ID from query:", userId);
  
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    socket.join(userId); // Join the user to their own room
    console.log("✅ User stored in socket map:", userId, "->", socket.id);
    console.log("🔍 Updated userSocketMap:", userSocketMap);
  } else {
    console.log("❌ Invalid userId:", userId);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    if (userId) {
      delete userSocketMap[userId];
      console.log("✅ User removed from socket map:", userId);
      console.log("🔍 Updated userSocketMap:", userSocketMap);
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };

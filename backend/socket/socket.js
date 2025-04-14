// import { Server } from 'socket.io';
// import http from 'http';
// import express from 'express';

// // Express app for handling HTTP requests
// const app = express();

// // HTTP server that will handle both HTTP requests and WebSocket connections
// const server = http.createServer(app);

// // Socket.IO server setup
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:8000", // Allow connection from this origin only
//         methods: ["GET", "POST"]
//     }
// });

// export const getReceiverSocketId = (receiverId)=>{
//     return userSocketMap[receiverId];
// }

// const userSocketMap = {}; // Keeps track of userId to socketId mapping

// io.on('connection', (socket) => {
//     console.log("A user connected", socket.id);

//     const userId = socket.handshake.query.userId; // Get userId from the query parameters
    
//     if (userId && userId !== "undefined") {
//         userSocketMap[userId] = socket.id; // Store the socketId for the userId
//     }

//     // Emit the updated list of online users
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));

//     // Handle user disconnection
//     socket.on("disconnect", () => {
//         console.log("User disconnected", socket.id);

//         if (userId) {
//             delete userSocketMap[userId]; // Remove the user from the map
//         }

//         // Emit the updated list of online users after disconnection
//         io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     });
// });

// // Export app, io, and server to use in server.js
// export { app, io, server };

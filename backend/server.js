import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from "./socket/socket.js";

//const app=express(); // We have commented or deleted this bcz we have created server in socket.js of backend ;

const PORT = process.env.PORT || 5000;

dotenv.config();

//Middle layer
app.use(express.json()); //to parse/extract the incoming request with JSON payloads (from req.body)

app.use(cookieParser());

// Serve static files for uploaded images
app.use('/uploads', express.static('uploads'));

// Configure CORS to allow credentials and specific origins
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    const allowedOrigins = [
      "http://localhost:8000",
      "https://chat-app-new.vercel.app",
      /\.vercel\.app$/  // Allow all vercel.app subdomains
    ];
    
    if (!origin || allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    })) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and credentials
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//Middle layer
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRoutes);



// Await DB connection before starting the server
(async () => {
    try {
        await connectToMongoDB();
        server.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB, server not started.", error);
    }
})();

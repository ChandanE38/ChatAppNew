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

// Configure CORS to allow credentials and specific origin
app.use(cors({
  origin: "http://localhost:8000", // Frontend URL
  credentials: true, // Allow cookies and credentials
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//Middle layer
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRoutes);



server.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);

});


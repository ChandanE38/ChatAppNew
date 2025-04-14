import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from "./socket/socket.js";

// const app=express(); // We have commented or deleted this bcz we have created server in socket.js of backend ;

const PORT = process.env.PORT || 5000;

dotenv.config();

//Middle layer
app.use(express.json()); //to parse/extract the incoming request with JSON payloads (from req.body)

app.use(cookieParser());

// Allow all origins by using the default CORS configuration
app.use(cors()); // This allows access from any origin



// const app = express();

// Enable CORS for all origins (for development purposes)
app.use(cors({
  origin: "*",  // Allow all origins (not recommended for production)
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"]  // Allowed headers
}));

//Middle layer
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRoutes);



// app.get("/",(req,res)=>{
//     res.send("Hello raj World");
// });

// app.listen(PORT, ()=>{
//     connectToMongoDB();
//     console.log(`Server Running on port ${PORT}`);

// });



server.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);

});

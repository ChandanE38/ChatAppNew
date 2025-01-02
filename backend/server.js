import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from './db/connectToMongoDB.js';

const app=express();
const PORT = process.env.PORT || 5000;

dotenv.config();

//Middle layer
app.use(express.json()); //to parse/extract the incoming request with JSON payloads (from req.body)

app.use(cookieParser());


//Middle layer
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);



// app.get("/",(req,res)=>{
//     res.send("Hello raj World");
// });

app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);

});
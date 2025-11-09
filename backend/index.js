import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./route/user.route.js"
import messageRoute from "./route/message.route.js"
import { app, server } from "./SocketIO/server.js";
import path from 'path';

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const _dirname = path.resolve();

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
}


//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*', (_,res)=>{
    res.sendFile(path.resole(_dirname, "frontend", "dist", "index.html"))
})

// code for deployment

// if(process.env.NODE_ENV === 'production'){
//     const dirPath = path.resolve();
//     app.use(express.static("./frontend/dist"));
//     app.get('*', (req,res) => {
//         res.sendFile(path.resolve(dirPath, './frontend/dist', 'index.html'))
//     })
// }




server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
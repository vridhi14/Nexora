import express, { application } from "express";
import "dotenv/config" ;
import User from "./models/user.model.js";
import { connect } from "mongoose";
import { connectDB } from "./lib/db.js";
import fs from 'fs' ; 
import path from 'path';
import job from './lib/cron.js'
import clerkWebhook from "./webhooks/clerk.webhook.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import {clerkMiddleware} from "@clerk/express"
import cors from "cors"
import {app , server} from "./lib/socket.js"


const PORT = process.env.PORT ;
const FRONTEND_URL = process.env.FRONTEND_URL ;

const publicDir = path.join(process.cwd() , "public")

//middlewares
app.use("/api/webhooks/clerk",express.raw({type:"application/json"}) , clerkWebhook)

app.use(express.json());
app.use(cors({origin:FRONTEND_URL , credentials : true}));
app.use(clerkMiddleware());

app.use("api/auth" , authRoutes);
app.use("api/messages" , messageRoutes);

app.get("/health", (req,res)=>{
    res.status(200).json({ok :true});
});

//if the public dir exists , serve the static files 
//this is for the production build
if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir));
}
app.get("/{*any}" , (req,res,next)=>{
    res.sendFile(path.join(publicDir, "index.html") , (err)=>next(err));
})
server.listen(PORT , ()=>{
    connectDB();
    console.log('server is runnning on port:' , PORT);

    if(process.env.NODE_ENV === "production"){job.start();}
})
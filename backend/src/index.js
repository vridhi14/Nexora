import express from "express";
import "dotenv/config" ;
import User from "./models/user.model.js";
import { connect } from "mongoose";
import { connectDb } from "./lib/db.js";
import fs from 'fs' ; 
import path from 'path';

import {clerkMiddleware} from "@clerk/express"
import cors from "cors"

const app = express(); 
const PORT = process.env.PORT ;
const FRONTEND_URL = process.env.FRONTEND_URL ;

const publicDir = path.join(process.cwd() , "public")

//middlewares
app.use(express.json());
app.use(cors({origin:FRONTEND_URL , credentials : true}));
app.use(clerkMiddleware());

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
app.listen(PORT , ()=>{
    connectDb();
    console.log('server is runnning on port:' , PORT)
})
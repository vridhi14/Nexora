import { getAuth } from "@clerk/express";
import User from "../models/user.model.js";

export async function protectRoute(req,res,next) {
    try{
        const {userId} = getAuth(req);
        if(!userId){
            res.status(401).json({message:"Unauthorized"})
            return; 
        }
        
        // const user = await User.findOne({
        //     clerkId: userId
        // });

        console.log("Logged in Clerk User:", userId);

        const allUsers = await User.find();
        
        console.log(
          allUsers.map(u => ({
            clerkId: u.clerkId,
            email: u.email
          }))
        );
        
        const user = await User.findOne({
          clerkId: userId
        });

        if(!user){
            return res.status(404).json({message:"user profile is not synced yet"})
            
        }
        req.user = user
        next()
    }
    catch(error){
        console.log("error in protectRoute middleware");
        return res.status(500).json({message:"Internal server error"});
    }
}
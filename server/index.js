import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

import connectDB from "./db/index.js";
import User from "./models/user.model.js";
import jwt from "jsonwebtoken";

const app=Express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}));
app.use(Express.json());
app.use(Express.urlencoded({extended:true}));
app.use(cookieParser());

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

connectDB()
.then(()=>{
    try {
        app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    });
    } catch (error) {
        console.log("Server Connection failed. Error:",error);
    }
})
.catch((error)=>{
    console.log("DB Connection failed. Error:",error);
});


//ROUTES

app.post("/register",async (req,res)=>{
    const {username,password}=req.body;
    const userExist = await User.findOne({ username: username });
    if (userExist){
        return res.status(400).json("User already exists");
    }else{
        try {
        const newUser=await User.create({
            username,
            password:bcrypt.hashSync(password,salt)
        });
        res.status(201).json("User created successfully");
    } catch (error) {
        res.status(500).json({error:error.message});
    }
    }   
});

app.post("/login",async (req,res)=>{
    const {username,password}=req.body;
    const user= await User.findOne({username:username});
    if(!user){
        return res.status(401).json("Wrong username or password");
    }
    else{
        const passwordCorrect=bcrypt.compareSync(password,user.password);
        if(passwordCorrect){
            jwt.sign({username:username,id:user._id},process.env.JWT_SECRET,(err,token)=>{
                if(err){
                    return res.status(500).json({error:err.message});
                }
                else{
                    return res.status(200).cookie("token",token).json({
                        username:username,
                        id:user._id
                    });
                }
            });
        }
        else{
            return res.status(401).json("Wrong username or password");
        }
    }
}); 

app.get("/profile",async (req,res)=>{
    const {token}=req.cookies;
    if(!token){
        return res.status(401).json("Unauthorized");
    }
    else{
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                return res.status(401).json("Unauthorized");
            }
            else{
                return res.status(200).json(decoded);
            }
        });
    }
})

app.post("/logout",(req,res)=>{
    try {
        res.clearCookie("token").json("Logged out successfully");
    } catch (error) {
        console.log(error);
    }
})
    



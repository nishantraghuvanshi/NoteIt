import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";

import connectDB from "./db/index.js";
import User from "./models/user.model.js";

const app=Express();
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({extended:true}));

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


//Routes

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


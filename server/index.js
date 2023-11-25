import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app=Express();
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({extended:true}));

app.post("/register",(req,res)=>{
    const {username,password}=req.body;
});


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
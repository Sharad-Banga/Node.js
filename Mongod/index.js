import express from "express";
const app = express();
import {UserModel,todoModel} from "./db.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const JWT_SECRET = "sharad123";
import {z} from "zod";
mongoose.connect("mongodb+srv://sharad_banga:sharad@cluster0.8vv4o.mongodb.net/");

app.use(express.json());

app.post("/signup",async (req,res)=>{

  
  const reqBody = z.object({
    email:z.string().min(3).email(),
    name:z.string(),
    password : z.string()
  })

  const zodPassed = reqBody.safeParse(req.body);


  if(!zodPassed.success){
    //input not good
  }


  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const hashedPassword = await bcrypt.hash(password, 5);

  await UserModel.create({
    email:email,
    password:hashedPassword,
    name:name
  })

  res.json({
    message:"signed up"
  })
});

app.post("/login",async (req,res)=>{

  const email = req.body.email;
  const password = req.body.password;

  const yes = await UserModel.findOne({
    email : email
  });

  const passMatch = bcrypt.compare(password ,yes.password);

  if(yes && passMatch){
    const token = jwt.sign({
      id : yes._id
    } , JWT_SECRET);

    res.json({
      "message":"logged in",
      token:token
    })
  }
  else{
    res.send({
      "message" : "wrong hai ji"
    })
  }



});


app.post("/todo",auth,(req,res)=>{

  

});


app.get("/todos",auth,(req,res)=>{
    const id = req.userid;
    res.send({
      message:"this is your  ff content",
      id: id
    })
});


function auth(req,res,next){
  const token = req.headers.token;
  const inn = jwt.verify(token,JWT_SECRET);

  if(inn){
    req.userid = inn._id;
    next();
  }
  else{
    res.send({
      "message":"not logged in"
    })
  }
}

app.listen(3000);
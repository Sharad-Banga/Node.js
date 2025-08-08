import express from "express";
const app = express();
import {UserModel,todoModel} from "./db.js";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://sharad_banga:sharad@cluster0.8vv4o.mongodb.net/");

app.use(express.json());

app.post("/signup",async (req,res)=>{

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
    email:email,
    password:password,
    name:name
  })

  res.json({
    message:"signed up"
  })
});

app.post("/login",(req,res)=>{

});


app.post("/todo",(req,res)=>{

});


app.get("/todos",(req,res)=>{

});

app.listen(3000);
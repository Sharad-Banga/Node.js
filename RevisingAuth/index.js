import express from "express";
import jwt from "jsonwebtoken";
const app = express();
const user = [];
const JWT_SECRET = "leiufh";
app.use(express.json());

app.post("/signup",(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  user.push({
    username :username,
    password : password
  })
  res.json({
    user
  })
})

app.post("/signin",(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  const foundUser = user.find((u)=>{
    return u.username == username && u.password==password;
  })
  if(foundUser){
    const token = jwt.sign({username :foundUser.username},JWT_SECRET);
    user.token = token;
    res.send({
      token:token
    })
  }
  else{
    res.json({
      "message":"wrong credentials"
    })
  }
})


app.get("/me",(req,res)=>{
  const token = req.headers.token;
  const userDetail = jwt.verify(token , JWT_SECRET);

  const username = userDetail.username;
  const usee = user.find((u)=>{
    return u.username === username
  });

  if(user){
    res.send({
      "message":"content"
    })
  }
  else{
    res.send({
      "message":"nonono"
    })
  }
})



app.listen(3000);
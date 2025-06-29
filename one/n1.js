import express from "express";

const app = express();

app.get("/sum" , (req , res)=>{
  const a = req.query.a;
  const b = req.query.b;

  res.send({
    "mess" : a+b
  })
})



app.listen(300);
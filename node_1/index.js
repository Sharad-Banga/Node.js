import http from "http";

const server = http.createServer((req,res)=>{
  if(req.url === "/"){
    res.write("sharad");
    res.end();
  }
})

server.listen(3000);


// using express


/**
 
import express from 'express';
const app = express();

app.get("/",(req,res)=>{

    res.json({
      "message" : "sharad"
    })
  
  })

  app.listen(3000);
 
 
 **/
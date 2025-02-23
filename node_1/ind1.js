import express from "express";
import cluster from "cluster";
import os from "os";

const totalCPUs = os.cpus().length;
const port = 3000;
let car = 0;
if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    console.log("forked");
    cluster.fork();
  
  }

  let totalSum = 0;
    // Listen for messages from the child process
    cluster.on('message', (message) => {
    console.log('Message from child:', message);
      totalSum += parseInt(message.sum);
      console.log(`Total sum so far: ${totalSum}`);
});
} else {
  const app = express();
  console.log(`Worker ${process.pid} started`);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/pid", (req, res) => {
    res.send("Hello World !" + process.pid);
  });

  app.get("/api/:n", function (req, res) {
    let n = parseInt(req.params.n);
    // let count = 0;
    let sum = 0;

    const j = n/totalCPUs;

    for (let i = 0; i <= j; i++) {
      sum += i;
    }
    if(process.send){
      process.send({sum});
    }
    // res.send(`Final count is ${} ${process.pid}`);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
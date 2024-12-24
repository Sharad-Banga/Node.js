//event module

const event = require("events"); //class inherited

const eve = new  event(); // instance created


eve.on("checkPage", (sc, msg) => {
  console.log(`status code is ${sc} and the page is ${msg}`);
});

eve.emit("checkPage", 200, "ok");

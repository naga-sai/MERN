const express = require("express");
const app = express();
const cors = require("cors");
const winston = require("winston");
const config = require('config');
var jwt = require("jsonwebtoken");
const path = require('path');

const routes_user = require("./routes/user");
const routes_post = require("./routes/post");

app.use(cors());

require("./startup/middlewares")(app);

require("./startup/db")();

console.log(config.get('name'));

// Used to write error logs to a file
winston.add(winston.transports.File, {filename:"./log/logfile.log", level:"error"})

process.on("uncaughtException",(err)=>{
  // console.log(err);
  winston.log('error',err.message);
})

process.on("unhandledRejection",(err)=>{
  console.log(err)
})

// Simulating an uncaught error
// throw new Error("Application crashed!")

app.use("/api/user", routes_user);

app.use((req, res, next) => {
  var token = req.headers.authorization || req.body.authorization || req.params.authorization;
  jwt.verify(token, config.get('jwtPrivateKey'), function(err, decoded) {
    if (err) {
      res.status(403).send({
        err: "Invalid Details",
        isLoggedIn: false
      });
    } else {
      req.decoded = decoded;
      console.log(req.decoded);
      next();
    }
  });
});
app.use("/api/post", routes_post);

app.get("/", function(req, res) {
  res.send("Welcome to my application");
});

app.get("/home", function(req, res) {
  res.send("Welcome to home application");
});

if(process.env.NODE_ENV === 'production'){
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}

var port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server running at localhost : 3000");
});

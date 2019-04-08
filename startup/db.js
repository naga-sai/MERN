const mongoose = require("mongoose");
const winston = require('winston');
const config = require('config');

module.exports = function() {
  // Connect to Database
  mongoose
    .connect(
      config.get("db.conn_str"),
      { useNewUrlParser: true }
    )
    .then(() => {
      winston.log('info','Database Connected!');
      // console.log("Database Connected!!!");
    })
    .catch(err => {
      console.log(err);
    });
};

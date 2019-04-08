const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const Router = express.Router();
const Joi = require('joi');
const { user } = require("../models/user");
Router.use(express.json());
Router.use(express.urlencoded({ extended: true }));

Router.get("/fake", function(req,res){
  res.send("Alekhya");
})

//Register User
Router.post("/saveUser", function(req, res) {

  

     // fetch the request data
     const data = req.body;
     console.log("JOi");
     console.log(data);

    // define the validation schema
  //   const schema = Joi.object().keys({

  //     // email is required
  //     // email must be a valid email string
  //     email: Joi.string().email().required(),

  //     // password is required and must be atleast 3 characters
  //     password: Joi.string().min(3).required(),
  //     // confirmPassword is required and must be atleast 3 characters
  //     // confirmPassword: Joi.string().min(3).required()
  //     confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })

  // });

      // // validate the request data against the schema
      // Joi.validate(data, schema, {abortEarly:false},(err, value) => {

      //   // create a random number as id
      //   const id = Math.ceil(Math.random() * 9999999);

      //   if (err) {
      //       // send a 400 error response if validation fails
      //       console.log(JSON.stringify(err));
      //       res.status(400).send(err);
      //   } else {
          const userDoc = user(data);
          try {
            const result = userDoc.save();
            res.send(result);
          } catch (ex) {
            console.log(ex);
          }
            }
        // });

    // }
    );

// });
 
// });

//get All users
Router.get("/getAllUsers", async function(req, res) {
  try {
    const result = await user.find();
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

// Authenticate User
Router.post("/authenticate", async function(req, res) {
  try {
    const users = await user.find();
    const authUser = users.filter(
      user =>
        user.email === req.body.email && user.password === req.body.password
    );

    if (authUser.length !== 0) {
      var token = jwt.sign(
        {
          email: req.body.email,
          org: "Marlabs"
        },
       config.get('jwtPrivateKey'),
        { expiresIn: "1h" }
      );
        console.log(config.get('jwtPrivateKey'));
      res.send({ isLoggedIn: true, token });
    } else {
      res.status(403).send({ isLoggedIn: false, err: "Invalid details" });
    }
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = Router;

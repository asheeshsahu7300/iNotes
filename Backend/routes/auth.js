const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const jwt_code = process.env.SECRET || "amanisgoodprogrammer";
const fetchuser=require('../middleware/fetchuser')
// Route 1 create a user
router.post(
  "/createuser",
  [
    // validation
    body("email").isEmail(),
    body("name").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({email: req.body.email});
      if (user) {
        console.log(user);
        return res
          .status(400)
          .json({ success,error: "sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      });
      console.log(user.id);
      const data = {
        user: {
          id:user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_code);
      success=true;
      res.send({success,authtoken});
    } catch (err) {
      console.log(err.message);
      res.status(400).send({success,error:"some error occured"});
    }
  }
);

// Route 2 authenticate a user
router.post(
  "/login",
  [
    // validation
    body("email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
  let success=false; 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please  try to login with right credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        
        return res
          .status(400)
          .json({success, error: "please  try to login with right credentials" });
      }
      const data = {
        user: {
          id:user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_code);
      success=true;
      res.json({success,authtoken});
    } catch (err) {
      console.log("yes"+err.message);
      res.status(400).send("Internal server error occuerd ");
    }
  }
);

// Route 3 get loggin user details using post
router.post(
  "/getuser",fetchuser,
  async (req, res) => {
    console.log(req.user.id);
    try {
      const userId =req.user.id;
      const user = await User.findById(userId);
      res.send(user);
    } catch (err) {
      console.log(err.message);
      res.status(400).send("Internal server error occuerd ");
    }
  }
);

module.exports = router;

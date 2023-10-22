import bcrypt from "bcrypt"; //encryt password
import jwt from "jsonwebtoken";//web token for authorization
import User from "../models/User.js";//schema

//api endpoint for register
//reg from front end , res we send back to frontend
export const register = async (req, res) => {
    try {
        //when creating a new user we are grabbing this from req
        //req must have these parameters
      const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation,
      } = req.body;
      //encrytion 
      const salt = await bcrypt.genSalt();
      //waiting from response from the import
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        //we randomize it for not so it doesnt have just 0s
        viewedProfile: 0,
        impressions: 0,
      });
      //storing in session
      const savedUser = await newUser.save();
      //if successful send front end this json
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  //login 
  //takes two inputs of email and password
  //we have to compare  the email and password to whats already in the database
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      //not a match throw an error
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
        
      //json token of the user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      //delete so frontend doesnt get (security reasons)
      delete user.password;
      //if success show the token
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
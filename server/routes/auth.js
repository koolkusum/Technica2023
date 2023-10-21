import express from "express";
import { login } from "../controllers/auth.js";

//creating an express router
//easier to manage endpoints
const router = express.Router();

//the route to handle post imported auth.js
router.post("/login", login);
//returns a router object 
export default router;
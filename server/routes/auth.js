import  express  from "express";
import  {register, login, logout } from "../controller/auth.js";
// import {  isAuthenticate } from "../middlewares/authMiddleware.js";

const router=express.Router();
router.post('/register',register)
router.post('/login',login);
router.get('/logout',logout);

export default router;
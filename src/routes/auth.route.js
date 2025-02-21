import { Router } from "express";
import {checkAuth, login, logout, signup } from "../controllers/auth.controller.js";
import { protectAuth } from "../middleware/authProtect.middleware.js";

const rotuer = Router()

rotuer.post('/login',login)
rotuer.post('/signup',signup)
rotuer.post('/logout',logout)

rotuer.get('/check', protectAuth, checkAuth)

export default rotuer
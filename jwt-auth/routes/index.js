import express from "express";
import { getUsers, Register, Login, EditUser, mainpage } from "../controllers/Users.js";
import { verifyToken } from "../middleware/verifytoken.js";
import { refreshToken } from "../controllers/refreshtoken.js";
import { Logout } from "../controllers/Users.js";
const router = express.Router();

router.get('/', mainpage);
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.patch('/edit', EditUser);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;
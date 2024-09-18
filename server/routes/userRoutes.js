
import { register, login, setAvatar, getAllUsers } from "../controllers/userControllers.js";
import express from 'express'
 const userRoutes = express.Router();

 userRoutes.post("/register", register);

 userRoutes.post("/login", login);

 userRoutes.post("/setAvatar/:id", setAvatar);

 userRoutes.get('/allUsers/:id',getAllUsers);

export default userRoutes
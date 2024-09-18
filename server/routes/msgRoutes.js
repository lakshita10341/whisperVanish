
import { addMsg, getAllMsg } from "../controllers/msgControllers.js";
import express from 'express'

 const msgRoutes = express.Router();

msgRoutes.post("/addMsg/", addMsg);

msgRoutes.post("/getAllMsg/", getAllMsg);
export default msgRoutes

import express from 'express';
import { getMessage, sendMessage } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

//create send message function from message.controller
router.get("/:id",protectRoute,getMessage);
router.post("/send/:id",protectRoute,sendMessage);


export default router; 
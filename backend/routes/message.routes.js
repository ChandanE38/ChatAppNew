import express from 'express';
import { sendMessage } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

//create send message function from message.controller
router.post("/send/:id",protectRoute,sendMessage);

export default router;
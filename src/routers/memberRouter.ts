import express from 'express';
import { sendInvitationEmail } from '../controllers/memberController';
import { asyncHandler } from '../lib/async-handler';

const memberRouter = express.Router();

memberRouter.post('/invite', asyncHandler(sendInvitationEmail));

export default memberRouter;

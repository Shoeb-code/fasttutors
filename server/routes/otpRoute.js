
import express from 'express'
import getOtpRequestParent from '../controllers/getOtpParent.js';
import getOtpRequest from '../controllers/getOtp.js'
import { otpRateLimiter } from '../middleware/otpRateLimiter.js';
import verifyOtp from '../controllers/verifyOtp.js';

const otpRouter= express.Router();

otpRouter.post("/send-otp", otpRateLimiter, getOtpRequest);
otpRouter.post("/send-otp-parent", otpRateLimiter, getOtpRequestParent);
otpRouter.post("/verify-otp", verifyOtp);

export default otpRouter


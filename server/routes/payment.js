import express from 'express'
import {checkout,  paymentVerification } from '../controller/razorpay.js';


const router=express.Router();
router.post('/paymentCheckout',checkout);
router.post('/paymentVerification',paymentVerification);

export default router;
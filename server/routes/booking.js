import express from 'express'
import bookAppointment from '../controller/bookAppointment.js';

const router=express.Router();
router.post('/booking',bookAppointment);

export default router;
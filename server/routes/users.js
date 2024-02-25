import express from 'express'
import {appointmentcancel, getUser,  myappointment } from '../controller/users.js'

const router=express.Router();
router.get('/users/:id',getUser);
router.get('/users/myappointment/:id',myappointment);
router.post('/users/appointmentcancel/:id',appointmentcancel);

export default router;
import express from 'express'
import {appointmentcancel, getUser,  insertContact,  myCancelledAppointment,  myappointment } from '../controller/users.js'
import { isAuthenticate, isCustomer } from '../middlewares/authMiddleware.js';

const router=express.Router();
router.get('/users/:id',getUser);
router.get('/users/myappointment/:id',myappointment);
router.get('/users/mycancelledappointment/:id',myCancelledAppointment);
router.post('/users/appointmentcancel/:id',appointmentcancel);
router.post('/users/contacts',insertContact);

export default router;
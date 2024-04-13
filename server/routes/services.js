import express from 'express'
import {getAllServices,  addServices, getServices, deleteService, updateService, getService } from '../controller/service.js';

const router=express.Router();
router.get('/service/:id',getAllServices);
router.get('/getService/:id',getService);
router.post('/addService',addServices);
router.get('/getServices',getServices);
router.delete('/deleteService/:sId',deleteService);
router.put('/updateService/:sId',updateService);
export default router;
import express from 'express'
import {getAllServices,  addServices, getServices, deleteService, updateService, getService, getSeviceByService, getSearchedServicebyCategory, getSeviceByCategory, getCategory, getselectedBranchforServices } from '../controller/service.js';

const router=express.Router();
router.get('/service/:id',getAllServices);
router.get('/getService/:id',getService);
router.get('/getSearchedService',getSeviceByService);
router.get('/getServicebycategory/:category',getSeviceByCategory);
router.get('/getSearchedServicebyCategory',getSearchedServicebyCategory);
router.post('/addService',addServices);
router.get('/getServices',getServices);
router.get('/getSelectedBranchesForService/:id',getselectedBranchforServices);

router.delete('/deleteService/:sId',deleteService);
router.put('/updateService',updateService);
router.get('/serviceCategory',getCategory);
export default router;
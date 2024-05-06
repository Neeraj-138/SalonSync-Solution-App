import express from 'express'
import {addBranch, branchUpdate, deleteBranch, getAllBookAppointment, getAllBranches,  getAllBranchesTherapist,  getAllHairBookedAppointment,  getAllHandAndFeetBookedAppointment,  getAllMakeupBookedAppointment,  getAllSkinBookedAppointment,  getAllcancelledAppointment,  getBranch, getBranchToUpdate, getTotalRevanue, gettotalClients } from '../controller/branch.js'
import { isAdmin, isAuthenticate } from '../middlewares/authMiddleware.js';


const router=express.Router();
router.delete('/deletebranch/:bId',deleteBranch);
router.get('/branches',getAllBranches);
router.get('/branches/cancelledappointment',getAllcancelledAppointment);
router.get('/branches/skinbookedappointment',getAllSkinBookedAppointment);
router.get('/branches/hairbookedappointment',getAllHairBookedAppointment);
router.get('/branches/makeupbookedappointment',getAllMakeupBookedAppointment);
router.get('/branches/handandfeetbookedappointment',getAllHandAndFeetBookedAppointment);
router.get('/branch/:city',getBranch);
router.get('/branchById/:id',getBranchToUpdate);
router.post('/branch',addBranch);
router.put('/updateBranch/:id',branchUpdate);
router.get('/branches/details',gettotalClients);
router.get('/branches/therapist',getAllBranchesTherapist);
router.get('/branches/appointment',getAllBookAppointment);
router.get('/branches/totalRevanue',getTotalRevanue);

export default router;
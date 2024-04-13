import express from 'express'
import {addBranch, branchUpdate, getAllBranches,  getBranch, getBranchToUpdate } from '../controller/branch.js'
import { isAdmin, isAuthenticate } from '../middlewares/authMiddleware.js';


const router=express.Router();
router.get('/branches',getAllBranches);
router.get('/branch/:city',getBranch);
router.get('/branchById/:id',getBranchToUpdate);
router.post('/branch',addBranch);
router.post('/updateBranch/:id',branchUpdate);

export default router;
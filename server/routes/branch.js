import express from 'express'
import {getAllBranches,  getBranch } from '../controller/branch.js'


const router=express.Router();
router.get('/branches',getAllBranches);
router.get('/branch/:city',getBranch);
export default router;
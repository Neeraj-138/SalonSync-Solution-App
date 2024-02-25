import express from 'express'
import getAllServices from '../controller/service.js';

const router=express.Router();
router.get('/service/:id',getAllServices);

export default router;
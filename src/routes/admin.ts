import express from 'express';
import { createDoctor, getAllDoctors, getDoctorDetails, updateDoctor, deleteDoctor  } from '../controller/doctor';

import { getAllReports, updateReport, deleteReport, getReport } from '../controller/report';

const router = express.Router();

router.post('/reg', createDoctor);
router.get('/doctors',  getAllDoctors);
router.get('/doctors/:id', getDoctorDetails);
router.put('/doctors/:id', updateDoctor);
router.delete('/doctors/:id', deleteDoctor);

router.get('/reports', getAllReports);
router.get('/reports/:id', getReport);
router.put('/reports/:id', updateReport);
router.delete('/reports/:id', deleteReport);



export default router;
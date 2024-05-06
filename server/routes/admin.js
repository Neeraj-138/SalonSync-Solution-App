import  express  from "express";
import multer from "multer";
// import path from 'path';
// import fs from 'fs';
import{ AllBookedAppointment,  AllBookedAppointmentbydate,  acceptrequest,  addreview,  allcontact,  allemployee, allreviews, deletecontact, deletereview, getemployee, getreview, rejectrequest, request, requrestemployee, updateEmployee, updatereview } from "../controller/admin.js";
const router=express.Router();

// const __dirname = path.dirname(new URL(import.meta.url).pathname); // Get the directory name

// Define the uploads directory
// const uploadDir = path.join(__dirname, '..','uploads');
//  console.log("dif", uploadDir)
// Ensure that the uploads directory exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true }, (err) => {
//     if (err) {
//         console.error("Error creating uploads directory:",err);
//     } else {
//         console.log("Uploads directory created successfully");
//     }
// });
// } else {
//     console.log("Uploads directory already exists");
// }


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"./uploads"); // Destination folder for storing uploaded files
    },
    filename: function (req, file, cb) {
      cb(null,`${ Date.now() + '-' + file.originalname}`); // Use unique filenames
    }
  });
  
  const upload = multer({ storage:storage });
  
router.get('/allbookedappointment',AllBookedAppointment);
router.get('/allbookedappointmentbydate',AllBookedAppointmentbydate);
router.get('/allemployee',allemployee);
router.get('/requestemployee',requrestemployee);
router.get('/employee/:id',getemployee);
router.put('/updateemployee/:id',updateEmployee);
router.post('/request', upload.single('file'),request);
router.post('/acceptrequest/:id', acceptrequest);
router.post('/addreview', addreview);
router.delete('/deletereview/:id', deletereview);
router.put('/updatereview/:id', updatereview);
router.get('/getreview/:id', getreview);
router.get('/allreviews', allreviews);
router.post('/rejectrequest/:id', rejectrequest);
router.get('/allcontacts', allcontact);
router.delete('/deletecontact/:id', deletecontact);


export default router;
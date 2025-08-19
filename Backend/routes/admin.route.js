import express from "express";
import { addDoctor,getAllDoctors,loginAdmin } from "../controllers/abmin.controllers.js";
import upload from "../middlewares/multer.middleware.js";
import { authAdmin } from "../middlewares/authAdmin.middleware.js";
import { changeAvailability } from "../controllers/doctor.controllers.js";

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.get('/all-doctors',authAdmin,getAllDoctors); 
adminRouter.post('/change-availability', authAdmin, changeAvailability);

export default adminRouter;
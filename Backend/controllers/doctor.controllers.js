import doctorModel from "../models/doctor.models.js";

const changeAvailability = async (req, res) => {
    try {
        const { id } = req.body;
        const doctor = await doctorModel.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        doctor.availability = !doctor.availability;
        await doctor.save();
        res.status(200).json({ message: "Doctor availability updated", doctor });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong"});
        
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(["-password","-email"]);
        if (doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found" });
        }
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export { changeAvailability ,doctorList};
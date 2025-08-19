import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctor.models.js";
import jwt from "jsonwebtoken";

// API for adding a new doctor

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      experience,
      about,
      fees,
      degree,
      address,
    } = req.body;
    const imageFile = req.file;
    console.log(
      name,
      email,
      password,
      specialization,
      experience,
      about,
      fees,
      degree,
      address,
      imageFile
    );

    // Check if all required fields are provided
    if (
      !name ||
      !email ||
      !password ||
      !specialization ||
      !experience ||
      !about ||
      !fees ||
      !degree ||
      !address ||
      !imageFile
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate The password length
    if (password.length < 4) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Hashing doctor's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const uploadImage = await cloudinary.uploader.upload(imageFile.path, {
      resorceType: "image",
    });
    const imageUrl = uploadImage.secure_url;

    // Create a new doctor instance

    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      specialization:specialization,
      experience: experience,
      image: imageUrl,
      degree: degree,
      fees: Number(fees),
      about: about,
      address: JSON.parse(address),
      date: Date.now(),
    });

    // Save the new doctor to the database
    const savedDoctor = await newDoctor.save();

    // Return the saved doctor data
    res.status(201).json({
      message: "Doctor added successfully",
      doctor: {
        id: savedDoctor._id,
        name: savedDoctor.name,
        email: savedDoctor.email,
        specialization: savedDoctor.specialization,
        experience: savedDoctor.experience,
        image: savedDoctor.image,
        degree: savedDoctor.degree,
        fees: savedDoctor.fees,
        about: savedDoctor.about,
        address: savedDoctor.address,
      },
    });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email and password is ok or not
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If the credentials are correct, return a success message
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    res.status(200).json({
      message: "Admin logged in successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// API to get all doctors

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }
    //console.log("Doctors retrieved successfully:", doctors);
    res.status(200).json({
      message: "Doctors retrieved successfully",
      doctors: doctors,
    });
  } catch (error) {
    console.error("Error retrieving doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addDoctor, loginAdmin, getAllDoctors };

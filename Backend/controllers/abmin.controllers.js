import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/user.models.js";

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
    console.log(name, email, password, specialization, experience, about, fees, degree, address, imageFile);
    

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
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Hashing doctor's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const uploadImage = await cloudinary.uploader.upload(
      imageFile.path,
      { resorceType: "image" },
    );
    const imageUrl = uploadImage.secure_url;

    // Create a new doctor instance

    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      specialization,
      experience,
      image: imageUrl,
      degree,
      fees,
      about,
      address: JSON.parse(address),
      date: Date.now()
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

export { addDoctor };

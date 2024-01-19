import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DoctorSchema from "../validation/doctor";
import { generateAccessToken, authenticateToken } from "../middleware/authentication";
import Doctor from "../model/doctor";
import { z } from "zod";



export const createDoctor = async (req: Request, res: Response) => {
  try {
    const validatedData = DoctorSchema.parse(req.body);
    
    const hashPassword = bcrypt.hashSync(validatedData.password, 10);
    validatedData.password = hashPassword;

    const newDoctor = new Doctor(validatedData);

    await newDoctor.save();

    res
      .redirect("/admin/dashboard");
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: { [key: string]: string } = error.errors.reduce(
        (acc, validationError) => {
          const { message, path } = validationError;
          acc[path.join(".")] = message;
          return acc;
        },
        {} as { [key: string]: string }
      );

      res
        .status(400)
        .json({ message: "Validation Error", errors: validationErrors });
    } else {
      console.error("Error creating doctor:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
};
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find({isAdmin: false});

    res.status(200).json({message: "Doctors Retrived Succefully", doctors});
  } catch (error) {
    // Handle errors
    console.error("Error getting doctors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// View details of a single doctor
export const getDoctorDetails = async (req: Request, res: Response) => {
  const doctorId = req.params.id;
  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error getting doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const updateDoctor = async (req: Request, res: Response) => {
  const doctorId = req.params.id;
  const updates = req.body; 
  try {
    const doctor = await Doctor.findByIdAndUpdate(doctorId, updates, { new: true });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor Updated Successfully", doctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// Delete a doctor
export const deleteDoctor = async (req: Request, res: Response) => {
  const doctorId = req.params.id;
  try {
    const doctor = await Doctor.findByIdAndDelete(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor Deleted Successfully", doctor });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// used for authentication
export const loginDoctor = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send({ message: "Email or password missing" });
  }
  try {
    const doctor: any = await Doctor.findOne( {email});

    if (!doctor) {
      return res.status(404).send({ message: "Email does not Exist" });
    }

    const passwordCheck = bcrypt.compareSync(password, doctor.password);

    if (!passwordCheck) {
      return res.status(404).send({ message: "Invalid Password" });
    }

    const accessToken = generateAccessToken(doctor);
    const doctorId = doctor.id;
    const doctorsName = doctor.doctorsName;
    console.log("Doctor", doctor);
    
    const isAdmin = doctor.isAdmin;

    (req.session as any).token = accessToken;
    (req.session as any).doctorId = doctorId;
    (req.session as any).doctorsName = doctorsName;
    (req.session as any).isAdmin = isAdmin;

    console.log("Session after Login", req.session);
    
    next();
  }catch (error) {
    console.error("Error logging in doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
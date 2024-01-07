import { Request, Response, NextFunction } from "express";
import Doctor from "../model/doctor";
import Report from "../model/report";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


//generate Access Token function

function generateAccessToken(doctor: Doctor) {
  const payload = {
    email: doctor.email,
    id: doctor.id,
  };
  const secret = "Your_secret_key";
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
}

interface AccessTokenPayload extends jwt.JwtPayload {
  email: string;
  id: string;
};

function verifyAccessToken(token: string) {
  const secret: string = "Your_secret_key";

  try {
    const decoded = jwt.verify(token, secret) as AccessTokenPayload;
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, data: (error as Error).message };
  }
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.substring("Bearer ".length);

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  const verificationResponse = verifyAccessToken(token);

  if (verificationResponse.success) {
    res.locals.verificationResponse = verificationResponse;
    res.locals.doctor = verificationResponse.data; // Store doctor data in res.locals
    next();
  } else {
    return res
      .status(401)
      .json({ message: "Invalid token", error: verificationResponse.data });
  }
}

export const createDoctor = async (req: Request, res: Response) => {
  const doctor = await Doctor.create(req.body);
  const password = req.body.password;
  const hashpassword = bcrypt.hashSync(password, 10);
  doctor.password = hashpassword;
  await doctor.save();
  res.redirect("/doctor/login");
  // res
  //   .status(201)
  //   .json({ message: "Doctor Created Successfully", Doctor: doctor });
};

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const allDoctors = await Doctor.findAll();

    if (allDoctors) {
      res
        .status(201)
        .json({ message: "All Doctor's Retrieved Successfully", Doctor: allDoctors });
    } else {
      res.status(404).json({ message: "No doctors found" });
    }
  } catch (error) {
    console.error("Error getting all doctors", error);
    res
      .status(500)
      .json({ message: "Internal server error" });
  }
};

// View details of a single doctor
export const getDoctorDetails = async (req: Request, res: Response ) => {

        const doctorId = req.params.id;
        const doctor = await Doctor.findOne({where: {id: doctorId}});
        
        if(!doctor){
            res.status(404).json({message: "Doctors Data not found"});
        } else {
            res
              .status(201)
              .json({
                message: "Doctor Retrieved successfully",
                Doctor: doctor,
              });
        }
    
};

//Update doctor details
export const editDoctor = async (req: Request, res: Response ) => {

    const doctorId = req.params.id;
    const doctor = await Doctor.findOne({where: {id: doctorId}});

    if (doctor) {
        doctor.doctorsName = req.body.doctorsName;
        doctor.email = req.body.email;
        doctor.password = req.body.password;
        doctor.specialization = req.body.specialization;
        doctor.gender = req.body.gender;
        doctor.phonenumber = req.body.phonenumber;
    }
    await doctor?.save();
    res
      .status(201)
      .json({ message: "Doctor Updated Successfully", Doctor: doctor });  
};


// Delete a doctor
export const deleteDoctor = async (req: Request, res: Response ) => {

  const doctorId = req.params.id;
    const deleteRows = await Doctor.findOne({ where: { id: doctorId } });

    if (!deleteRows) {
      res.status(404).json({ message: "Doctor not found" });
    } else {
      await deleteRows.destroy();
    }
    res
      .status(201)
      .json({ message: "Doctor deleted successfully", Doctor: deleteRows });
};

// used for authentication
export const loginDoctor = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send({ message: "Email or password missing" });
  }
  const doctor = await Doctor.findOne({ where: { email: email } });

  if (!doctor) {
    return res.status(404).send({ message: "Email does not Exist" });
  }

  const Match = bcrypt.compareSync(password, doctor.password);

  if (!Match) {
    return res.status(404).send({ message: "Invalid Password" });
  }

  const accessToken = generateAccessToken(doctor);

  res.status(200).send({ message: "Login Successful", accessToken: accessToken });
};

// Function to create a report
async function createReport(req: Request, res: Response) {
  try {
    const doctor = res.locals.doctor as AccessTokenPayload;
    const reportData = req.body;

    reportData.doctorId = doctor.id;

    const createdReport = await Report.create(reportData);

    res
      .status(201)
      .json({ message: "Report created successfully", report: createdReport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Function to get all reports created by a specific doctor
async function getAllReportsByDoctor(req: Request, res: Response) {
  try {
    const doctor = res.locals.doctor as AccessTokenPayload;

    const reports = await Report.findAll({ where: { doctorId: doctor.id } });

    res.status(200).json({ message: "Reports retrieved successfully", reports });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



// Function to retrieve a particular report by reportId for a logged-in authenticated doctor
async function getReport (req: Request, res: Response){
  try {
    const doctor = res.locals.doctor as AccessTokenPayload;
    const doctorId = req.params.doctorId;
    const reportId = req.params.reportId;

    if (doctor.id !== doctorId) {
      res.status(403).json({ message: "Unauthorized access to doctor's reports" });
      return;
    }

    // Retrieve the report from the database
    const report = await Report.findOne({
      where: {
        id: reportId,
        doctorId: doctorId,
      },
    });

    // Check if the report exists
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }

    res.status(200).json({
      message: "Report retrieved successfully",
      report,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


async function findReportByIdAndAuthorize(
  req: Request,
  res: Response
): Promise<Report | null> {
  const doctor = res.locals.doctor as AccessTokenPayload;
  const reportId = req.params.reportId;

  // Retrieve the report from the database
  const report = await Report.findByPk(reportId);

  // Check if the report exists and if the doctor's ID matches the one attached to the report
  if (!report || report.doctorId !== doctor.id) {
    res.status(404).json({ message: "Report not found or unauthorized" });
    return null;
  }

  return report;
}

// Function to update a report
async function updateReport (req: Request, res: Response) {
  try {
    const report = await findReportByIdAndAuthorize(req, res);

    if (report) {
      const updatedData = req.body;

      // Update the report
      await report.update(updatedData);

      res.status(200).json({ message: "Report updated successfully", report });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to delete a report
async function deleReport (req: Request, res: Response){
  try {
    const report = await findReportByIdAndAuthorize(req, res);

    if (report) {
      // Delete the report
      await report.destroy();

      res.status(200).json({ message: "Report deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createReport, getAllReportsByDoctor, getReport, updateReport, deleReport, authenticateToken,
};

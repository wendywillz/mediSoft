import { Request, Response, NextFunction } from "express";
import Report from "../model/report";
import Doctor from "../model/doctor";


export const createReport = async (req: Request, res: Response) => {
try {
    const doctorId = (req.session as { doctorId?: string }).doctorId; 

    if (!doctorId) {
        return res
            .status(401)
            .json({ message: "Unauthorized: Doctor not logged in" });
    }
    const reportData = { ...req.body, doctorId };

    const report = new Report(reportData);
    await report.save();

    res.redirect("/doctor/dashboard");
} catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// View details of a single report
export const getReportDetails = async (req: Request, res: Response) => {
  const reportId = req.params.id;
  try {
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Error getting report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Import necessary modules and models

// Fetch reports created by the logged-in doctor
export const getDoctorReports = async (req: Request, res: Response) => {
  try {
    const doctorId = (req.session as { doctorId?: string }).doctorId;

    if (!doctorId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Doctor not logged in" });
    }

    const reports = await Report.find({ doctorId });

    res.status(200).json({ message: "Reports Retrieved Successfully", reports });
  } catch (error) {
    console.error("Error getting doctor's reports:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//view a single report created by the logged-in doctor
export const getDoctorReportDetails = async (req: Request, res: Response) => {
  const doctorId = (req.session as { doctorId?: string }).doctorId;
  const reportId = req.params.id;

  try {
    const report = await Report.findOne({ _id: reportId, doctorId });

    if (!report) {
      return res.status(404).json({ message: "Report not found or unauthorized" });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Error getting doctor's report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Import necessary modules and models

// Update a report created by the logged-in doctor
export const updateDoctorReport = async (req: Request, res: Response) => {
  const doctorId = (req.session as { doctorId?: string }).doctorId;
  const reportId = req.params.id;
  const updates = req.body;

  try {
    const report = await Report.findOneAndUpdate({ _id: reportId, doctorId }, updates, { new: true });

    if (!report) {
      return res.status(404).json({ message: "Report not found or unauthorized" });
    }

    res.status(200).json({ message: "Report Updated Successfully", report });
  } catch (error) {
    console.error("Error updating doctor's report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a report created by the logged-in doctor
export const deleteDoctorReport = async (req: Request, res: Response) => {
  const doctorId = (req.session as { doctorId?: string }).doctorId;
  const reportId = req.params.id;

  try {
    const report = await Report.findOneAndDelete({ _id: reportId, doctorId });

    if (!report) {
      return res.status(404).json({ message: "Report not found or unauthorized" });
    }

    res.status(200).json({ message: "Report Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting doctor's report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch all reports
export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find();

    res.status(200).json({ message: "Reports Retrived Succefully", reports });
  } catch (error) {
    console.error("Error getting reports:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// View details of a single report
export const getReport = async (req: Request, res: Response) => {
  const reportId = req.params.id;
  try {
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Error getting report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a report
export const updateReport = async (req: Request, res: Response) => {
  const reportId = req.params.id;
  const updates = req.body;
  try {
    const report = await Report.findByIdAndUpdate(reportId, updates, { new: true });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report Updated Successfully", report });
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a report
export const deleteReport = async (req: Request, res: Response) => {
  const reportId = req.params.id;
  try {
    const report = await Report.findByIdAndDelete(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

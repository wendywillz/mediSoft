import request from "supertest";
import app from "./app";

describe("GET, POST, PUT, DELETE and LOGIN operations on Doctor Routes", () => {
  let accessToken: string;

  beforeAll(async () => {
    const loginCredentials = {
      email: "test@example.com",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/doctor/login")
      .send(loginCredentials);

    accessToken = response.body.accessToken;
  });

  it("should GET all doctors", async () => {
    const response = await request(app).get("/doctor");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should POST a new doctor", async () => {
    const newDoctor = {
      doctorsName: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      specialization: "Surgeon",
      gender: "Male",
      phonenumber: "1234567890",
    };

    const response = await request(app).post("/doctor/reg").send(newDoctor);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("should PUT a doctor", async () => {

    const doctorToUpdate = {
      doctorsName: "Updated Name",
      email: "updated@example.com",
    };

    const existingDoctorId = "5948026e-e0be-4d36-9fbf-0702c8ad51e8"; 

    const response = await request(app)
      .put(`/doctor/${existingDoctorId}`)
      .send(doctorToUpdate);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "doctorsName",
      doctorToUpdate.doctorsName
    );
  }, 10000);



  it("should DELETE a doctor", async () => {
    const doctorToDeleteId = "2b565232-627b-4d2a-8133-415643dec9f4";

    const response = await request(app).delete(
      `/doctor/${doctorToDeleteId}`
    );

    expect(response.status).toBe(204);
  });


  it("should LOGIN a doctor", async () => {
    const loginCredentials = {
      email: "john.doe@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/doctor/login")
      .send(loginCredentials);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
  });
});


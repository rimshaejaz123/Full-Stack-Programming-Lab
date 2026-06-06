const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = express();

// 1. Enable CORS
app.use(cors({
  origin: "http://localhost:3000", // Explicitly allow your frontend
  credentials: true
}));

// 2. Body Parser
app.use(express.json());

// 3. Logger Middleware (Moved outside app.listen)
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// 4. Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/treatments", require("./routes/treatmentRoutes"));
app.use("/api/patients", require("./routes/patientRoutes"));

const PORT = process.env.PORT || 5000;

// 5. Start Server with '0.0.0.0' for stability
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server Running On Port ${PORT}`);
});
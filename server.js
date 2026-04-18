const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const connectToDB = require("./src/config/db");
const swaggerUi = require("swagger-ui-express");
const authRoutes = require("./src/routes/authRoutes");
const transactionRoutes = require("./src/routes/transactionRoutes");

const app = express();
connectToDB();

const swaggerSpec = require("./src/swagger");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("PhonePe Backend Homepage");
});

// For Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_URL}`);
  console.log(`Swagger Docs available at ${BASE_URL}/api-docs`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
});

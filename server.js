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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("PhonePe Backend Homepage");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});

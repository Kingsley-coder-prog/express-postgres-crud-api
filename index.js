import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/config/db.js";

import userRoutes from "./src/routes/userRoutes.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import createUserTable from "./src/data/createUserTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", userRoutes);

// Error handling middleware
app.use(errorHandler);

// Create table before starting server
createUserTable();

// Testing POSTGRES connection
app.get("/", async (req, res) => {
  console.log("Start");
  const result = await pool.query("SELECT current_database()");
  console.log("end");
  res.send(`The database name is : ${result.rows[0].current_database}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

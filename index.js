import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Error handling middleware

// Testing POSTGRES connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database name is : ${result.rows[0].current_database}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Error handling middleware

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

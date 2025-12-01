const express  = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database
connectDB();

// Router 
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);

// Server 
app.listen(process.env.PORT, () => 
console.log(`Server running on port ${process.env.PORT}`)
);
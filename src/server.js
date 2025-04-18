require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');
const path = require('path');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/tasks", require("./routes/taskRoute"));

// Static files (Frontend)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Optional test route to verify server is working
app.get('/api/test', (req, res) => {
  res.json({ message: "Server is working!" });
});

// Start the server LAST
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
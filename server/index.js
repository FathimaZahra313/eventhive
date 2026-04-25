// Load environment variables from .env file before any other code runs
// This ensures API keys, secrets, and configuration values are available throughout the app
require("dotenv").config();

// Import Express for building the HTTP server
// Express provides routing, middleware, and request/response handling
const express = require("express");

// Import database connection function
const connectDB = require("./config/db");

// Create the Express application instance
// This is the main app object that handles all routes and middleware
const app = express();

// Add CORS middleware to enable cross-origin requests
// This allows the frontend (running on a different port/domain) to access this API
app.use(cors());

// Add JSON parsing middleware to parse incoming request bodies as JSON
// This enables the server to read JSON data from POST/PUT requests
app.use(express.json());

// Define a health check route for monitoring the server's status
// Load balancers and orchestration tools use this to verify the server is running
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Start the server - database must connect before accepting requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
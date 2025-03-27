const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const rentalRoutes = require("./routes/rentalRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", rentalRoutes);

const startServer = async () => {
    try {
      await connectDB(); // Wait for DB connection before starting server
      const PORT = process.env.PORT || 8000;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
      console.error("Failed to start server:", error.message);
      process.exit(1);
    }
  };
  
  startServer(); // Call async function to start server properly










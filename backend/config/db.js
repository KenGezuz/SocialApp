const mongoose = require("mongoose");

// Function to connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    // Connect to the database using the MONGO_URL environment variable
    const conn = await mongoose.connect(process.env.MONGO_URL);

    // Log a message indicating that the connection was successful
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If there is an error, log the error message and exit the process with an error code
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;

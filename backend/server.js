// Import dependencies
const express = require("express");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const path = require("path");
const bodyParser = require('body-parser');
const cors = require("cors");

// Import middleware and routes
const connectDB = require("./config/db");
const userAuthRoute = require("./routes/userAuthRoute");
const uploadContent = require("./middleware/uploadMiddleware");
const postRoute = require("./routes/postRoute");
const {registerUser} = require("./controller/userAuthController");
const {createPost} = require("./controller/postController");
const userRoute =  require("./routes/userRoute");
const verifyToken = require("./middleware/authMiddleware");

// Connect to database
connectDB();

// Create express app and add middleware
const app = express();
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/assets", express.static(path.join(__dirname, "./public/assets")));


// Use routes with file upload
app.use("/api/auth/register", uploadContent.single("picture"), registerUser);
app.use("/posts", verifyToken, uploadContent.single("picture"), postRoute);

// Use regular routes
app.use("/hello", (req, res) => {
    res.status(200),json("Hello Kenny, Welcome");
});
app.use("/api/auth", userAuthRoute);
app.use("/users", verifyToken,userRoute);
app.use("/posts", verifyToken, postRoute)

// Start server and listen for requests
const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on port: ${port}`));

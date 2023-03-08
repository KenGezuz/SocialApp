const express = require("express"); 
const {loginUser}  = require("../controller/userAuthController");

const router = express.Router();


// Route for user login
router.post("/login", loginUser);

module.exports = router;

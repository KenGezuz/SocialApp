const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    const secret = process.env.JWT_SECRET; 

    const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
    
    // add some validation for the decoded token
    if (!decoded || !decoded.sub) {
      return res.status(401).send("Unauthorized");
    }

    // check if the token is expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      return res.status(401).send("Token expired");
    }
    
    // add the decoded token to the request object
    req.user = decoded;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = verifyToken;
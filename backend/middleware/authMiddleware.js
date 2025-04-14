const jwt = require("jsonwebtoken");
const { getToken } = require("../controllers/authController"); // Import function to get token

module.exports = (req, res, next) => {
    let token = req.header("Authorization");
  
    if (!token) {
      token = getToken(); // Fetch stored token automatically
      console.log(token);
      if (!token) {
        return res.status(401).json({ error: "Unauthorized, token missing", token });
      }
    } else {
      token = token.split(" ")[1]; // Extract Bearer token
    }
  
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      res.status(403).json({ error: "Invalid token" });
    }
  };
  
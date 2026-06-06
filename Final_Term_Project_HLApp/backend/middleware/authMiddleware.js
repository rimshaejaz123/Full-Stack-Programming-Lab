const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  console.log("--- Auth Middleware Triggered ---");
  
  let token;

  // 1. Check if the authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract the token
      token = req.headers.authorization.split(" ")[1];
      
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      
      console.log("Auth Success: Token Verified for Role ->", req.user.role);
      
      // Move to the next step (the controller)
      return next(); 

    } catch (error) {
      console.error("Auth Error: Token verification failed ->", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // 2. THE BLACK HOLE FIX: If there is no token, you MUST return a response!
  if (!token) {
    console.error("Auth Error: No token provided by the frontend!");
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

module.exports = protect;
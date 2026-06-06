const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Log exactly what we have to find the bug
    console.log("User in request:", req.user);
    console.log("Allowed roles:", allowedRoles);

    // 2. Check if user exists
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 3. Check role (force to string to be safe)
    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden: You don't have permission" });
    }
  };
};

module.exports = roleMiddleware;
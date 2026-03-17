const jwt = require("jsonwebtoken");

// middleware to verify JWT and attach user info
function verifyToken(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token is not valid" });
    }

    req.user = user; // { id, username, email }
    next();
  });
}

module.exports = verifyToken;

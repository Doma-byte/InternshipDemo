const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];
    if (!token)
      return res.status(400).json({
        error: true,
        message: "Access Denied / Unauthorized request",
      });

    token = token.split(" ")[1];
    if (token === null || !token)
      return res.status(401).json({
        error: true,
        message: "Access Denied / Unauthorized request",
      });

    let verifiedUser = jwt.verify(token, process.env.jwtSecret);
    if (!verifiedUser) {
      return res.status(401).json({
        error: true,
        message: "Access Denied / Unauthorized request",
      });
    } else {
      next();
    }
  } catch (err) {
    return res.status(403).json({
      error: true,
      message: err.message,
    });
  }
};

module.exports = {
  auth,
};

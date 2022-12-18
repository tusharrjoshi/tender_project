const jwt = require("jsonwebtoken");

module.exports = {
  isLoggedIn: (req, res, next) => {
    try {
      console.log("called")
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      let decode = jwt.verify(token, process.env.JWT_SECRET);
      req.userData = decode;
      next();
    } catch (err) {
      return res.status(401).send({
        status: "failed",
        msg: "Session is not valid",
      });
    }
  },
};

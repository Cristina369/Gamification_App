const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(400)
      .send({ message: "You do not have access to this content //auth" });

  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, validToken) => {
    if (err) {
      return res.status(400).send({ message: "token invalid" });
    } else {
      req.user = validToken;
      next();
    }
  });
};
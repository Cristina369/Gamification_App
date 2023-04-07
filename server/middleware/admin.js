const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Acces denied! ");

  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, validToken) => {
    if (err) {
      return res.status(400).send({ message: "Invalid token" });
    } else {
      if (!validToken.admin)
        return res
          .status(403)
          .send({ message: "You do not have access to this content!" });

      req.user = validToken;
      next();
    }
  });
};

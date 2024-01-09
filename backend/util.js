const jwt = require("jsonwebtoken");
exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      age: user.age,
      place: user.place,
      phone: user.phone,
      email: user.email,
      userType: user.userType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
exports.isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) res.status(400).send({ message: "Invalid Token!" });
      else {
        req.user = decode;
        next();
      }
    });
  } else res.status(400).send({ message: "No token" });
};

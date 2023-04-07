const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const valid = require("../middleware/validation");

// create user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(403).send({ message: "User already exist!" });

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  let newUser = await new User({
    ...req.body,
    password: hashPassword,
  }).save();

  newUser.password = undefined;
  newUser.__v = undefined;
  res
    .status(200)
    .send({ data: newUser, message: "Profile created successfully" });
});

// get all users
router.get("/", async (req, res) => {
  const users = await User.find().select("-password -__v");
  res.status(200).send({ data: users });
});

// get user :id
router.get("/:id", [valid, auth], async (req, res) => {
  const user = await User.findById(req.params.id).select("-password -__v");
  res.status(200).send({ data: user });
});

// update user :id
router.put("/:id", [valid, auth], async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).select("-password -__v");
  res.status(200).send({ data: user, message: "Profile updated successfully" });
});

// delete user :id
router.delete("/:id", [valid, admin], async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "Profile deleted successfully" });
});

module.exports = router;

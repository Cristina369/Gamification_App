const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  position: { type: String, required: true },
  image: { type: String, required: true },
  password: { type: String, required: true },
  birthDate: { type: String, required: true },
  points: { type: String, default: "0" },
  badges: {
    type: [ObjectId],
    ref: "badge",
    default: "6431389354823da0f51247c2",
  },
  quests: { type: [String], default: [] }, //quests accepted or completed
  aprecietedQuest: { type: [String], default: [] },
  proposedQuests: { type: [String], default: [] },
  admin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, firstName: this.firstName, admin: this.admin },
    process.env.JWTPRIVATEKEY,
    { expiresIn: "7d" }
  );
  return token;
};

const validate = (user) => {
  const schema = Joi.object({
    _id: Joi.string(),
    firstName: Joi.string().min(5).max(20).required(),
    lastName: Joi.string().min(5).max(20).required(),
    position: Joi.string().required(),
    image: Joi.string().allow(""),
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
    birthDate: Joi.string().required(),
  });
  return schema.validate(user);
};

const User = mongoose.model("user", userSchema);

module.exports = { User, validate };

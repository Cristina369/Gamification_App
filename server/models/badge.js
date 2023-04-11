const mongoose = require("mongoose");
const Joi = require("joi");

const ObjectId = mongoose.Schema.Types.ObjectId;

const badgeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  users: { type: [ObjectId], default: [] },
  points: { type: String, default: "0" },
  image: { type: String, required: true },
});

const validate = (badge) => {
  const schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    points: Joi.string().allow(""),
    image: Joi.string().allow(""),
  });
  return schema.validate(badge);
};

const Badge = mongoose.model("badge", badgeSchema);

module.exports = { Badge, validate };

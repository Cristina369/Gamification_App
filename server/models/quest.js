const mongoose = require("mongoose");
const Joi = require("joi");

const ObjectId = mongoose.Schema.Types.ObjectId;

const questSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, default: "" },
  demonstration: { type: String, default: "" },
  state: { type: String, default: "proposed" },
  user: { type: ObjectId, ref: "user", required: true },
  participant: { type: ObjectId, ref: "user" },
  points: { type: String, default: "0" },
});

const validate = (quest) => {
  const schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    demonstration: Joi.string().allow(""),
    details: Joi.string().allow(""),
    state: Joi.string().allow(""),
    user: Joi.string().allow(""),
    points: Joi.string().allow(""),
  });
  return schema.validate(quest);
};

const Quest = mongoose.model("quest", questSchema);

module.exports = { Quest, validate };

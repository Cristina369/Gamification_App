const router = require("express").Router();
const { User } = require("../models/user");
const { Badge, validate } = require("../models/badge");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const valid = require("../middleware/validation");
const Joi = require("joi");

// create badge
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send({ message: error.details[0].message });

  let newBadge = await new Badge({
    ...req.body,
  }).save();

  res
    .status(200)
    .send({ data: newBadge, message: "Badge created successfully" });
});

// get all badges
router.get("/", async (req, res) => {
  const badge = await Badge.find();
  res.status(200).send({ data: badge });
});

// get user's badges
router.get("/specific", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const badges = await Badge.find({ _id: user.badges });
  if (!badges) return res.status(404).send("Can't find badges");
  res.status(200).send({ data: badges });
});

// get user's badges lenght
router.get("/specific-l", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const badges = await Badge.find({ _id: user.badges }).count();
  if (!badges) return res.status(404).send("Can't find badges");
  res.status(200).send({ data: badges });
});

router.get("/specific/:id", async (req, res) => {
  const badge = await Badge.findById(req.params.id);
  if (!badge) return res.status(404).send("Can't find badges");

  res.status(200).send({ data: badge });
});

// edit badge :id, for client
router.put("/edit/:id", auth, async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    points: Joi.string().allow(""),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const badge = await Badge.findById(req.params.id);
  if (!badge) return res.status(404).send({ message: "Can't find the badge!" });

  const user = await User.findById(req.user._id);
  if (!user._id.equals(badge.users))
    return res
      .status(403)
      .send({ message: user.admin + "User does't have access to edit!" });

  badge.title = req.body.title;
  badge.description = req.body.description;
  badge.points = req.body.points;
  await badge.save();

  res.status(200).send({
    data: badge,
    message: "Successfully updated badge!",
  });
});

module.exports = router;

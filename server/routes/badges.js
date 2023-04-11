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

  //   const badge = await Badge({ ...req.body }).save();
  let newBadge = await new Badge({
    ...req.body,
  }).save();

  res
    .status(200)
    .send({ data: newBadge, message: "Badge created successfully" });
});

//choose a quest
// router.put("/accept/:id", [valid, auth], async (req, res) => {
//   let resMessage = "";
//   const quest = await Badge.findById(req.params.id);
//   if (!quest) return res.status(400).send({ message: "Can't find the quest" });

//   const user = await User.findById(req.user._id);
//   const index = user.quests.indexOf(quest._id);
//   // if (index === -1) {
//   //   user.quests.push(quest._id);
//   //   resMessage = "Quest was accepted";
//   // } else {
//   //   user.quests.splice(index, 1);
//   //   resMessage = "Quest was deleted from accepted quests";
//   // }

//   // const participant = user._id;
//   if (!user._id.equals(quest.user)) {
//     quest.participant = user._id;
//     user.quests.push(quest._id);
//     resMessage = "Quest was accepted" + user._id + "||" + quest.user._id;
//   } else {
//     resMessage = "Error! You cannot choose a mission that you have created";
//   }
//   quest.state = "accepted";
//   await quest.save();

//   await user.save();
//   res.status(200).send({ data: quest, message: resMessage });
// });

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

// get user's badge LLLL
// router.get("/max", auth, async (req, res) => {
//   const user = await User.findById(req.user._id);
//   const badges = await Badge.find({ _id: user.badges });
//   if (!badges) return res.status(404).send("Can't find badges");
//   else if (badges) {
//     return res.status(404).send("Data" + Math.max(user.badges.points));
//   }
//   res.status(200).send({ data: Math.max(badges.points) });
// });

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

// Actualizare bloguri pentru admin :: trebuie de schimbat ca acum merge doar pentru clienti
//Update blogs, for admin app :: change for admin
// router.put("/:id", [valid, admin], async (req, res) => {
//   const quest = await Badge.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.send({ data: quest, message: "Successfully updated quest" });
//   window.location.reload();
// });

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

// delete badge :id
// router.delete("/:id", [valid, auth], async (req, res) => {
//   const user = await User.findById(req.user._id);
//   const badge = await Badge.findById(req.params.id);
//   if (!user._id.equals(badge.users))//aici trebuie de adaugat doar pntru admin
//     return res
//       .status(403)
//       .send({ message: "User does't have access to edit!" });

//   const index = user.badge.indexOf(req.params.id);
//   user.badge.splice(index, 1);
//   await user.save();
//   await badge.remove();
//   res.status(200).send({ message: "Badge deleted!" });
//   window.location.reload();
// });

module.exports = router;

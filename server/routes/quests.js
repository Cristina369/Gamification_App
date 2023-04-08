const router = require("express").Router();
const { User } = require("../models/user");
const { Quest, validate } = require("../models/quest");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const valid = require("../middleware/validation");
const Joi = require("joi");

// create quest
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send({ message: error.details[0].message });

  const user = await User.findById(req.user._id);
  const quest = await Quest({ ...req.body, user: user._id }).save();
  user.proposedQuests.push(quest._id);
  await user.save();

  res.status(201).send({ data: quest });
});

//choose a quest
router.put("/accept/:id", [valid, auth], async (req, res) => {
  let resMessage = "";
  const quest = await Quest.findById(req.params.id);
  if (!quest) return res.status(400).send({ message: "Can't find the quest" });

  const user = await User.findById(req.user._id);
  const index = user.quests.indexOf(quest._id);
  // if (index === -1) {
  //   user.quests.push(quest._id);
  //   resMessage = "Quest was accepted";
  // } else {
  //   user.quests.splice(index, 1);
  //   resMessage = "Quest was deleted from accepted quests";
  // }

  // const participant = user._id;
  if (!user._id.equals(quest.user)) {
    quest.participant = user._id;
    user.quests.push(quest._id);
    resMessage = "Quest was accepted" + user._id + "||" + quest.user._id;
  } else {
    resMessage = "Error! You cannot choose a mission that you have created";
  }
  quest.state = "accepted";
  await quest.save();

  await user.save();
  res.status(200).send({ data: quest, message: resMessage });
});

// get proposed quests
router.get("/proposed", async (req, res) => {
  const quest = await Quest.find({ state: "proposed" });
  res.status(200).send({ data: quest });
});

// get all quests
router.get("/", async (req, res) => {
  const quest = await Quest.find();
  res.status(200).send({ data: quest });
});

// get user's quests
router.get("/specific", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const quests = await Quest.find({ _id: user.quests });
  if (!quests) return res.status(404).send("Can't find quests");
  res.status(200).send({ data: quests });
});

// get user's proposed quests
router.get("/proposed-quests", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const quests = await Quest.find({ _id: user.quests, state: "completed" });
  if (!quests) return res.status(404).send("Can't find quests");
  res.status(200).send({ data: quests });
});

// get user's finished quests
router.get("/finished", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const quests = await Quest.find({ _id: user.proposedQuests });
  if (!quests) return res.status(404).send("Can't find quests");
  res.status(200).send({ data: quests });
});

router.get("/specific/:id", auth, async (req, res) => {
  const quest = await Quest.findById(req.params.id);
  if (!quest) return res.status(404).send("Can't find quests");

  res.status(200).send({ data: quest });
});

// Actualizare bloguri pentru admin :: trebuie de schimbat ca acum merge doar pentru clienti
//Update blogs, for admin app :: change for admin
router.put("/:id", [valid, admin], async (req, res) => {
  const quest = await Quest.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send({ data: quest, message: "Successfully updated quest" });
  window.location.reload();
});

// edit quest :id, for client
router.put("/edit/:id", auth, async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    points: Joi.string().allow(""),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const quest = await Quest.findById(req.params.id);
  if (!quest) return res.status(404).send({ message: "Can't find the quest!" });

  const user = await User.findById(req.user._id);
  if (!user._id.equals(quest.user))
    return res
      .status(403)
      .send({ message: user.admin + "User does't have access to edit!" });

  quest.title = req.body.title;
  quest.description = req.body.description;
  quest.points = req.body.points;
  await quest.save();

  res.status(200).send({
    data: quest,
    message: "Successfully updated quest!",
  });
});

// delete quest :id
router.delete("/:id", [valid, auth], async (req, res) => {
  const user = await User.findById(req.user._id);
  const quest = await Quest.findById(req.params.id);
  if (!user._id.equals(quest.user))
    return res
      .status(403)
      .send({ message: "User does't have access to edit!" });

  const index = user.quests.indexOf(req.params.id);
  user.quests.splice(index, 1);
  await user.save();
  await quest.remove();
  res.status(200).send({ message: "Quest deleted!" });
  window.location.reload();
});

module.exports = router;

require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userR = require("./routes/users");
const questsR = require("./routes/quests");
const badgesR = require("./routes/badges");
// const searchR = require("./routes/search");
const authR = require("./routes/auth");

const app = express();
connection();

app.use(cors());
app.use(express.json());

app.use("/api/users/", userR);
app.use("/api/auth/", authR);
app.use("/api/quests/", questsR);
app.use("/api/badges/", badgesR);
// app.use("/api/", searchR);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}...`));

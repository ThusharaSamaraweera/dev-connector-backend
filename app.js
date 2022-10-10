const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/api", (req, res) => res.status(200).json({msg: "API Running"}));

//define route
app.use("/api/posts", require("./route/api/posts"));
app.use("/api/auth", require("./route/api/auth"));
app.use("/api/profile", require("./route/api/profile"));

module.exports = {app};
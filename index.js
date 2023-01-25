const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const Port = process.env.Port || 5000;

const posts = require("./posts.json");

app.get("/", (req, res) => {
  res.send("Server Is Runing");
});
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(Port, () => {
  console.log("Your Server Is Running");
});

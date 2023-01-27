const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());

const Port = process.env.Port || 5000;

// const posts = require("./posts.json");

const uri = `mongodb+srv://${process.env.dbName}:${process.env.dbPassword}@cluster1.zscbcon.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const postCollection = client.db("portfolio").collection("posts");
    const userCollection = client.db("portfolio").collection("user");

    app.get("/posts", async (req, res) => {
      const query = {};
      const cursor = await postCollection.find(query).toArray();
      res.send(cursor);
    });
    app.get("/post/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await postCollection.findOne(query);
      res.send(result);
    });

    app.get("/user", async (req, res) => {
      const query = {};
      const user = await userCollection.findOne(query);
      res.send(user);
    });
    app.post("/post", async (req, res) => {
      const postData = req.body;
      const result = await postCollection.insertOne(postData);
      res.send(result);
    });

    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = postCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Is Runing");
});
app.listen(Port, () => {
  console.log("Your Server Is Running");
});

module.exports = app;

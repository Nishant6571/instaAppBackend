const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
// app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send({ msg: "This is our Homepage" });
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Database Connected.");
    console.log(`Server is running at http://localhost:${process.env.port}`);
  } catch (err) {
    res.send(400).status({ msg: "Internal Server Error.", Error: err });
  }
});

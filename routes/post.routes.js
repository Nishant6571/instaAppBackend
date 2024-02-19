const { PostModel } = require("../models/post.model");
const { auth } = require("../middlewares/auth");
const { upload } = require("../middlewares/upload");
const express = require("express");

const postRouter = express.Router();

postRouter.post("/", auth, upload.single("photo"), async (req, res) => {
  const { quote, photo, device, commentsCount, userID } = req.body;
  try {
    const post = new PostModel({
      quote,
      photo: req.file.path,
      device,
      commentsCount,
      userID,
    });
    await post.Save();
    res.status(200).send({ msg: "New post has been Added" });
  } catch (err) {
    res.status(500).send({ msg: "Bad Request" });
  }
});

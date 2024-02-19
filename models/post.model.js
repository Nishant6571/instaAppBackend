const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    quote: { type: String, required: true },
    photo: { type: String, required: true },
    device: { type: String, required: true },
    commentsCount: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = { PostModel };

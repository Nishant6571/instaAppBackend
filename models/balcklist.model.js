const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema(
  {
    token: { type: String },
  },
  {
    versionKey: false,
  }
);

const BlacklistModel = mongoose.model("Blacklist", blacklistSchema);

module.exports = { BlacklistModel };

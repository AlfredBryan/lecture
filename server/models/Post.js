const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

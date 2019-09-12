const express = require("express");
const Validator = require("validator");

const Post = require("../models/Post");
const Comment = require("../models/Comment");

const router = express.Router();

//Fetch all post
router.get("/posts", (req, res) => {
  Post.find({})
    .then(post => {
      if (post.length < 1) {
        res.status(404).send({ message: "Post not found" });
      }

      res.status(201).send({ data: post });
    })
    .catch(error => {
      res.status(500).send("Error" + error);
    });
});

//Create new post
router.post("/post/add", (req, res) => {
  const errors = [];
  const { title, author, post } = req.body;
  if (Validator.isEmpty(title)) {
    errors.push({ message: "title field is required" });
  }
  if (Validator.isEmpty(author)) {
    errors.push({ message: "author field is required" });
  }
  if (Validator.isEmpty(post)) {
    errors.push({ message: "post field is required" });
  }

  if (errors.length > 0) {
    res.send(errors);
  } else {
    Post.create({
      title,
      author,
      post
    })
      .then(post => {
        if (!post) {
          res.status(400).send({ message: "Error creating post" });
        }

        res.status(200).send({ success: true, data: post });
      })
      .catch(error => {
        res.status(500).send("Error" + error);
      });
  }
});

// Getting a single Post with it's Comment
router.get("/post/:id", (req, res, next) => {
  Post.findById({ _id: req.params.id })
    .populate({ path: "comments", model: Comment })
    .exec((err, post) => {
      if (err) return res.status(404).send(err);

      res.status(201).send(post);
    });
});

// Adding A New Comment to A single Post
router.post("/post/:id/comment", (req, res) => {
  Post.findOne({ _id: req.params.id }).then(post => {
    let comment = new Comment({
      comment: req.body.comment
    });
    post.comments.push(comment);
    comment.save(error => {
      if (error) return res.send(error);
    });
    post.save((error, post) => {
      if (error) return res.send(error);
      res.status(200).send(post);
    });
  });
});

module.exports = router;

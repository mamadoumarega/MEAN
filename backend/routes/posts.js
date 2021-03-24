const express = require('express');

const router = express.Router();

const Post = require('../models/post');


// Adding posts
router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // Save the post
  post.save().then(createdPost => {
    res.status(201).send({
      message: 'Post added successfully!',
      createdPost: createdPost._id
    });
  });
});

// Update post
router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post)
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Update successful!'});
    });
});

// Get single post
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({message: 'Post not found'});
      }
    });
});

// Fetching all posts
router.get("",(req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: documents
    });
  });
});

// Delete post
router.delete("/:id", (req, res,next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Post deleted!'});
  });
});

module.exports = router;

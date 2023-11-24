// Create web server
var express = require('express');
var router = express.Router();
var db = require('../models');

// Get all comments
router.get('/', function(req, res) {
  db.Comment.find({})
  .then(function(comments) {
    res.json(comments);
  })
  .catch(function(err) {
    res.send(err);
  });
});

// Create a comment
router.post('/', function(req, res) {
  db.Comment.create(req.body)
  .then(function(newComment) {
    res.status(201).json(newComment);
  })
  .catch(function(err) {
    res.send(err);
  });
});

// Get a comment
router.get('/:commentId', function(req, res) {
  db.Comment.findById(req.params.commentId)
  .then(function(foundComment) {
    res.json(foundComment);
  })
  .catch(function(err) {
    res.send(err);
  });
});

// Update a comment
router.put('/:commentId', function(req, res) {
  db.Comment.findOneAndUpdate({_id: req.params.commentId}, req.body, {new: true})
  .then(function(updatedComment) {
    res.json(updatedComment);
  })
  .catch(function(err) {
    res.send(err);
  });
});

// Delete a comment
router.delete('/:commentId', function(req, res) {
  db.Comment.remove({_id: req.params.commentId})
  .then(function() {
    res.json({message: 'Comment deleted!'});
  })
  .catch(function(err) {
    res.send(err);
  });
});

module.exports = router;
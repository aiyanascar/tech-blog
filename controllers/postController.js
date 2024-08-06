const express = require('express');
const router = express.Router();
const { Post } = require('../models/Post');
const { User } = require('../models/User');
const { Comment } = require('../models/Comment');

router.post('/create', async (req, res) => {
  try {
    await Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.userId,
    });
    res.redirect('/dashboard');
  } catch (err) {
    res.redirect('/create');
  }
});

router.get('/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: [User, { model: Comment, include: [User] }],
  });
  res.render('post-details', { post });
});

module.exports = router;

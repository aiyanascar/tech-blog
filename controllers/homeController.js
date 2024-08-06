const express = require('express');
const router = express.Router();
const { Post } = require('../models/Post');
const { User } = require('../models/User');

router.get('/', async (req, res) => {
  const posts = await Post.findAll({
    include: [User],
  });
  res.render('home', { posts });
});

module.exports = router;

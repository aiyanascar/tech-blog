const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);

Post.associate({ User });
Comment.associate({ User, Post });

sequelize.sync();

module.exports = {
  sequelize,
  User,
  Post,
  Comment,
};

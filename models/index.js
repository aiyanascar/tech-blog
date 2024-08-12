// index.js
const UserModel = require('./User');
const PostModel = require('./Post');
const CommentModel = require('./Comment');

const sequelize = require('../config/database');

// Initialize models
UserModel.init(sequelize);
PostModel.init(sequelize);
CommentModel.init(sequelize);

// Define associations
UserModel.associate(sequelize.models);
PostModel.associate(sequelize.models);
CommentModel.associate(sequelize.models);

// Export models
module.exports = {
  sequelize,
  User: sequelize.models.User,
  Post: sequelize.models.Post,
  Comment: sequelize.models.Comment
};

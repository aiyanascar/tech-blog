const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const PostModel = require('./Post');
const CommentModel = require('./Comment');

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  schema: 'tech_blog_schema', // Ensure the correct schema is used
  logging: false,
});

// Initialize models
UserModel.init(sequelize);
PostModel.init(sequelize);
CommentModel.init(sequelize);

// Define associations
UserModel.associate(sequelize.models);
PostModel.associate(sequelize.models);
CommentModel.associate(sequelize.models);

// Export the Sequelize instance and the models
module.exports = {
  sequelize, // The single Sequelize instance
  User: sequelize.models.User,
  Post: sequelize.models.Post,
  Comment: sequelize.models.Comment,
};

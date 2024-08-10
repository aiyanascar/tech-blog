const { Sequelize } = require('sequelize');
const UserModel = require('/user');
const PostModel = require('/post');
const CommentModel = require('/comment');

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', // or your dialect
    logging: false,      // Disable logging, or you can enable it for debugging
});

// Initialize models
const User = UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);

// Define associations if any
User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

// Export the Sequelize instance and the models
module.exports = {
    sequelize, // The single Sequelize instance
    User,
    Post,
    Comment
};

// models/Post.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Post extends Model {}

Post.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // The name of the table to which it refers
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Post',
  schema: 'tech_blog_schema' // Ensure this matches your schema
});

module.exports = Post;

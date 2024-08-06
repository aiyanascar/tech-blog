const { Model, DataTypes } = require('sequelize');
const User = require('./User');
const Post = require('./Post');

class Comment extends Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, { sequelize });
  }

  static associate(models) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
    });
  }
}

module.exports = Comment;

const { Model, DataTypes } = require('sequelize');

class Comment extends Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      sequelize,
      schema: 'tech_blog_schema',
      modelName: 'Comment',
    });
  }

  static associate(models) {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Post, { foreignKey: 'postId' });
  }
}

module.exports = Comment;

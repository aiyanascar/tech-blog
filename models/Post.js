const { Model, DataTypes } = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      sequelize,
      schema: 'tech_blog_schema',
      modelName: 'Post',
    });
  }

  static associate(models) {
    Post.belongsTo(models.User, { foreignKey: 'userId' });
    Post.hasMany(models.Comment, { foreignKey: 'postId' });
  }
}

module.exports = Post;

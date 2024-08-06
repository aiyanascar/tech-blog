const { Model, DataTypes } = require('sequelize');
const User = require('./User');

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
    }, { sequelize });
  }

  static associate(models) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  }
}

module.exports = Post;

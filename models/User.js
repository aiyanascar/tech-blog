// models/User.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    schema: 'tech_blog_schema', // Specify the schema here
    tableName: 'Users'
  });

  User.associate = (models) => {
    // Define associations here
  };

  return User;
};

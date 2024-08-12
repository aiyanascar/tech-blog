module.exports = (sequelize) => {
  const Comment = sequelize.define('Comment', {
    // Model attributes
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    // Other attributes
  }, {
    schema: 'tech_blog_schema', // Specify the schema here
    tableName: 'Comments'
  });

  Comment.associate = (models) => {
    // Define associations here
  };

  return Comment;
};

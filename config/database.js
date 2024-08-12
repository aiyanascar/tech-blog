const Sequelize = require('sequelize');
const sequelize = new Sequelize('tech_blog', 'user1', 'golden', {
  host: 'localhost', // Adjust if needed
  dialect: 'postgres',
  schema: 'tech_blog_schema', // This is for schema specification
});

module.exports = sequelize;

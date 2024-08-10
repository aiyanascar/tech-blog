const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    schema: 'tech_blog_schema', // specify the schema here
    define: {
        schema: 'tech_blog_schema', // another way to ensure all models use this schema
    },
});

module.exports = sequelize;

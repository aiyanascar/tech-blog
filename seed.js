require('dotenv').config();
const { Sequelize } = require('sequelize');

// Load the environment variables
const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT // Ensure this is set
};

// Initialize Sequelize with the correct dialect
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect, // Ensure the dialect is supplied here
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // Seed your database here
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

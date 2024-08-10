const express = require('express');
const app = express();
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/database');
const commentController = require('./controllers/commentController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the comment controller
app.use('/comments', commentController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

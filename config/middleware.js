const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./database');

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  store: new SequelizeStore({
    db: sequelize,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1800000, // 30 minutes
  },
});

module.exports = sessionMiddleware;

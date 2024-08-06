const request = require('supertest');
const express = require('express');
const userController = require('../controllers/userController');
const { sequelize, User } = require('../models'); 

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/user', userController);

describe('User Controller', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('should sign up a new user', (done) => {
    request(app)
      .post('/user/signup')
      .send({ username: 'testuser', password: 'password123' })
      .expect(302) // assuming a redirect on success
      .end(async (err, res) => {
        if (err) return done(err);
        const user = await User.findOne({ where: { username: 'testuser' } });
        if (user) return done();
        done(new Error('User not created'));
      });
  });

  it('should log in an existing user', (done) => {
    request(app)
      .post('/user/login')
      .send({ username: 'testuser', password: 'password123' })
      .expect(302, done); // assuming a redirect on success
  });
});

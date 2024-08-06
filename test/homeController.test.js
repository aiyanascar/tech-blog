const request = require('supertest');
const express = require('express');
const homeController = require('../controllers/homeController');
const { sequelize } = require('../models'); // Ensure correct import

const app = express();
app.use('/', homeController);

describe('Home Controller', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  after(async () => {
    // Closing connection is not needed here
  });

  it('should return 200 and render home page', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

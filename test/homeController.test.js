const request = require('supertest');
const express = require('express');
const homeController = require('../controllers/homeController');
const { sequelize } = require('../config/database'); 

const app = express();
app.use('/', homeController);

describe('Home Controller', () => {
  before(async () => {
    await sequelize.sync({ force: true }); // reset database
  });

  it('should return 200 and render home page', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

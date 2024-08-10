const request = require('supertest');
const express = require('express');
const homeController = require('../controllers/homeController');

const app = express();
app.use('/', homeController);

describe('Home Controller', () => {
  it('should return 200 and render home page', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

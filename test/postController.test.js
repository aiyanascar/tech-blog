const request = require('supertest');
const express = require('express');
const postController = require('../controllers/postController');
const { User, Post } = require('../models');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/post', postController);

describe('Post Controller', () => {
  before(async () => {
    await User.create({ username: 'testuser', password: 'password123' });
  });

  it('should create a new post', (done) => {
    request(app)
      .post('/post/create')
      .send({ title: 'Test Post', content: 'This is a test post', userId: 1 })
      .expect(302) // assuming a redirect on success
      .end(async (err, res) => {
        if (err) return done(err);
        const post = await Post.findOne({ where: { title: 'Test Post' } });
        if (post) return done();
        done(new Error('Post not created'));
      });
  });

  it('should get a post by ID', (done) => {
    request(app)
      .get('/post/1')
      .expect(200, done);
  });
});


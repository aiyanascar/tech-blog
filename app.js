const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/database');
const sessionMiddleware = require('./config/middleware');
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

app.use('/', homeController);
app.use('/user', userController);
app.use('/post', postController);

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
  });
});

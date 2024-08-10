const express = require('express');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');
const sequelize = require('./config/database');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const User = require('./models/User'); 
const Post = require('./models/Post'); 
const Comment = require('./models/Comment'); 

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({ db: sequelize }),
    resave: false,
    saveUninitialized: false,
}));

// Route handler for the home page
app.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']]
        });
        res.render('home', { posts, user: req.session.user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route handler for the signup page
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Route handler for processing signup form submission
app.post('/signup', async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            return res.status(400).send('Username is already taken');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });

        req.session.user = newUser;
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route handler for the login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Route handler for processing login form submission
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.redirect('/dashboard');
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route handler for the dashboard
app.get('/dashboard', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        const posts = await Post.findAll({ where: { userId: req.session.user.id } });
        res.render('dashboard', { posts, user: req.session.user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route handler for post details
app.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [
                { model: User, attributes: ['username'] },
                { model: Comment, include: [{ model: User, attributes: ['username'] }] }
            ]
        });

        if (post) {
            res.render('post-details', { post, user: req.session.user });
        } else {
            res.status(404).send('Post not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route handler for adding a comment
app.post('/comment/create', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        const { content, postId } = req.body;
        await Comment.create({ content, postId, userId: req.session.user.id });
        res.redirect(`/post/${postId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route handler for logging out
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Start the server
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(err => console.error('Failed to sync database:', err));
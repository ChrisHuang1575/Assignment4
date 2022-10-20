// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const hbs = require('express-hbs');
// Express settings
const app = express();

// Serve static resources
app.use('/public', express.static('public'));


// Render View
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views/partials');

app.get('/', (req,res) =>{
    res.render('blog', {layout: 'blog'})
});

app.get('/blog', (req,res) =>{
    res.render('blog', {layout: 'blog'})
});

app.get('/article/:id', (req,res) =>{
    res.render('article', {layout: 'article'})
});

app.get('/login', (req,res) =>{
    res.render('login', {layout: 'login'})
});

app.get('/regist', (req,res) =>{
    res.render('regist', {layout: 'regist'})
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use(cookieParser());
app.use(session({
    secret: 'positronx',
    saveUninitialized: false,
    resave: false
}));

// Define PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// User router
const user = require('./routes/resigt.routes');
// Initiate API
app.use('/user', user)

// User router
const login = require('./routes/login.routes');
// Initiate API
app.use('/login', login)


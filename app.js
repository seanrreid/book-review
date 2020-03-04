require('dotenv').config();

const express = require('express'),
  session = require('express-session'),
  FileStore = require('session-file-store')(session),
  es6Renderer = require('express-es6-template-engine'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan');

const app = express();

// Define the ES6 Render Templates as our template engine
app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    store: new FileStore({ path: './sessions' }),
    secret: process.env['SESSION_SECRET'],
    resave: false,
    saveUninitialized: true
  })
);

// Define our routes...
const indexRouter = require('./routes/index'),
  usersRouter = require('./routes/users')(app, express);

// Tell the app what to do with the route files...
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

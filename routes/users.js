const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  User = require('../models/users');

router.get('/', (req, res, next) => {
  const { is_logged_in, first_name, last_name, user_id } = req.session;
  console.log('req session', req.session);
  if (is_logged_in === undefined || is_logged_in === false) {
    res.redirect('/users/login');
  }
  if (is_logged_in !== undefined || is_logged_in !== false) {
    res.render('template', {
      locals: {
        title: 'User Profile',
        is_logged_in,
        first_name,
        last_name
      },
      partials: {
        partial: 'partial-profile'
      }
    });
  }
});

router.get('/signup', (req, res, next) => {
  const { is_logged_in, first_name } = req.session;
  res.render('template', {
    locals: {
      title: 'User Sign Up',
      is_logged_in,
      first_name
    },
    partials: {
      partial: 'partial-signup'
    }
  });
});

router.get('/login', (req, res, next) => {
  const { is_logged_in, first_name } = req.session;
  res.render('template', {
    locals: {
      title: 'User Login',
      is_logged_in,
      first_name
    },
    partials: {
      partial: 'partial-login'
    }
  });
});

router.post('/signup', (req, res) => {
  const { email, firstName, lastName } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = new User(null, firstName, lastName, email, hash);

  user.saveUser().then(() => {
    res.redirect('/');
  });
});

router.post('/login', (req, res) => {
  const user = new User(null, null, null, req.body.email, req.body.password);

  // Call the user instance login() method in the User model...
  user.login().then(response => {
    console.log('response is', response);
    if (response.isValid === true) {
      // If we're a valid user then go to the home page
      req.session.is_logged_in = true;
      req.session.user_id = response.user_id;
      req.session.first_name = response.first_name;
      req.session.last_name = response.last_name;
      res.redirect('/');
    } else {
      // If we're NOTE valid user then go to the signup page
      res.sendStatus(401);
      //res.redirect('/users/signup');
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;

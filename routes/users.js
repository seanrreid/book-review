module.exports = function(app, express, passport) {
  const router = express.Router();
  const bcrypt = require('bcryptjs');
  const User = require('../models/users');

  router.get('/', (req, res, next) => {
    if (req.session.is_logged_in === undefined || req.session.is_logged_in === false) {
      res.redirect('/users/login');
    }
    if (req.session.is_logged_in !== undefined || req.session.is_logged_in !== false) {
      res.render('template', {
        locals: {
            title: 'User Profile',
            is_logged_in: req.session.is_logged_in,
            first_name: req.session.first_name
        },
        partials: {
            partial: 'partial-profile'
        }
      });
    }
  })

  router.get('/signup', (req, res, next) => {
    res.render('template', {
      locals: {
          title: 'User Sign Up',
          is_logged_in: req.session.is_logged_in,
          first_name: req.session.first_name
      },
      partials: {
          partial: 'partial-signup'
      }
    });
  });

  router.get('/login', (req, res, next) => {
    passport.authenticate('github');
    res.render('template', {
      locals: {
          title: 'User Login',
          is_logged_in: req.session.is_logged_in,
          first_name: req.session.first_name
      },
      partials: {
          partial: 'partial-login'
      }
    });
  });

  router.post('/signup', (req, res) =>{
    const email = req.body.email;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User(null, firstName, lastName, email, hash);

    user.saveUser().then(() => {
      res.redirect('/');
    });
  });

  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) { 
        return next(err); 
      }
      if (!user) { 
        return res.redirect('/users/login'); 
      }
      if (!!user) {
        req.session.is_logged_in = true;
        req.session.user_id = user.user_id;
        req.session.first_name = user.first_name;
        res.redirect('/');
      }
    })(req, res, next);
  });

  router.get('/login/goodreads', 
    passport.authenticate('goodreads'),
    function(req, res){
      // The request will be redirected to Goodreads for authentication, so this
      // function will not be called.
  });

  router.get('/login/goodreadscallback',  (req, res, next) => {
    passport.authenticate('goodreads', (err, user) => {
      if (err) { 
        return next(err); 
      }
      if (!user) { 
        return res.redirect('/users/login'); 
      }
      if (!!user) {
        req.session.is_logged_in = true;
        req.session.user_id = user.id;
        req.session.first_name = user.displayName;
        res.sendStatus(200);
      }
    });
    res.sendStatus(200);
  });

  router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

  return router;
}
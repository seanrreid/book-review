const express = require('express'),
  router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('template', { 
    locals: {
      is_logged_in: req.session.is_logged_in,
      first_name: req.session.first_name,
      title: 'Home Page'
    },
    partials: {
      partial: 'partial-index'
    }
  });
});

module.exports = router;

const express = require('express'),
  router = express.Router(),
  BooksModel = require('../models/books');

router.get('/', function(req, res, next) {
  res.render('template', {
    locals: {
      is_logged_in: req.session.is_logged_in,
      first_name: req.session.first_name,
      title: `Book List`
    },
    partials: {
      partial: 'partial-books'
    }
  });
});

router.get('/:book_id', async function(req, res, next) {
  const bookId = req.params.book_id;
  const bookData = await BooksModel.getById(bookId);
  const reviewData = await BooksModel.getReviewsById(bookId);

  res.render('template', {
    locals: {
      is_logged_in: req.session.is_logged_in,
      first_name: req.session.first_name,
      title: `Single Book`
    },
    partials: {
      partial: 'partial-single-book'
    }
  });
});

module.exports = router;

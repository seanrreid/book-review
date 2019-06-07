require('dotenv').config();

const LocalStrategy = require('passport-local').Strategy,
    GoodReadsStrategy = require('passport-goodreads').Strategy;

const userController = require('../controllers/users');

module.exports = function(passport) {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, function(req, username, password, done) {
            userController.authenticate(username, password).then(response => {
                return done(null, response);
            });
        }
    ));

    passport.use(new GoodReadsStrategy({
            consumerKey: process.env['GOODREADS_API_KEY'],
            consumerSecret: process.env['GOODREADS_API_SECRET'],
            callbackURL: "/users/login/goodreadscallback"
        }, function(token, tokenSecret, profile, done) {
            process.nextTick(() => {
                return done(null, profile);
            });
        }
    ));

    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });
}
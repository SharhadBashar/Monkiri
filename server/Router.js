const passport = require('passport');
const Authentication = require('./Controllers/Authentication');
const passportService = require('./Services/Passport');

//sessoin = false cause we are using tokens and not cookies
const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {
    //first argument: route that we will handle, in this case '/'
    //second argument: function with three arguments: req, res, next
    //req, short for request is an object representing the incoming http request 
    //res, short for response that we are going to form up and send back to the whoever is making the request
    //next is mostly for error handling
    // app.get('/', function(req, res, next) {
    //    res.send({
    //        type: 'get',
    //        value: null,
    //        message: 'sup'
    //    });
    // });
    app.post('/signUp', Authentication.signUp);
    app.post('/signIn', requireSignin, Authentication.signIn)
}
const jwt = require('jwt-simple');
const User = require('../Models/User'); //This is a class of user. It represents all the users, not just one user
const config = require('../config');

function token(user) {
    const timestamp = new Date().getTime();
    //the code below is standard
    //sub is subject. who is this token about and stuff
    //iat: issued at time 
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signUp = function(req, res, next) {
    //See if user with a given email exists
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({error: 'Must provide email and password'});
    }
    //if user with a given email exists, throw an error
    User.findOne({email: email})
    .then(function(existingUser) {
        if (existingUser) {
            return res.status(422).send({error: 'Email or Username is in use'});
        }
        //else, create a new user
        const user = new User({
            email: email,
            password: password
        });
        user.save()
        .then(function() {
            //respond to request
            res.json({token: token(user)});
        }, function(err) {
            return next(err);
        });
    }, function(err) {
        return next(err);
    });
}

exports.signIn = function(req, res, next) {
    //User already authenticated. just needs to get a token
    res.send({token: token(req.user)});
}
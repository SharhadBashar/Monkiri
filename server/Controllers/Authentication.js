//Where users are authenticated
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
    //See if user with a given username exists
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        return res.status(422).send({error: 'Must provide Username and Password'});
    }
    //if user with a given username exists, throw an error
    User.findOne({username: username})
    .then(function(existingUser) {
        if (existingUser) {
            return res.status(422).send({error: 'Username is taken. Please pick another username'});
        }
        //else, create a new user
        const user = new User({
            username: username,
            password: password,
            language: null
        });
        user.save()
        .then(function() {
            //respond to request
            res.json({
                username: username,
                token: token(user)
            });
        }, function(err) {
            return next(err);
        });
    }, function(err) {
        return next(err);
    });
}

exports.signIn = function(req, res, next) {
    //User already authenticated. just needs to get a token
    res.send({
        username: req.user.username,
        language: req.user.language,
        token: token(req.user)
    });
}

exports.save = function(req, res, next) {
    const username = req.body.username;
    const language = req.body.language;
    if(!username || !language) {
        return res.status(422).send({error: 'Must provide Username and Language'});
    }

    User.findOneAndUpdate({username: username}, {language: language}).exec()
    .then(function(user) {
        res.send({
            username: user.username,
            language: user.language,
        });
    }, function(err) {
        return next(err);
    }); 
}
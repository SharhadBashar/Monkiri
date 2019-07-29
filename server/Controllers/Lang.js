const Language = require('../Models/Language');

exports.add = function(req, res, next) {
    const languageToAdd = req.body.language.toLowerCase();
    
    if(!languageToAdd) {
        return res.status(422).send({error: 'Must provide a language'});
    }

    Language.findOne({language: languageToAdd})
    .then(function(existingLang) {
        if (existingLang) {
            return res.status(422).send({error: 'Language exists'});
        }
        const language = new Language({
            language: languageToAdd
        });
        language.save()
        .then(function() {
            //respond to request
            res.json({
                language: languageToAdd
            });
        }, function(err) {
            return next(err);
        });
    }, function(err) {
        return next(err);
    }); 
}

exports.get = function(req, res, next) {
    languages = [];
    Language.find()
    .then(function(langs) {
        langs.forEach(lang => languages.push(lang.language))
    })
    .then(function() {
        res.send(languages);
    })
}
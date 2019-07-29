//Language model
const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define our model
const langSchema = new Schema({
    language: String
});

//Create the model class
const langModel = mongoose.model('language', langSchema);

//Export the model
module.exports = langModel;
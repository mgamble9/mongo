var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/goat_db');
mongoose.Promise = global.Promise;
var PersonSchema = new mongoose.Schema({
 name: String,
}, {timestamps: true})
var Person = mongoose.model('Person', PersonSchema); // We are setting this Schema in our Models as 'Quote'
// var Goat = mongoose.model('Goat'); // We are retrieving this Schema from our Models, named 'Quote'

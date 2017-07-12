var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/goat_db');
mongoose.Promise = global.Promise;
var GoatSchema = new mongoose.Schema({
 name: String,
 id: String
}, {timestamps: true})
var Goat = mongoose.model('Goat', GoatSchema); // We are setting this Schema in our Models as 'Quote'
// var Goat = mongoose.model('Goat'); // We are retrieving this Schema from our Models, named 'Quote'

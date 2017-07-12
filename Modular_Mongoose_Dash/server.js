// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();

// Require the mongoose Module
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/goat_db');
// mongoose.Promise = global.Promise;
// var GoatSchema = new mongoose.Schema({
//  name: String,
//  id: String
// }, {timestamps: true})
// mongoose.model('Goat', GoatSchema); // We are setting this Schema in our Models as 'Quote'
// var Goat = mongoose.model('Goat') // We are retrieving this Schema from our Models, named 'Quote'
// Require body-parser (to receive post data from clients)

// console.log(User);

var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');

// Setting our Static Folder Directory
// app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
// app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS

app.set('view engine', 'ejs');

// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

// static content
app.use(express.static(path.join(__dirname, './client/static')));

app.set('views', path.join(__dirname, './client/views'));

// Routes
// Root Request

// app.count = 0;

//
// app.get('/', function(req, res) {
//     // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
//     var goats = [];
//     Goat.find({}, function(err, goats){
//       if(err){
//           console.log('there are errors');
//       } else {
//           console.log('successfull db query');
//           res.render('index', {goats : goats});
//       }
//     });
// });
//
// app.get('/goats/new', function(req, res) {
//   res.render('new_goat');
// });
//
// app.get('/goats/edit/:id', function(req, res) {
//   Goat.findOne({id: req.params.id}, function(err, goat){
//     if(err){
//         console.log('there are errors');
//     } else {
//         console.log('successfull db query');
//         res.render('edit_goat', {name : goat.name, id:req.params.id});
//     }
//   });
// });
//
// app.post('/goats', function(req, res) {
//   console.log("processing new goat");
//   app.count++;
//   var goat = new Goat({name: req.body.name, id: app.count});
//   goat.save(function(err) {
//     // if there is an error console.log that something went wrong!
//     if(err) {
//       console.log('something went wrong');
//       // return res.redirect('/');
//     } else { // else console.log that we did well and then redirect to the root route
//         console.log('successfully added a goat!');
//         res.redirect('/');
//     }
//   });
// });
//
// app.get('/goats/:id', function(req, res) {
//   console.log("displaying goat with id " + req.params.id);
//   Goat.findOne({id: req.params.id}, function(err, goat) {
//     if(err) {
//       console.log('something went wrong');
//       // return res.redirect('/');
//     } else { // else console.log that we did well and then redirect to the root route
//         console.log('successfully got a goat to display');
//         console.log(goat.name);
//         res.render('display_goat', {name: goat.name, id: req.params.id});
//     }
//   });
// });
//
// app.post('/goats/:id', function(req, res) {
//   console.log("updating goat with id" + req.params.id);
//   console.log("POST DATA", req.body);
//   Goat.findOne({id: req.params.id}, function(err, goat) {
//     if(err) {
//       console.log('something went wrong');
//       // return res.redirect('/');
//     } else { // else console.log that we did well and then redirect to the root route
//         console.log('successfully updated a goat');
//         goat.name = req.body.name;
//         goat.save(function(err){
//           console.log(goat.name);
//           res.redirect('/');
//         });
//     }
//   });
// });
//
// app.get('/goats/destroy/:id', function(req, res) {
//   console.log("deleting goat with id " + req.params.id);
//   res.render('delete_goat', {id: req.params.id});
// });
//
// app.post('/goats/destroy/:id', function(req, res) {
//   console.log("deleting goat with id" + req.params.id);
//   // console.log("POST DATA", req.body);
//   Goat.remove({id: req.params.id}, function(err) {
//     if(err) {
//       console.log('something went wrong');
//       // return res.redirect('/');
//     } else { // else console.log that we did well and then redirect to the root route
//         console.log('successfully deleted a goat');
//         res.redirect('/');
//     }
//   });
// });



// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    // app.count = 0;
    console.log("listening on port 8000");
})

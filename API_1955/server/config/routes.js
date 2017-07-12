// load the Goat model
// var mongoose = require('mongoose');
// var Goat = mongoose.model('Goat');
var people = require('../controllers/people.js');
// app.count = 0;

module.exports = function(app) {
  // app.count = 0;

  app.get('/', function(req, res) {
    people.index_home(req,res)
  })

  app.get('/new/:name/', function(req, res) {
    people.add(req,res)
  })

  app.get('/remove/:name/', function(req, res) {
    people.remove(req,res)
  })

  app.get('/:name', function(req, res) {
    people.showOne(req,res)
   })

 }

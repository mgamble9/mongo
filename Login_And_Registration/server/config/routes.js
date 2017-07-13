// load the Goat model
// var mongoose = require('mongoose');
// var Goat = mongoose.model('Goat');
var users = require('../controllers/users.js');

module.exports = function(app) {

  app.get('/', function(req, res) {
    console.log(req.session.id);
    res.render('index', {errors:"", pwd_fail:"", input:""})
   })

  app.post('/login', function(req, res) {
    users.login(req,res)
   })

  app.post('/register', function(req, res) {
    users.register(req,res)
   })

  app.get('/result', function(req, res) {
    console.log("successful login (and registered if new user)!" + req.session.id);
    res.render('result', {name: req.session.name});
  })

}

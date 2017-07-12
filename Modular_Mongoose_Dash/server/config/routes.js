// load the Goat model
// var mongoose = require('mongoose');
// var Goat = mongoose.model('Goat');
var goats = require('../controllers/goats.js');
// app.count = 0;

module.exports = function(app) {
  // app.count = 0;

  app.get('/', function(req, res) {
    goats.index_home(req,res)
      // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
      // var goats = [];
      // Goat.find({}, function(err, goats){
      //   if(err){
      //       console.log('there are errors');
      //   } else {
      //       console.log('successfull db query');
      //       res.render('index', {goats : goats});
      //   }
      // });
  })

  app.get('/goats/new', function(req, res) {
    res.render('new_goat')
  })

  app.get('/goats/edit/:id', function(req, res) {
    goats.edit_goat(req,res)
    // Goat.findOne({id: req.params.id}, function(err, goat){
    //   if(err){
    //       console.log('there are errors');
    //   } else {
    //       console.log('successfull db query');
    //       res.render('edit_goat', {name : goat.name, id:req.params.id});
    //   }
    // });
  })

  app.post('/goats', function(req, res) {
    goats.goat_process(req,res)
    // console.log("processing new goat");
    // app.count++;
    // var goat = new Goat({name: req.body.name, id: app.count});
    // goat.save(function(err) {
    //   // if there is an error console.log that something went wrong!
    //   if(err) {
    //     console.log('something went wrong');
    //     // return res.redirect('/');
    //   } else { // else console.log that we did well and then redirect to the root route
    //       console.log('successfully added a goat!');
    //       res.redirect('/');
    //   }
    // });
  })

  app.get('/goats/:id', function(req, res) {
    goats.display_goat(req,res)
    // console.log("displaying goat with id " + req.params.id);
    // Goat.findOne({id: req.params.id}, function(err, goat) {
    //   if(err) {
    //     console.log('something went wrong');
    //     // return res.redirect('/');
    //   } else { // else console.log that we did well and then redirect to the root route
    //       console.log('successfully got a goat to display');
    //       console.log(goat.name);
    //       res.render('display_goat', {name: goat.name, id: req.params.id});
    //   }
    // });
  })

  app.post('/goats/:id', function(req, res) {
    goats.goat_update(req,res)
    // console.log("updating goat with id" + req.params.id);
    // console.log("POST DATA", req.body);
    // Goat.findOne({id: req.params.id}, function(err, goat) {
    //   if(err) {
    //     console.log('something went wrong');
    //     // return res.redirect('/');
    //   } else { // else console.log that we did well and then redirect to the root route
    //       console.log('successfully updated a goat');
    //       goat.name = req.body.name;
    //       goat.save(function(err){
    //         console.log(goat.name);
    //         res.redirect('/');
    //       });
    //   }
    // });
  })

  app.get('/goats/destroy/:id', function(req, res) {
    console.log("deleting goat with id " + req.params.id);
    res.render('delete_goat', {id: req.params.id});
  })

  app.post('/goats/destroy/:id', function(req, res) {
    goats.goat_delete(req,res)
    // console.log("deleting goat with id" + req.params.id);
    // // console.log("POST DATA", req.body);
    // Goat.remove({id: req.params.id}, function(err) {
    //   if(err) {
    //     console.log('something went wrong');
    //     // return res.redirect('/');
    //   } else { // else console.log that we did well and then redirect to the root route
    //       console.log('successfully deleted a goat');
    //       res.redirect('/');
    //   }
    // });
  })
}

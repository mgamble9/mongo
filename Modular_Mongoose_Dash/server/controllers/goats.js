var mongoose = require('mongoose');
var Goat = mongoose.model('Goat');
// app.count = 0;
let count = 0;

module.exports = {
  index_home: function(req,res) {
    var goats = [];
    Goat.find({}, function(err, goats){
      if(err){
          console.log('there are errors');
      } else {
          console.log('successfull db query');
          res.render('index', {goats : goats});
      }
    })
  },

  edit_goat: function(req,res) {
    Goat.findOne({id: req.params.id}, function(err, goat){
      if(err){
          console.log('there are errors');
      } else {
          console.log('successfull db query');
          res.render('edit_goat', {name : goat.name, id:req.params.id});
      }
    })
  },

  goat_process: function(req,res) {
    console.log("processing new goat");
    count++;
    var goat = new Goat({name: req.body.name, id: count});
    goat.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('something went wrong');
        // return res.redirect('/');
      } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully added a goat!');
          res.redirect('/');
      }
    })
  },

  display_goat: function(req,res) {
    console.log("displaying goat with id " + req.params.id);
    Goat.findOne({id: req.params.id}, function(err, goat) {
      if(err) {
        console.log('something went wrong');
        // return res.redirect('/');
      } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully got a goat to display');
          console.log(goat.name);
          res.render('display_goat', {name: goat.name, id: req.params.id});
      }
    })
  },

  goat_update: function(req,res) {
    console.log("updating goat with id" + req.params.id);
    console.log("POST DATA", req.body);
    Goat.findOne({id: req.params.id}, function(err, goat) {
      if(err) {
        console.log('something went wrong');
        // return res.redirect('/');
      } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully updated a goat');
          goat.name = req.body.name;
          goat.save(function(err){
            console.log(goat.name);
            res.redirect('/');
          });
      }
    })
  },

  goat_delete: function(req,res) {
    console.log("deleting goat with id" + req.params.id);
    // console.log("POST DATA", req.body);
    Goat.remove({id: req.params.id}, function(err) {
      if(err) {
        console.log('something went wrong');
        // return res.redirect('/');
      } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully deleted a goat');
          res.redirect('/');
      }
    })
  },

}

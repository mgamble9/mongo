var mongoose = require('mongoose');
var Person = mongoose.model('Person');

module.exports = {
  index_home: function(req,res) {
    Person.find({}, function(err, people){
      if(err){
          console.log('there are errors');
      } else {
          console.log(people);
          res.json(people);
      }
    })
  },

  add: function(req,res) {
    console.log("processing new person");
    var person = new Person({name: req.params.name});
    person.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('something went wrong');
        // return res.redirect('/');
      } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully added a person!');
          res.redirect('/');
      }
    })
  },

   showOne: function(req,res) {
    console.log("showing person named " + req.params.name);
    Person.findOne({name: req.params.name}, function(err, person) {
      if(err) {
        console.log('something went wrong');
      } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully displayed a person');
          res.json(person);
      }
    })
  },

  remove: function(req,res) {
    console.log("deleting person " + req.params.name);
    Person.remove({name: req.params.name}, function(err) {
      if(err) {
        console.log('something went wrong');
      } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully deleted a person');
          res.redirect('/');
      }
    })
  },

}

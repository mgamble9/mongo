var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

module.exports = {
  register: function(req,res){
      console.log(req.body);
      var newUser = new User({
              email: req.body.email,
              name: {first: req.body.first_name, last: req.body.last_name},
              password: req.body.password,
              dob: req.body.dob,
          });
      if (req.body.password != req.body.password_confirm){
          newUser.validate(function(err){
              if (err){
                  console.log(err, "in password mismatch");
                  res.render('index', {errors: err, pwd_fail: true, input: ""});
              } else {
                  res.render('index', {pwd_fail: true, errors: "", input: ""});
              }
          });
      } else {
          console.log("in control else");
          console.log(newUser);
          newUser.save(function(err, user){
              if(err){
                  console.log("save error", err);
                  console.log(err['name']);
                  res.render('index', {errors: err, pwd_fail:false, input: ""});
              } else {
                  console.log("register success")
                  req.session.id = user.id;
                  req.session.name = user.name.first;
                  console.log(req.session.id);
                  res.redirect('/result');
              }
          })
      }
  },

  login: function(req,res){
      console.log("Input for login:" + req.body.email);
      if (! req.body.email || !req.body.password){
          res.render('index', {errors:'fail', pwd_fail:false, input: ""});
      } else {
          User.findOne({email: req.body.email}, function(err, user){
              if (err || !(user)) {
                  console.log("login errors", err);
                  res.render('index', {errors:err, pwd_fail:false, input: ""});
              } else {
                  console.log("User is: ", user);
                  if (bcrypt.compareSync(req.body.password, user.password)){
                      console.log("password Match");
                      req.session.id = user.id;
                      req.session.name = user.name.first;
                      console.log(req.session.id);
                      res.redirect('/result')
                  } else {
                      console.log("incorrect password");
                      res.render('index', {errors:"login error", pwd_fail:true, input: "" });
                  }
              }
          });
      }
  },

}

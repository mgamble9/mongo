var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/goat_db');
var bcrypt = require('bcrypt');
mongoose.Promise = global.Promise;

var validator = require('validator');
var validate = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2,50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters!'
  }),
  validate({
    validator: 'isAlphanumeric',
    message: 'Name should contain alpha-numeric characters only!'
  })
];

var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Please enter a valid email address!'
  })
];

var passwordValidator = [
  validate({
    validator: 'matches',
    arguments: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/i,
    message: 'Password failed validation, you must have at least one number, one uppercase, and one special character!'
  })
];


var UserSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: [true, "first name cannot be blank!"],
      trim: true,
      validate: nameValidator
    },
    last: {
      type: String,
      required: [true, "last name cannot be blank!"],
      trim: true,
      validate: nameValidator
    },
  },

  email: {
    type: String,
    required: [true, "Email is required!"],
    trim: true,
    unique: true,
    validate: emailValidator
  },

  //password
  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: 8,
    maxlength: 32,
    validate: passwordValidator
  },

  // birthday - required, at least 16 year old
  dob: {
    type: Date,
    required: [true, "DOB is required!"],
    trim: true,
    validate: {
        validator: function( dob ) {
            // console.log(birthday.getTime())
            // console.log(Date.now())
            return ((Date.now() - (24*3600*1000*365*16))> dob.getTime());
        },
        message: "Must be 16 years or older to use this site"
    }
  },
}, {timestamps: true});

UserSchema.pre('save', function(done){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    console.log(this.password)
    done();
});

var User = mongoose.model('User', UserSchema);

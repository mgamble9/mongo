// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require the mongoose Module
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotes_db');
mongoose.Promise = global.Promise;
var QuoteSchema = new mongoose.Schema({
 name: String,
 quote: String
}, {timestamps: true})
mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'Quote'
var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'Quote'
// Require body-parser (to receive post data from clients)

// console.log(User);

var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('index');
});
// Add User Request
app.post('/process', function(req, res) {
    console.log("POST DATA", req.body);
    if (req.body.quote_add) {
      // let new_date = new Date();
      var quote = new Quote({name: req.body.name, quote: req.body.quote});
      quote.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log('something went wrong');
          // return res.redirect('/');
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a quote!');
            res.redirect('/quotes');
        }
      });
    }
    else if (req.body.skip_quote) {
      res.redirect('/quotes');
    }
});

app.get('/quotes', function(req, res) {
    console.log("hey1");
    Quote.find({}, function(err, quotes){
      if(err){
          console.log('there are errors');
      } else {
          console.log('successfull db query');
          res.render('quotes', {quotes : quotes});
      }
    });
});


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})

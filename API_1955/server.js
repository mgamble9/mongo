// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// helps correctly read JSON
app.use(bodyParser.json());

// Require path
var path = require('path');
app.set('view engine', 'ejs');

// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

// static content
app.use(express.static(path.join(__dirname, './client/static')));

app.set('views', path.join(__dirname, './client/views'));

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    // app.count = 0;
    console.log("listening on port 8000");
})

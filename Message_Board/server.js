var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/message_board_db');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var messageSchema = new mongoose.Schema({
 name: {type:String, required: true, minlength: 4},
 message: {type:String, required:true},
 comments: [{type:Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true})
mongoose.model('Message', messageSchema); // We are setting this Schema in our Models as 'Message'
var Message = mongoose.model('Message') // We are retrieving this Schema from our Models, named 'Message'

var commentSchema = new mongoose.Schema({
    name: {type:String, required: true},
    text:{type:String, required:true},
    _message: {type:Schema.Types.ObjectId, ref:'Message'}
},{timestamps:true});
mongoose.model('Comment', commentSchema);
var Comment = mongoose.model('Comment');

app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.errors = "";
app.get('/', function(req, res) {
    Message.find({})
    .populate('comments')
    .exec(function(err,messages){
        console.log(messages);
        res.render('index', {messages:messages, errors:app.errors})
    })
});

// Add User Request
app.post('/message', function(req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
    var message = new Message({name: req.body.name, message: req.body.message});
    message.save(function(err){
        if(err){
            console.log('something went wrong');
            app.errors = err;
            res.redirect('/')
        } else {
            app.errors = "";
            console.log('successfully added a message');
            res.redirect('/');
        }
    });
});

app.post('/comment', function(req, res){
    Message.findOne({_id: req.body.id}, function (err, message){
        var comment = new Comment({name:req.body.name, text:req.body.comment});
        comment._message = message._id;
        message.comments.push(comment);
        comment.save(function(err){
            if(err){
                console.log('comment errors', err);
                errors = err;
                res.redirect('/');
            } else {
                errors = "";
            message.save(function(err){
                if(err){
                    console.log('errors', err);
                } else {
                    res.redirect('/')
                }
            })
            }
        })
    })
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});

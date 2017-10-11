var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    port = 8000,
    mongoose = require("mongoose"),
    app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/Restful_API');

var  TaskSchema= new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, default: ""},
    completed: {type: Boolean, default: false},
},{timestamps: true});

var Task = mongoose.model('tasks', TaskSchema);

app.get('/tasks',function(req, res){
    Task.find({},function(err,results){
        if(err){
            res.json(err);
        }
        else{
            res.json(results);
        }
    });
});

app.get('/tasks/:id',function(req, res){
    Task.find({_id: req.params.id},function(err,results){
        if(err){
            res.json(err);
        }
        else{
            res.json(results);
        }
    });
});

app.post('/tasks',function(req, res){
    var task = new Task(req.body);
    task.save(function(err, result){
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.put('/tasks/:id',function(req, res){
    Task.update({_id: req.params.id}, req.body , function(err,results){
        if(err){
            res.json(err);
        }
        else{
            res.json(results);
        }
    });
});

app.delete('/tasks/:id',function(req, res){
    Task.remove({_id: req.params.id}, function(err,results){
        if(err){
            res.json(err);
        }
        else{
            res.json(results);
        }
    });
});

app.listen(port, function() {
    console.log("listening on port: ", port);
});


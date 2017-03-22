var express = require("express");
var parser = require("body-parser");
var hbs = require("express-handlebars");
var mongoose = require("./db/connection.js");


var app = express();

var Todo = mongoose.model("Todo");

app.set("port", process.env.PORT || 3001);
// app.set("view engine", "hbs");
// app.engine(".hbs", hbs({
//   extname:         ".hbs",
//   partialsDir:    "views/",
//   layoutsDir:     "views/",
//   defaultLayout:   "layout-main"
// }));
app.use("/assets", express.static("public"));
app.use(parser.json({extended: true}));

app.use(express.static(__dirname + "/public"))

// app.get("/", function (req, res){
//   res.render("todos");
// });

app.get("/api/todos", function(req,res){
  Todo.find({}).then(function(todos){
    res.json(todos)
  });
});

app.get("/api/todos/:title", function(req,res){
  Todo.findOne({title: req.params.title}).then(function(todo){
    res.json(todo)
  })
})

app.post("/api/todos", function(req, res){
  Todo.create(req.body).then(function(todo){
    res.json(todo)
  })
})
app.delete("api/todo/:title", function(req, res){
  Todo.findOneAndRemove({title: req.params.title}).then(function(){
    res.json({success: true})
  })
})
// app.get("/api/todos", function())






app.put("/api/todos/:title", function(req, res){
  Todo.findOneandUpdate({title: req.params.title}, req.body.todo, {new: true}).then(function(todo){
    res.json(todo)
  });
});

app.get("*", function(req, res){
  res.sendfile('./public/layout-main.html');
});

app.listen(app.get("port"), function (){
  console.log("live!!!")
})

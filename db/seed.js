var mongoose = require("./connection");

var seedData = require("./seeds");

var Todo = mongoose.model("Todo");
//.then is a promise
  Todo.remove({}).then(function(){
    Todo.collection.insert(seedData).then(function(){
      process.exit();
    })
  })

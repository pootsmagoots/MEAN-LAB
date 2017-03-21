var mongoose = require ("mongoose");

var TodoSchema = new mongoose.Schema(
  {
    title: String,
    content: String
  }
);

mongoose.model("Todo", TodoSchema);
mongoose.connect("mongodb://localhost/MEAN-LAB", (err) =>{
if(err){
  console.log(err)
} else{
  console.log("connected baby")
  }
})





module.exports = mongoose;

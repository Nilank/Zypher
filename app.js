var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

//MongoDB connection
mongoose.connect(
  "mongodb://nilsharma:nil123@ds337377.mlab.com:37377/nodeassignment",
  { useNewUrlParser: true }
);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  designation: String,
  address: String,
  interests: Array
});

var Student = mongoose.model("Student", studentSchema);

app.get("/",function(req,res){
  res.redirect("/students");
  
});

app.get("/students", function(req, res) {
  Student.find({},function(err,students){
    if(err){
      console.log("ERROR!");
    }else{
        res.render("index", {students: students});
      
    }
  })

});

//NEW ROUTE
app.get("/students/new", function(req, res) {
  res.render("new");
});

//CREATE ROUTE
app.post("/students", function(req,res){
  Student.create(req.body.student, function(error,newStudent){
    if(error){
      res.render("new");
    }else{
      res.redirect("students");
    }
    
  });
  
});

//SHOW ROUTE
app.get("/students/:id", function(req,res){
  Student.findById(req.params.id, function(err, foundStudent){
    if(err){
      res.redirect("/students");
    }else{
      res.render("show", {student: foundStudent});
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server Started!");
});

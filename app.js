var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer");
var methodOverride = require("method-override");
var Student = require("./models/student");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var app = express();


seedDB();
//MongoDB connection
mongoose.connect("mongodb://nilsharma:nil123@ds337377.mlab.com:37377/nodeassignment",{ useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.get("/",function(req,res){
  res.redirect("/students");
  
});

app.get("/students", function(req, res) {
  Student.find({},function(err,students){
    if(err){
      console.log("ERROR!");
    }else{
        res.render("students/index", {students: students});
      
    }
  })

});

//NEW ROUTE
app.get("/students/new", function(req, res) {
  res.render("students/new");
});

//CREATE ROUTE
app.post("/students", function(req,res){
  req.body.student.body = req.sanitize(req.body.student.body);
  Student.create(req.body.student, function(error,newStudent){
    if(error){
      res.render("students/new");
    }else{
      res.redirect("students");
    }
    
  });
  
});

//SHOW ROUTE
app.get("/students/:id", function(req,res){
  Student.findById(req.params.id).populate("comments").exec(function(err, foundStudent){
    if(err){
      res.redirect("/students");
    }else{
      console.log(foundStudent);
      res.render("students/show", {student: foundStudent});
    }
  });
});

//EDIT ROUTE
app.get("/students/:id/edit", function(req, res) {
  Student.findById(req.params.id, function(err,foundStudent){
    if(err){
      res.redirect("/students");
    }else{
      res.render("students/edit", {student:foundStudent});
    }
    
  });
    
});

//UPDATE ROUTE
app.put("/students/:id", function(req,res){
  req.body.student.body = req.sanitize(req.body.student.body);
  Student.findByIdAndUpdate(req.params.id, req.body.student, function(err,foundStudent){
    if(err){
      res.redirect("/students");
    }else{
      res.redirect("/students/" + req.params.id);
    }
  });
});

//DELETE ROUTE
app.delete("/students/:id", function(req,res){
  Student.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/students");
    }else{
      res.redirect("/students");
    }
    
  });
});



app.get("/students/:id/comments/new", function(req, res) {
  Student.findById(req.params.id, function(err, student){
    if(err){
      console.log(err);
    }else{
      console.log(student);
        res.render("comments/new", {student: student});
    }
    
  });
  
});

app.post("/students/:id/comments", function(req,res){
  Student.findById(req.params.id, function(err, student) {
    if(err){
      console.log(err);
      res.redirect("/students");
    }else{
      Comment.create(req.body.comment, function(err,comment){
        if(err){
          console.log(err);
        }else{
          student.comments.push(comment);
          student.save();
          res.redirect("/students/" + student._id);
        }
        
      });
    }
      
  });
  
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server Started!");
});

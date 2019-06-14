var mongoose = require("mongoose");
var Student = require("./models/student");
var Comment = require("./models/comment");

var data = [
    {
        name: "Ashutosh Garg",
        email: "ashu@gmail.com",
        number: 987654321,
        designation: "Monitor",
        address: "221 Baker Street",
        interests: ["Hockey", "Coding", "Footbal"]
    },
    {
        name: "Vijay Sharma",
        email: "vjsha@yahoo.com",
        number: 9876543210,
        designation: "CR",
        address: "223 Baker Street",
        interests: ["Hockey", "Coding"]
    },
    {
        name: "Rahul Gupta",
        email: "rahul@gmail.com",
        number: 9876543111,
        designation: "CEO",
        address: "22 Baker Street",
        interests: ["Coding", "Footbal"]
    }
    
    ]

function seedDB(){
    Student.remove({}, function(err){
        if(err){
            console.log("ERROR!");
        }
        console.log("Students Removed!");
    });
    data.forEach(function(seed){
        Student.create(seed, function(err,student){
            if(err){
                console.log("ERROR!");
            }else{
                console.log("Student Added!");
                
                //Create Comment
                Comment.create(
                    {
                        text:"You are genius!",
                        author:"Homie"
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }else{
                                student.comments.push(comment);
                                student.save();
                                console.log("Created New Comment!");
                            
                        }

                        
                    }
                );
            }
            
        });
    });
}

module.exports = seedDB;
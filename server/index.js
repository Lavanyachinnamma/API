const express = require("express");
const app = express();
const mongoose = require("mongoose");
const StudentModel = require("./models/Student");
const cors = require("cors");

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://admin:admin@cluster0.01yis73.mongodb.net/api?retryWrites=true&w=majority");


app.get("/getStudent", (req, res) => {
    StudentModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/createStudent", async(req, res) => {
    const student = req.body;
    const newStudent = new StudentModel(student);
    await newStudent.save();
    res.json(student);
});

app.put("/updateStudent", async(req , res) => {
    const newAddress = req.body.newAddress;
    const id = req.body.id;

    try {
        await StudentModel.findById(id,(error, studentToUpdate) => {
            studentToUpdate.saddress =  newAddress;
            studentToUpdate.save();
        });
    }catch(err){
        console.log(err);
    }
   res.send("Updated student deatils");
});

app.delete(`/delete/:id`, async(req , res) =>{
    const id = req.params._id
    try{
        await StudentModel.findByIdAndRemove(id).exec()
        res.send("deatails deleted.")

    }catch(err){
        console.log(err);
    }
  
});



app.listen(8000, () => {
    console.log("Server runs perfectly on 8000");
});

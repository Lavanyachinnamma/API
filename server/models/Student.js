const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
    sname : {
    type : String,
    require:true,
    },
    sroll : {
        type :String,
        require:true,
    },
    saddress : {
        type :String,
        require:true,
    },
});

const StudentModel =  mongoose.model("students",StudentSchema);
module.exports = StudentModel;
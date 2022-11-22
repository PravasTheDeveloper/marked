const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {Schema} = mongoose;

const ProjectTaskSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    fullName:{
        type:String,
        require:true
    },
    projectName: {
        type: String,
        require: true
    },
    workDetails: [{
        title:{
            type:String,
        },
        subtitle:{
            type:String,
        },
        heading:{
            type:String
        },
        cDate:{
            type:String
        },
        lastDate:{
            type:String
        },
        workDone:{
            type:Boolean,
            default:false
        },
        workDoneAdmin:{
            type:Boolean,
            default:false
        },workLink:{
            type:String
        },workLinkUser:{
            type:String
        }
    }],
});

const AllProjectTask = new mongoose.model("ProjectTask", ProjectTaskSchema);

module.exports = AllProjectTask;
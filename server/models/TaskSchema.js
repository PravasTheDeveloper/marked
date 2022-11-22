const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {Schema} = mongoose;

const TaskSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    tasks: [{
        taskChatagory: {
            type: String,
        },
        titile: {
            type: String,
        },
        subtitle: {
            type: String,
        },
        content: {
            type: String,
        },
        done: {
            type: Boolean,
            default:false
        },
        lastDate:{
            type:String
        },
        cDate:{
            type:String
        },
        date: {
            type: Date,
            default: Date.now
        },
    }]
});

//Generate Web Token

// TaskSchema.methods.generateAuthToken = async function(){
//     try{
//         let token = jwt.sign({_id:this._id} , process.env.SECRET_KEY);
//         this.tokens = this.tokens.concat({token:token});
//         await this.save();
//         return token;
//         // console.log(process.env.SECRET_KEY)
//     }catch(err)
//     {
//         console.log(err);
//     }
// }


//WE NEED TO CREATE COLLECTION

const AllTask = new mongoose.model("Task", TaskSchema);

module.exports = AllTask;
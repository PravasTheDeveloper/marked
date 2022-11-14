const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {Schema} = mongoose;

const ProjectSchema = new mongoose.Schema({
    userNameAdmin: {
        type: String,
        require: true
    },
    projectMembers: [{
        projectMembersUname:{
            type:String,
        },
        memberAct:{
            type:String,
        },
    }],
    tasks: [{
        projectMembersUname:{
            type:String,
        },
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
        date: {
            type: Date,
            default: Date.now
        },
    }]
});

//Generate Web Token

// ProjectSchema.methods.generateAuthToken = async function(){
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

const AllProject = new mongoose.model("Project", ProjectSchema);

module.exports = AllProject;
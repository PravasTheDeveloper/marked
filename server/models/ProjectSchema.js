const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {Schema} = mongoose;

const ProjectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        require:true
    },
    userNameAdmin: {
        type: String,
        require: true
    },
    projectType:{
        type:String,
        require:true
    },
    projectMembers: [{
        projectMembersUname:{
            type:String,
        },
        projectMembersName:{
            type:String
        },
        memberAct:{
            type:String,
            default:"Mod"
        },
    }],
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
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userallSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true
    },
    country: {
        type: String,
        require:true
    },
    password: {
        type: String,
        required: true
    },
    premieamAcc: {
        type: Boolean,
        default:false
    },
    verifiedAcct: {
        type: Boolean,
        default:false
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [{
        token: {
            type: String,
        }
    }]
});


userallSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

//Generate Web Token

userallSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id} , process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
        // console.log(process.env.SECRET_KEY)
    }catch(err)
    {
        console.log(err);
    }
}


//WE NEED TO CREATE COLLECTION

const AllUser = new mongoose.model("User", userallSchema);

module.exports = AllUser;
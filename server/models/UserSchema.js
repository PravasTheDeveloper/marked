const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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


//WE NEED TO CREATE COLLECTION

const AllUser = new mongoose.model("User", userallSchema);

module.exports = AllUser;
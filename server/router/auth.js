const express = require("express");
const router = express.Router();
require('../database/connect');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate")
const cookieParser = require("cookie-parser");

router.use(cookieParser());

const AllUser = require("../models/UserSchema");
const AllTask = require("../models/TaskSchema");
const AllProject = require("../models/ProjectSchema");

//HOME ROUTER ===============================

router.get("/", (req, res) => {
    res.send("HELLO FORM ROUTER");
});

//REGISTRATION ROUTER ===============================

router.post("/register", async (req, res) => {

    const { fname, lname, email, profession, country, phone, password, cpassword } = req.body;
    if (!fname || !lname || !country || !email || !phone || !password || !cpassword) {
        return res.status(421).json({ error: "PLESE FILL ALL THE FEILD" });
    } else {
        try {

            const UserExist = await AllUser.findOne({ email: email });
            if (UserExist) {
                return res.status(422).json({ error: "This Email Already Exist" });
            } else {
                if (password === cpassword) {

                    const rand = Math.floor(Math.random() * 1000000000);

                    const userName = `${fname}${rand}`

                    const registerUser = new AllUser({
                        fname, lname, userName, email, phone, profession, country, password, cpassword
                    });
                    const registerTask = new AllTask({
                        userName
                    });
                    const registerProject = new AllProject({
                        userName
                    });
                    
                    const registeredUser = await registerUser.save();
                    const registeredTask = await registerTask.save();
                    const registeredProject = await registerProject.save();

                    if (registeredUser && registeredTask && registeredProject) {
                        res.status(200).json({ messege: "Detail Saved" })
                    }
                } else {
                    res.status(401).json({ error: "Your Password Is Not Same !" });
                }
            }
        } catch (err) {
            res.status(400).json({ error: `${err}` })
            console.log(err);
        }

    }

});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Plese Fill All The Fill" });
    } else {
        try {
            const findEmail = await AllUser.findOne({ email: email });

            if (findEmail) {
                const isMatch = await bcrypt.compare(password, findEmail.password);
                const token = await findEmail.generateAuthToken();

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000)
                })

                if (isMatch) {
                    res.send("LOGIN SUCCESSFULL");
                } else {
                    res.status(400).json({ error: "Invalid Login !" });
                }
            } else {
                res.status(400).json({ error: "Invalid Login !" });
            }


        } catch (error) {
            res.status(400).json({ error: "Something Went Wrong" });
            console.log(error);
        }
    }
});

router.post("/regtask", async (req, res) => {
    const { userName } = req.body;

    try {
        

        if (registeredTask) {
            res.status(200).json({ messege: "Detail Saved" })
        }
        else {
            res.status(401).json({ error: "Your Password Is Not Same !" });
        }

    } catch (err) {
        res.status(400).json({ error: `${err}` })
        console.log(err);
    }


});

router.get("/today", authenticate, (req, res) => {
    res.send(req.rootUser);
})

module.exports = router;
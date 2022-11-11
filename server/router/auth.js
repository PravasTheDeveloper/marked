const express = require("express");
const router = express.Router();
require('../database/connect');
const bcrypt = require("bcryptjs");

const AllUser = require("../models/UserSchema")

//HOME ROUTER ===============================

router.get("/", (req, res) => {
    res.send("HELLO FORM ROUTER");
});

//REGISTRATION ROUTER ===============================

router.post("/register", async (req, res) => {

    const { fname, lname, email, profession,country, phone, password, cpassword } = req.body;
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

                    const registerEmployee = new AllUser({
                        fname, lname, userName, email, phone, profession,country, password, cpassword
                    });

                    const registered = await registerEmployee.save();

                    if (registered) {
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

module.exports = router;
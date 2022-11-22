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
const AllProjectTask = require("../models/ProjectTask");

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


                    const registeredUser = await registerUser.save();
                    const registeredTask = await registerTask.save();


                    if (registeredUser && registeredTask) {
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

router.post("/addtask", async (req, res) => {
    const { userName, taskChatagory, titile, subtitle, content, lastDate, cDate } = req.body;
    if (!taskChatagory || !titile || !subtitle || !content || !lastDate || !cDate) {
        return res.status(422).json({ error: "Please Fill All The Feild" });
    } else {
        try {

            const UserExist = await AllTask.findOne({ userName: userName });

            UserExist.tasks = UserExist.tasks.concat({ taskChatagory, titile, subtitle, content, lastDate, cDate });

            const registered = await UserExist.save();

            if (registered) {
                res.status(200).json({ messege: "Detail Saved" })
            } else {
                res.status(401).json({ error: "Your Password Is Not Same !" });
            }

        } catch (err) {
            res.status(400).json({ error: `${err}` })
            console.log(err);
        }

    }

});


router.post("/gettaskdata", authenticate, async (req, res) => {
    // console.log(req.rootUser.userName);
    // res.send(req.rootUser);
    const userName = req.rootUser.userName;

    const UserExist = await AllTask.findOne({ userName: userName });

    res.send(UserExist.tasks);
})

router.post("/dailytaskdone", async (req, res) => {
    const { id } = req.body;

    try {

        const UserExist = await AllTask.updateOne({ "tasks._id": id }, { $set: { "tasks.$.done": true } })

    } catch (err) {
        res.status(400).json({ error: `${err}` })
        console.log(err);
    }


});

router.post("/dailytaskdelete", async (req, res) => {
    const { id } = req.body;

    try {

        const UserExist = await AllTask.updateOne({ "tasks._id": id }, { $pull: { tasks: { _id: id } } })

        res.send(UserExist)

    } catch (err) {
        res.status(400).json({ error: `${err}` })
        console.log(err);
    }


});

router.post("/projectcreate", authenticate, async (req, res) => {
    const userNameAdmin = req.rootUser.userName;
    const { projectName, projectType } = req.body;

    if (!projectName || !userNameAdmin) {
        return res.status(422).json({ error: "Please Fill All The Feild" });
    } else {
        try {
            const ProjectExist = await AllProject.findOne({ projectName: projectName });
            if (ProjectExist) {
                return res.status(422).json({ error: "The Project Is Already Exist" });
            } else {



                const registerProject = new AllProject({ projectName, userNameAdmin, projectType });

                const regitered = await registerProject.save();

                if (regitered) {
                    res.status(200).json({ messege: "Detail Saved" })
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

// router.post("/getPorjectAllData", async (req, res) => {

//     const { userNameAdmin }= req.body;

//     console.log(userNameAdmin)



//     res.send(UserExist);
// })
router.get("/getPorjectAllData", authenticate, async (req, res) => {
    // console.log(req.rootUser.userName);
    // res.send(req.rootUser);
    const userNameAdmin = req.rootUser.userName;

    const UserExist = await AllProject.find({ userNameAdmin: userNameAdmin });

    res.send(UserExist);
})

router.get("/searchMembers", async (req, res) => {

    // const {userNameAdmin} = req.body;

    const UserExist = await AllUser.find();

    res.send(UserExist);
})

router.post("/addProjectMembers", async (req, res) => {

    const { projectMembersUname, projectName, projectMembersName } = req.body;
    // console.log(projectMembersUname)
    if (!projectMembersName || !projectName) {
        return res.status(422).json({ error: "Please Fill All The Feild" });
    } else {
        try {

            const UserExist = await AllProject.findOne({ projectName: projectName });

            UserExist.projectMembers = UserExist.projectMembers.concat({ projectMembersUname, projectMembersName });

            const registered = await UserExist.save();

            if (registered) {
                res.status(200).json({ messege: "Detail Saved" })
            } else {
                res.status(401).json({ error: "Your Password Is Not Same !" });
            }
        } catch (err) {
            res.status(400).json({ error: `${err}` })
            console.log(err);
        }

    }
})
router.get("/showProjectMembers", async (req, res) => {

    const { projectName } = req.body;

    try {

        const UserExist = await AllProject.findOne({ projectName: projectName });

        const userHello = UserExist

        // userHello.forEach(element => {
        //     if (element.projectMembersUname == "Pravas930642727") {
        //         res.send(element)
        //     }
        // }
        // );
        res.send(userHello.projectMembers)
    } catch (err) {
        res.status(400).json({ error: `${err}` })
        console.log(err);
    }


})



module.exports = router;
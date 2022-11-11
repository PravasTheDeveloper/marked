const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path : "./config.env"})

require('./database/connect')



app.use(express.json());
app.use(require("./router/auth"));

const Port = process.env.PORT;



app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(Port,()=>{
    console.log(`Running Server ${Port}`)
})
const mongoose = require('mongoose')

const DB = process.env.DATABASE

mongoose.connect(DB, {useNewUrlParser: true,useUnifiedTopology: true})
.then(() => {
    console.log(`Conntion Success`);
}).catch((e) => {
    console.log(`${e}`);
})
const mongoose = require("mongoose")

const connectDB= async (url,string)=>{
    await mongoose.connect(url)
    console.log(string)
}

module.exports =connectDB
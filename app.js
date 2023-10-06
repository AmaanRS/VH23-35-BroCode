const express = require("express")
const cors = require("cors")
const connectDB = require("./db/connect")
const router = require("./Routes/Router")
// const isSignedIn = require("./Middlewares/middlewares")
const fileUpload = require("express-fileupload")
const path = require("path")
require("dotenv").config()


//Initiliaze express app
const app = express()

//Template engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())
// app.use(isSignedIn)


//Serve html templates
app.set('views', path.join(__dirname, 'public/Templates'));

// Serve static files (e.g., CSS, images)
app.use(express.static(path.join(__dirname, '/public')));

//Routes
app.get("/",(req,res)=>{
    res.render("login")
})

app.use("/",router)


//Listening to port
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI,"Databse connected")
        app.listen(process.env.PORT,console.log(`Listening to port ${process.env.PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()
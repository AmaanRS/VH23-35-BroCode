const express = require("express")
const cors = require("cors")
const connectDB = require("./db/connect")
const routes = require("./Routes/Router")
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


//Serve html templates
app.set('views', path.join(__dirname, 'public/Templates'));


//Routes
app.get("/home",(req,res)=>{
    res.render("home")
})

app.use("/",routes)


//Listening to port
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI,"Databse connected")
        app.listen(process.env.PORT,console.log(`Listening to port ${process.env.PORT}`))
        console.log(__dirname)
    } catch (error) {
        console.log(error)
    }
}
start()
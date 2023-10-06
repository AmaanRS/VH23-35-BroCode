const user_model  = require("../Model/user_model.js")
const  doctor_model = require("../Model/doctor_model.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SignUpUser = async (req, res) => {
    try {
        let { username, address, age, contact_number, aadhar_card_number, aadhar_card_photo, pan_card_photo, pan_card_number, self_photo, blood_group, medical_history, gender, email, password,date_of_birth } = req.body
        let existinguser = await user_model.findOne({ email: email })
        if (existinguser) {
            return res.status(400).json({ message: "User already exist" })
        }
        // date_of_birth = "29/12/2003"
        let dob_splited = date_of_birth.split("-")
        let birthdate = new Date(dob_splited[2],dob_splited[1] - 1, dob_splited[0]);
        // const birthdate = new Date(2004 yyyy, 2 - 1 mm, 2 dd);
        function agefun1(birthdate) {
            let today = new Date();
            let age = today.getFullYear() - birthdate.getFullYear() -
                (today.getMonth() < birthdate.getMonth() ||
                    (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
                    console.log("inside fuct")
            return age;
        }
        let calc_age = await agefun1(birthdate);
        let hashedPassword = await bcrypt.hash(password, 10)
        let result = await user_model.create({
            email: email,
            username: username,
            password: hashedPassword,
            address: address, age: calc_age,date_of_birth:date_of_birth, contact_number: contact_number,
            aadhar_card_number: aadhar_card_number, aadhar_card_photo: aadhar_card_photo, pan_card_number: pan_card_number, pan_card_photo: pan_card_photo, self_photo: self_photo, blood_group: blood_group, medical_history: medical_history,
            gender: gender
        })
        let token = await jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY)
        res.status(201).json({ user: result, token: token })
    } catch (error) {
        res.status(500).json({ message: "something went wrong in SignUpUserController", msg: error.message})
    }
}

const SignUp = async(req,res)=>{
    res.render("signup")
}

const LoginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const existinguser = await user_model.findOne({ email: email })
        if (!existinguser) {
            return res.status(400).json({ message: "User not found" })
        }
        const matchPassword = await bcrypt.compare(password, existinguser.password)
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.SECRET_KEY)
        res.status(201).json({ user: existinguser, token: token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong in LoginUserController", message: err.message })
    }

}
const SignUpDoctor = async (req, res) => {
    try {
        let { username, address, age, contact_number, aadhar_card_number, aadhar_card_photo, pan_card_photo, pan_card_number, self_photo, gender, email, password,date_of_birth,department,expertise,practice,languages,education} = req.body

        const existinguser = await doctor_model.findOne({ email: email })
        if (existinguser) {
            return res.status(400).json({ message: "User already exist" })
        }   

        let dob_splited = date_of_birth.split("-")
        let birthdate = new  Date(dob_splited[2],dob_splited[1] - 1, dob_splited[0]);
        // const birthdate = new Date(2004 yyyy, 2 - 1 mm, 2 dd);
        function agefun2(birthdate) {
            const today = new Date();
            const age = today.getFullYear() - birthdate.getFullYear() -
                (today.getMonth() < birthdate.getMonth() ||
                    (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
            return age;
        }
        const calc_age = await agefun2(birthdate);
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await doctor_model.create({
            email: email,
            username: username,
            password: hashedPassword,
            address: address, age: calc_age, contact_number: contact_number,
            aadhar_card_number: aadhar_card_number, aadhar_card_photo: aadhar_card_photo, pan_card_number: pan_card_number, pan_card_photo: pan_card_photo, self_photo: self_photo,date_of_birth:date_of_birth,department:department,expertise:expertise,practice:practice,
            languages:languages,education:education
        })
        const token = await jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY)
        res.status(201).json({ user: result, token: token })
    } catch (error) {
        res.status(500).json({ message: "something went wrong in SignUpDoctorController", msg: error.message })
    }

}
const LoginDoctor = async (req, res) => {
    const { email, password } = req.body
    try {
        const existinguser = await doctor_model.findOne({ email: email })
        if (!existinguser) {
            return res.status(400).json({ message: "User not found" })
        }
        const matchPassword = await bcrypt.compare(password, existinguser.password)
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.SECRET_KEY)
        res.status(201).json({ user: existinguser, token: token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong in LoginDoctorController", message: err.message })
    }

}

const UserDetails = async(req,res)=>{
    res.render("userdetails")
}

const DoctorDetails = async(req,res)=>{
    res.render("doctordetails")
}

const CenterDetails = async(req,res)=>{
    res.render("centerdetails")
}


module.exports = {
    SignUpUser, LoginUser, SignUpDoctor, LoginDoctor,SignUp,UserDetails,DoctorDetails,CenterDetails
}
const user_model = require("../Model/user_model.js")
const doctor_model = require("../Model/doctor_model.js")
const center_model = require("../Model/center_model.js")
const counsellor_model = require("../Model/counsellor_model.js")
const bcrypt = require("bcrypt")
const QRCode = require("qrcode");
const path = require("path");
const jwt = require("jsonwebtoken")


const SignUpUser = async (req, res) => {
    try {
        let { username, address, age, contact_number, aadhar_card_number, pan_card_number, blood_group, medical_history, gender, email, password, date_of_birth, pass_confirm } = req.body
        let { aadhar_card_photo, pan_card_photo, self_photo } = req.files
        let existinguser = await user_model.findOne({ email: email })
        if (existinguser) {
            return res.status(400).json({ message: "User already exist" })
        }
        if (password != pass_confirm) {
            return res.status(400).json({ message: "Password and confirm password is not same" })
        }
        // date_of_birth = "29-12-2003"
        // console.log(typeof(date_of_birth))
        let dob_splited = date_of_birth.split("/")
        let birthdate = new Date(dob_splited[2], dob_splited[1] - 1, dob_splited[0]);
        // console.log(birthdate)
        // const birthdate = new Date(2004 yyyy, 2 - 1 mm, 2 dd);
        function agefun1(birthdate) {
            let today = new Date();
            let age = today.getFullYear() - birthdate.getFullYear() -
                (today.getMonth() < birthdate.getMonth() ||
                    (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
            // console.log("inside fuct")
            return age;
        }
        let calc_age = await agefun1(birthdate);
        // console.log(calc_age)

        aadhar_card_photo = "data:image/png;base64," + aadhar_card_photo.data.toString('base64')
        pan_card_photo = "data:image/png;base64," + pan_card_photo.data.toString('base64')
        self_photo = "data:image/png;base64," + self_photo.data.toString('base64')


        let hashedPassword = await bcrypt.hash(password, 10)
        // let result = await user_model.create({
        //     email: email,
        //     username: username,
        //     password: hashedPassword,
        //     address: address, age: calc_age,date_of_birth:date_of_birth, contact_number: contact_number,
        //     aadhar_card_number: aadhar_card_number, pan_card_number: pan_card_number,blood_group: blood_group, medical_history: medical_history,
        //     gender: gender
        // })



        let result = await user_model.create({
            email: email,
            username: username,
            password: hashedPassword,
            address: address, age: calc_age, date_of_birth: date_of_birth, contact_number: contact_number,
            aadhar_card_number: aadhar_card_number, aadhar_card_photo: aadhar_card_photo, pan_card_number: pan_card_number, pan_card_photo: pan_card_photo, self_photo: self_photo, blood_group: blood_group, medical_history: medical_history,
            gender: gender
        })

        // let token = await jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY)
        // res.status(201).json({ user: result, token: token })
        res.render("index")
    } catch (error) {
        res.status(500).json({ message: "something went wrong in SignUpUserController", msg: error.message })
    }
}

const SignUp = async (req, res) => {
    res.render("signup")
}

// const LoginUser = async (req, res) => {
//     const { email, password } = req.body
//     try {
//         const existinguser = await user_model.findOne({ email: email })
//         if (!existinguser) {
//             return res.status(400).json({ message: "User not found" })
//         }
//         const matchPassword = await bcrypt.compare(password, existinguser.password)
//         if (!matchPassword) {
//             return res.status(400).json({ message: "Invalid credentials" })
//         }
//         const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.SECRET_KEY)
//         res.status(201).json({ user: existinguser, token: token })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "something went wrong in LoginUserController", message: err.message })
//     }

// }


const SignUpDoctor = async (req, res) => {
    try {
        let { username, address, age, contact_number, aadhar_card_number, pan_card_number, gender, email, password, date_of_birth, department, expertise, practice, languages, education, pass_confirm, degree_certificate_id } = req.body

        let { aadhar_card_photo, pan_card_photo, self_photo, degree_certificate_photo } = req.files
        const existinguser = await doctor_model.findOne({ email: email })
        if (existinguser) {
            return res.status(400).json({ message: "User already exist" })
        }
        if (password != pass_confirm) {
            return res.status(400).json({ message: "Password and confirm password is not same" })
        }

        let dob_splited = date_of_birth.split("/")
        let birthdate = new Date(dob_splited[2], dob_splited[1] - 1, dob_splited[0]);
        // const birthdate = new Date(2004 yyyy, 2 - 1 mm, 2 dd);
        function agefun2(birthdate) {
            const today = new Date();
            const age = today.getFullYear() - birthdate.getFullYear() -
                (today.getMonth() < birthdate.getMonth() ||
                    (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
            return age;
        }
        const calc_age = await agefun2(birthdate);

        aadhar_card_photo = "data:image/png;base64," + aadhar_card_photo.data.toString('base64')
        pan_card_photo = "data:image/png;base64," + pan_card_photo.data.toString('base64')
        self_photo = "data:image/png;base64," + self_photo.data.toString('base64')
        degree_certificate_photo = "data:image/png;base64," + degree_certificate_photo.data.toString('base64')


        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await doctor_model.create({
            email: email,
            username: username,
            password: hashedPassword,
            address: address, age: calc_age, contact_number: contact_number,
            aadhar_card_number: aadhar_card_number, aadhar_card_photo: aadhar_card_photo, pan_card_number: pan_card_number, pan_card_photo: pan_card_photo, self_photo: self_photo, date_of_birth: date_of_birth, department: department, expertise: expertise, practice: practice,
            languages: languages, education: education, gender: gender, degree_certificate_photo:degree_certificate_photo, degree_certificate_id:degree_certificate_id
        })

        const url =
            `127.0.0.1:3000/doctor/${result._id}`;

        QRCode.toFile(path.join(__dirname, `qrcode_${result._id}.png`), url, (err) => {
            if (err) throw err;
        });

        // const token = await jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY)
        // res.status(201).json({ user: result, token: token })
        res.render("index")
    } catch (error) {
        res.status(500).json({ message: "something went wrong in SignUpDoctorController", msg: error.message })
    }

}


// const LoginDoctor = async (req, res) => {
//     const { email, password } = req.body
//     try {
//         const existinguser = await doctor_model.findOne({ email: email })
//         if (!existinguser) {
//             return res.status(400).json({ message: "User not found" })
//         }
//         const matchPassword = await bcrypt.compare(password, existinguser.password)
//         if (!matchPassword) {
//             return res.status(400).json({ message: "Invalid credentials" })
//         }
//         const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.SECRET_KEY)
//         res.status(201).json({ user: existinguser, token: token })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "something went wrong in LoginDoctorController", message: err.message })
//     }

// }

const SignUpCenter = async (req, res) => {
    try {
        let { username, address, center_guide_name, contact_number, email, password, pass_confirm } = req.body

        const existinguser = await center_model.findOne({ email: email })
        if (existinguser) {
            return res.status(400).json({ message: "User already exist" })
        }
        if (password != pass_confirm) {
            return res.status(400).json({ message: "Password and confirm password is not same" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await center_model.create({
            email: email,
            username: username,
            password: hashedPassword,
            address: address, contact_number: contact_number,
            center_guide_name: center_guide_name
        })
        // const token = await jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY)
        // res.status(201).json({ user: result, token: token })
        res.render("index")

    } catch (error) {
        res.status(500).json({ message: "something went wrong in SignUpCenterController", msg: error.message })
    }

}


// const LoginCenter = async(req,res)=>{
//     const { email, password } = req.body
//     try {
//         const existinguser = await center_model.findOne({ email: email })
//         if (!existinguser) {
//             return res.status(400).json({ message: "User not found" })
//         }
//         const matchPassword = await bcrypt.compare(password, existinguser.password)
//         if (!matchPassword) {
//             return res.status(400).json({ message: "Invalid credentials" })
//         }
//         const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.SECRET_KEY)
//         res.status(201).json({ user: existinguser, token: token })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "something went wrong in LoginCenterController", message: err.message })
//     }
// }


const SignUpCounsellor = async (req, res) => {
    try {
        let { username, address, gender, contact_number, email, password, pass_confirm, availability, aadhar_card_number, pan_card_number, degree } = req.body

        let { aadhar_card_photo, pan_card_photo, self_photo, license_photo } = req.files
        const existinguser = await counsellor_model.findOne({ email: email })
        if (existinguser) {
            return res.status(400).json({ message: "User already exist" })
        }
        if (password != pass_confirm) {
            return res.status(400).json({ message: "Password and confirm password is not same" })
        }

        aadhar_card_photo = "data:image/png;base64," + aadhar_card_photo.data.toString('base64')
        pan_card_photo = "data:image/png;base64," + pan_card_photo.data.toString('base64')
        self_photo = "data:image/png;base64," + self_photo.data.toString('base64')
        license_photo = "data:image/png;base64," + license_photo.data.toString('base64')



        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await counsellor_model.create({
            email: email,
            username: username,
            password: hashedPassword,
            address: address, contact_number: contact_number,
            gender: gender, availability: availability, aadhar_card_number: aadhar_card_number, pan_card_number: pan_card_number, degree: degree, aadhar_card_photo: aadhar_card_photo, pan_card_photo: pan_card_photo, self_photo: self_photo, license_photo: license_photo
        })
        // const token = await jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY)
        // res.status(201).json({ user: result, token: token })
        res.render("index")

    } catch (error) {
        res.status(500).json({ message: "something went wrong in SignUpCounsellorController", msg: error.message })
    }

}

// Implement login of everyone over here
const Login = async (req, res) => {
    const { email, password, identity } = req.body
    try {

        let existinguser
        if (identity == 'user') {
            existinguser = await user_model.findOne({ email: email })
            if (!existinguser) {
                return res.status(400).json({ message: "User not found" })
            }
            const matchPassword = await bcrypt.compare(password, existinguser.password)
            if (!matchPassword) {
                return res.status(400).json({ message: "Invalid credentials" })
            }
            const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.SECRET_KEY)
        // res.status(201).json({ user: existinguser, token: token })
        res.render("index.ejs", { user: existinguser, token: token })
        } else if (identity == 'doctor') {
            existinguser = await doctor_model.findOne({ email: email })
            if (!existinguser) {
                return res.status(400).json({ message: "User not found" })
            }
            const matchPassword = await bcrypt.compare(password, existinguser.password)
            if (!matchPassword) {
                return res.status(400).json({ message: "Invalid credentials" })
            }
            const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.SECRET_KEY)
        // res.status(201).json({ user: existinguser, token: token })
        res.render("doctor.ejs", { user: existinguser, token: token })
        } else if (identity == 'counsellor') {
            existinguser = await counsellor_model.findOne({ email: email })
        } else if (identity == 'center') {
            existinguser = await center_model.findOne({ email: email })
        } else {
            return res.status(400).json({ message: "User does not exist" })
        }

        if (!existinguser) {
            return res.status(400).json({ message: "User not found" })
        }
        const matchPassword = await bcrypt.compare(password, existinguser.password)
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.SECRET_KEY)
        // res.status(201).json({ user: existinguser, token: token })
        res.render("index.ejs", { user: existinguser, token: token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong in LoginCounsellorController", message: err.message })
    }
}

const UserDetails = async (req, res) => {
    res.render("userdetails")
}

const DoctorDetails = async (req, res) => {
    res.render("doctordetails")
}

const CenterDetails = async (req, res) => {
    res.render("centerdetails")
}

const CounsellorDetails = async (req, res) => {
    res.render("counsellordetails")
}

const search_doctor = async (req, res) => {
    res.render("search")
}

const doctor_status = async (req, res) => {
    const { department,phone_number } = req.body
    if(phone_number == ""){
        doctor_model.find({ department: department }).then((items) => {
            res.render("doctor_status", { "items": items })
        })
            .catch((err) => {
                console.error('Error:', err);
                // Handle the error here
            }) 
    }
    doctor_model.find({ department: department ,contact_number:Number(phone_number)}).then((items) => {
        console.log('Items:', items);
        res.render("doctor_status", { items })
    })
        .catch((err) => {
            console.error('Error:', err);
            // Handle the error here
        })
}
const doctors = async (req, res) => {
    const id = req.params
    doctor_model.findOne({ _id: id.id }).then((items) => {
        if(items == null){
            res.send("No such doctor")
        }
        else{

            res.render("doctor_profile", items)
        }
    })
        .catch((err) => {
            console.error('Error:', err);
            // Handle the error here
        })
}

const contact = async(req,res)=>{
    res.render("contact")
}

const counsellor_status = async(req,res)=>{
    counsellor_model.find().then((items) => {
        if(items == null){
            res.send("No such doctor")
        }
        else{
            console.log(items)
            res.render("counsellor_status",{"items":items})
        }
    })
        .catch((err) => {
            console.error('Error:', err);
            // Handle the error here
        })
}

module.exports = {
    SignUpUser, SignUpDoctor, SignUp, UserDetails, DoctorDetails, CenterDetails, SignUpCenter, CounsellorDetails, SignUpCounsellor, Login, search_doctor, doctor_status, doctors,contact,counsellor_status
}
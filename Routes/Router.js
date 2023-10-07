const express = require("express")
const router = express.Router()
const {SignUpUser,SignUpDoctor,SignUp,UserDetails,DoctorDetails,CenterDetails,SignUpCenter,CounsellorDetails,SignUpCounsellor,Login,search_doctor,doctor_status,doctors,contact,counsellor_status} = require("../Controller/Controller")
// const isSignedIn = require("../Middlewares/middlewares")


// Auth Logic
router.route('/SignUpUser').post(SignUpUser)
router.route('/SignUpDoctor').post(SignUpDoctor)
router.route('/SignUpCenter').post(SignUpCenter)
router.route('/SignUpCounsellor').post(SignUpCounsellor)
router.route('/Login').post(Login)

//Render signup page
router.route('/SignUp').get(SignUp)

// Renders form
router.route('/UserDetails').get(UserDetails)
router.route('/DoctorDetails').get(DoctorDetails)
router.route('/CenterDetails').get(CenterDetails)
router.route('/CounsellorDetails').get(CounsellorDetails)

//Routes on Dashboard
router.route('/search_doctor').get(search_doctor)
router.route('/doctor_status').post(doctor_status)
router.route('/counsellor_status').get(counsellor_status)
router.route('/doctor/:id').get(doctors)
router.route('/contact').get(contact)




module.exports = router
const express = require("express")
const router = express.Router()
const {SignUpUser,SignUpDoctor,SignUp,UserDetails,DoctorDetails,CenterDetails,SignUpCenter,CounsellorDetails,SignUpCounsellor,Login} = require("../Controller/Controller")

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


module.exports = router
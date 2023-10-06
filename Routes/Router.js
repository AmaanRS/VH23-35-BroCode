const express = require("express")
const router = express.Router()
const {SignUpUser,LoginUser,SignUpDoctor,LoginDoctor,SignUp,UserDetails,DoctorDetails,CenterDetails,SignUpCenter,LoginCenter,CounsellorDetails,SignUpCounsellor,LoginCounsellor} = require("../Controller/Controller")

// Auth Logic
router.route('/SignUpUser').post(SignUpUser)
router.route('/LoginUser').get(LoginUser)
router.route('/SignUpDoctor').post(SignUpDoctor)
router.route('/LoginDoctor').get(LoginDoctor)
router.route('/SignUpCenter').post(SignUpCenter)
router.route('/LoginCenter').get(LoginCenter)

router.route('/SignUpCounsellor').post(SignUpCounsellor)
router.route('/LoginCounsellor').get(LoginCounsellor)

//Render signup page
router.route('/SignUp').get(SignUp)

// Renders form
router.route('/UserDetails').get(UserDetails)
router.route('/DoctorDetails').get(DoctorDetails)
router.route('/CenterDetails').get(CenterDetails)
router.route('/CounsellorDetails').get(CounsellorDetails)




module.exports = router
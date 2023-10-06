const express = require("express")
const router = express.Router()
const {SignUpUser,LoginUser,SignUpDoctor,LoginDoctor,SignUp,UserDetails,DoctorDetails,CenterDetails} = require("../Controller/Controller")

router.route('/SignUpUser').get(SignUpUser)
router.route('/SignUp').get(SignUp)
router.route('/LoginUser').get(LoginUser)
router.route('/SignUpDoctor').get(SignUpDoctor)
router.route('/LoginDoctor').get(LoginDoctor)

router.route('/UserDetails').get(UserDetails)
router.route('/DoctorDetails').get(DoctorDetails)
router.route('/CenterDetails').get(CenterDetails)




module.exports = router
const {register,login,VerifyUser,resendverification} = require('../User Controller/UserController');

const router = require('express').Router();


router.post('/register', register)
router.post('/login', login)
router.get('/verify/:token',VerifyUser)
router.get('/resendverification/:token',resendverification)


module.exports = router
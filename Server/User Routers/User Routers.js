const jwt_AUTH = require('../midleware/JWT_Auth');
const {register,login,VerifyUser,resendverification,updateUser} = require('../User Controller/UserController');

const router = require('express').Router();


router.post('/register', register)
router.post('/login', login)
router.put('/updateUser',jwt_AUTH,updateUser)
router.get('/verify/:token',VerifyUser)
router.get('/resendverification/:token',resendverification)


module.exports = router
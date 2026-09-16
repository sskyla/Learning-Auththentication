const {register,login,VerifyUser} = require('../User Controller/UserController');

const router = require('express').Router();


router.post('/register', register)
router.post('/login', login)
router.get('/verify/:token',VerifyUser)

module.exports = router
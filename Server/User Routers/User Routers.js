const {register,login} = require('../User Controller/UserController');

const router = require('express').Router();


router.post('/register', register)
router.post('/login', login)

module.exports = router
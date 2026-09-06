const mongoose  = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    OTP_verification: {
        OTP: String,
        expires: Date
    },
    verificationToken: {
        token: String,
        expires: Date
    }
})


const UserModel = mongoose.model('User',UserSchema)

module.exports = UserModel
const UserModel = require('../UserModel/usermodel')
const otp_generator = require('otp-generator')
const bcrypt = require('bcrypt')

const register = async (req,res)=>{
    try {

        console.log(req.body);

        const isUserExisting = await UserModel.findOne({email:req.body.email})

        if(isUserExisting) {
            return res.status(400).json({message:`User with ${req.body.email} already existing.`})
        }

        const verificationToken = otp_generator.generate(6,{upperCaseAlphabets: false, specialChars: false})

        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);

        const hashedPassword = await bcrypt.hash(req.body.password,10)

        const newUser = await UserModel({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            verificationToken: {
                token: verificationToken,
                expires: expires

            }
        })

        console.log(newUser);
        await newUser.save()
        



        res.json({message:"User saved successfully"})
    } catch (error) {
        res.json(error)
    }
}

const login = async (req,res)=>{
    try {
        console.log(req.body);
        
        res.json("Working succesfully.")
    } catch (error) {
        res.json(error)
    }
}

module.exports = {register,login}
const UserModel = require('../UserModel/usermodel')
const otp_generator = require('otp-generator')
const bcrypt = require('bcrypt')
const sendEmail = require('../Email service/Email')


const register = async (req,res)=>{
    try {

        console.log(req.body);

        const isUserExisting = await UserModel.findOne({email:req.body.email})

        if(isUserExisting) {
            console.log("User already exists");
            
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

        const emailbody = `<p>Please click on the link verify your account <b>http://localhost:5000/user/verify/${verificationToken}</b>VERIFY ACCOUNT</p>`
        const subject = `Verification Email`

        await sendEmail(req.body.email,subject,emailbody)
        



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

const VerifyUser = async (req,res) => {
    try {
        console.log(req.params);
        
        const token = req.params.token
        
        const isTokenValid = await UserModel.findOne(
            {
                'verificationToken.token':token,
                'verificationToken.expires': {$gt : new Date()}
            })
            console.log(isTokenValid);

            if(!isTokenValid) {
                return res.status(400).json({message:"Token invalid or expired"})
            }
            isTokenValid.isVerified = true
            
            await isTokenValid.save()
            

            res.send("Account Verified successfuly")
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})
        
    }
}

module.exports = {register,login,VerifyUser}


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
        



        res.json({message:"Verification link sent to your EMAIL."})
    } catch (error) {
        res.json({message: "Something went wrong"})
    }
}

const login = async (req,res)=>{
    try {
        console.log(req.body);

        const isUserExisting = await UserModel.findOne({email:req.body.email})
        console.log(isUserExisting);
        
        if(!isUserExisting) {
            return res.status(400).json({message:`User with ${req.body.email} don't existing.`})
        }

        if(!isUserExisting.isVerified){
            return res.status(400).json({message:`User is not Verified. Please click the link in your Email to verify`})

        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password,isUserExisting.password)

        if(!isPasswordCorrect){
            return res.status(400).json({message:`Invalid Credentials.`})
        }

        // create JWT
        
        res.json({message:`User Logged in succesfuly`})
    } catch (error) {
        res.json({message:`Something went wrong`})
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
                return res.send(`<p>Token invalid or expired</p> <a href="http://localhost:5000/user/resendverification/${token}">Resend verification</a>`)
            }

            if(isTokenValid){
                return res.send("Account already Verified successfuly.Please Login")
            }

            isTokenValid.isVerified = true
            
            await isTokenValid.save()
            

            res.send("Account Verified successfuly")
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})
        
    }
}

    const resendverification = async (req,res) => {
        try {
            
            const token = req.params.token

            const user = await UserModel.findOne(
            {
                'verificationToken.token':token,
                'isVerified': false
            })

            const verificationToken = otp_generator.generate(6,{upperCaseAlphabets: false, specialChars: false})

            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 5);

            user.verificationToken = {
                expires: expires,
                token: verificationToken
            }

            await user.save()
            

            const emailbody = `<p>Please click on the link verify your account <b>http://localhost:5000/user/verify/${verificationToken}</b>VERIFY ACCOUNT</p>`
            const subject = `Verification Email`

            await sendEmail(user.email,subject,emailbody)
            res.send("Please cek Your email for a new verification")


        } catch (error) {
            console.log("RESEND ERROR:", error);
            res.status(500).send("Something wrong");
            
        }
        
    }

module.exports = {register,login,VerifyUser,resendverification}


const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})

const sendEmail = async(to,subject,body) =>{
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: to,
            subject: subject,
            html: body
        };
        const info = await transporter.sendMail(mailOptions)
        console.log("Message ID:",info.messageId);

        return info;
        
    } catch (error) {
        console.error("Failed sending email:");
        console.log(error);
        throw error;        
    }
}

module.exports = sendEmail;
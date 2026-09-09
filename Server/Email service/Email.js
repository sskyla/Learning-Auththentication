const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})

const sendEmail = async(to,subject,body) =>{
    let mailOptions = {
        to: to,
        from: process.env.EMAIL,
        subject:subject,
        html: body
    }

    await new Promise((resolve,reject) => {
        transporter.sendMail(mailOptions,(err,res) =>{
            if(err){
                console.log(err);
                reject(err)
                
            }
            else{
                console.log(res);
                resolve(res)
                
            }
        })
    }) 
}

module.exports = sendEmail;
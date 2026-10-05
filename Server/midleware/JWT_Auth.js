const { request } = require('express')
const jwt = require('jsonwebtoken')

const jwt_AUTH = async(req,res,next)=>{
    try {
        let token = req.headers.authorization

        if(!token) return res.status(403).json({message:`JWT not provided`})

        console.log(token);
        
        
        const decodeData = jwt.verify(token.split(" ")[1], process.env.SECRET)
        
        console.log(decodeData);

        req.decodeData = decodeData
        
        next();
        
    } catch (error) {
        res.status(403).json({message:`Invalid token`})
    }
}

module.exports= jwt_AUTH
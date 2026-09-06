const { default: mongoose } = require("mongoose")


const connect_DB =()=>{
    return mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("DB connected");
        
    }).catch((err)=>{
        console.log(err);
        
    })
}

module.exports = connect_DB
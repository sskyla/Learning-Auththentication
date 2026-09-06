const express = require("express");
const morgan = require("morgan");
const dotenv = require('dotenv').config()
const cors = require('cors');
const connect_DB = require("./Connected DB/connect_DB");
const register = require("./User Controller/UserController");

const app = express();

app.use(cors());

app.use(morgan("dev"))
app.use(express.json());

app.use("/user", require("./User Routers/User Routers"))

app.listen(process.env.PORT, async()=>{
    await connect_DB()
    console.log(`Server is up at port ${process.env.PORT}`);
    
})

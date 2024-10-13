const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Connection = async () =>{
    try {
        const checkConnection = mongoose.connect(process.env.MONGO_URL);
        console.log("Sucessfully Connected to database");
    }   
    catch(err){
        console.log("Problem Occuring while Connecting to the database");
    }
}
module.exports = Connection;
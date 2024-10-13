const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connection = require("./db");
const router = require("./Routes/routes");

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json()); // You can use the body-parser npm library, or use express.json


app.use("/",router);


const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Backend is connected to port number ${port}`);
    connection();
});




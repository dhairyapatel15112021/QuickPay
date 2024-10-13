const User = require("../models/User");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Account = require("../models/Account");

dotenv.config();

const zodUserSignUpSchema = zod.object({
    firstname: zod.string({ message: "firstname nust be in string" }),
    lastname: zod.string({ message: "firstname nust be in string" }),
    email: zod.string().email({ message: "email must be in the proper format" }),
    password: zod.any()
});

const zodUserSignInSchema = zod.object({
    email: zod.string().email({ message: "email must be in the proper format" }),
    password: zod.any()
})

const zodUserUpdateSchema = zod.object({
    firstname: zod.string({ message: "Firstname must be a string" }).optional(),
    lastname: zod.string({ message: "Lastname must be a string" }).optional(),
    password: zod.any().optional()
});


const signup = async (req, res) => {
    try {
        const userData = req.body;
        const validateData = zodUserSignUpSchema.safeParse(userData);
        if (!validateData.success) {
            return res.status(411).send(`Error in the input ${validateData.error}`);
        }
        const userEmail = userData.email;
        const isUserExist = await User.exists({ email: userEmail });
        if (isUserExist) {
            return res.status(411).send("Already User Exist With this email");
        }
        const salt = await bcrypt.genSalt(10);
        /*
        salt is used to differentiate the same password of multiple person,
        for example : my and another person's password is same let's say "123456",
        so without salt both person's hashed password will be same, so using salt we 
        differentiate both passwords and end hashed also be differente.
        */
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        const user = new User({ ...userData, password: hashedPassword });
        user.save();
        const account = new Account({ userId: user._id, balance: 1 + Math.random() * 10000 });
        account.save();
        return res.status(200).send("User save succesfully");
    }
    catch (err) {
        console.log(`Error in the backend while signup ${err}`);
        return res.status(404).json({ "err": `Error in the backend while signup ${err}` });
    }
}

const signin = async (req, res) => {
    try {
        const userData = req.body;
        const validateData = zodUserSignInSchema.safeParse(userData);
        if (!validateData.success) {
            return res.status(411).send(`Error in the input ${validateData.error}`);
        }
        const user = await User.findOne({ email: userData.email });
        if (!user) {
            return res.status(411).send(`There is no user with the given email id ${userData.email}`);
        }
        const comparePassword = await bcrypt.compare(userData.password, user.password);
        if (!comparePassword) {
            return res.status(411).send(`Entered Wrong Password ${userData.password}`);
        }
        const token = jwt.sign({ "id": user._id }, process.env.ACCESS_TOKEN,{expiresIn : '15m'});
        const balance = await Account.findOne({userId : user._id});
        return res.status(200).json({ "msg": "User Sucessfully signin", "token": token, "firstname": user.firstname, "lastname": user.lastname,"balance":balance.balance });
    }
    catch (err) {
        console.log(`Error in the backend while signin ${err}`);
        return res.status(404).json({ "err": `Error in the backend while signin ${err}` });
    }
}

const update = async (req, res) => {
    try {
        let userData = req.body;
        const validateData = zodUserUpdateSchema.safeParse(userData);
        if (!validateData.success) {
            return res.status(411).send(`Error in the input ${validateData.error}`);
        }
        if (userData.password) {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt);
        }
        const userId = req.id;
        const updateUser = await User.updateOne({ _id: userId }, { $set: { ...userData } });
        if (updateUser.matchedCount === 0) {
            return res.status(404).send("User not found");
        }

        if (updateUser.modifiedCount === 0) {
            return res.status(200).send("No changes made to the user data");
        }

        return res.status(200).send(`user data updated succesfully ${updateUser}`);
    }
    catch (err) {
        console.log(`Error in the backend while update the user ${err}`);
        return res.status(404).json({ "err": `Error in the backend while update the user ${err}` });
    }
}

const filter = async (req, res) => {
    try {
        const userId = req.id;
        const filter = req.query.filter || "";  // Default to empty string if no filter is provided

        // Perform case-insensitive and partial match search using regex
        // let allUsers = await User.find({
        //     $or: [
        //         { firstname: { $regex: filter, $options: "i" } },  // Case-insensitive matching
        //         { lastname: { $regex: filter, $options: "i" } }
        //         ] }, { _id: 1, firstname: 1, lastname: 1 });
        let allUsers = await User.find({
            $and: [
                { _id: { $ne: userId } },
                {
                    $or: [
                        { firstname: { $regex: filter, $options: "i" } },  // Case-insensitive matching
                        { lastname: { $regex: filter, $options: "i" } }
                    ]
                }
            ]
        }, { _id: 1, firstname: 1, lastname: 1 });
        res.status(200).json({ "users": allUsers });
    }
    catch (err) {
        console.log(`Error in the backend while fetching all user details ${err}`);
        return res.status(404).json({ "err": `Error in the backend while fetching all user details ${err}` });
    }
}

const login = async(req,res)=>{
    try{
        const headers = req.headers.authorization;
        if(!headers || !headers.startsWith("bearer")){
            return res.status(500).send("Invalid Token");
        }
        const token = headers.split(" ")[1];
        const verifyUser = jwt.verify(token,process.env.ACCESS_TOKEN);
        if(!verifyUser.id){
            return res.status(500).send("Invalid User");
        }
        const id = verifyUser.id;
        const user = await User.findById(id);
        const account = await Account.findOne({userId : id});
        return res.status(200).json({"firstname":user.firstname,"lastname":user.lastname,"balance":account.balance});
    }
    catch(err){
        console.log(`Error in the backend While checking that user is loged in or not? ${err}`);
        return res.status(404).json({ "err": `Error in the backend While checking that user is loged in or not? ${err}` });
    }
}
module.exports = {
    userSignUp: signup,
    userSignIn: signin,
    userUpdate: update,
    userFilter: filter,
    checkLogin: login
}
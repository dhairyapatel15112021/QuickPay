/* const fundTransfer = async (idFrom,idTo,amount) => {
    const check = await Account.findOneAndUpdate(
        { _id: idFrom, balance: { $gt: amount } }, 
        { $inc: { balance: -amount } },                               
    )
    if(check){
        await Account.findOneAndUpdate(
            { _id: idTo },   
            { $inc: { balance: amount } },                                 
        )
    }
}
// Above method for transfering money can be problematic ,
1) What if the database crashes right after the first request (only the balance is decreased for one user, and not for the second user)
2) What if the Node.js crashes after the first update?
3) If we want to do concurrent transaction then also it create problem.
Solution : It would lead to a database inconsistency. Amount would get debited from the first user, and not credited into the other users account.
            If a failure ever happens, the first txn should rollback.This is what is called a transaction in a database. We need to implement a transaction on the next set of endpoints that allow users to transfer INR. */

const Account = require("../models/Account");
const mongoose = require("mongoose");
const zod = require("zod");

const zodBalanceTransferSchema = zod.object({
    to: zod.string(),
    amount: zod.number().min(0)
})

const balance = async (req, res) => {
    try {
        const id = req.id;
        const account = await Account.findById(id);
        if (!account) {
            return res.status(404).send("No Account");
        }
        return res.status(200).json({ "balance": account.balance });
    }
    catch (err) {
        console.log(`Error while cheking the balance of user ${err}`);
        return res.status(500).json({ "err": `Error while cheking the balance of user ${err}` });
    }
}

const transfer = async (req, res) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const data = req.body;
        const validateData = zodBalanceTransferSchema.safeParse(data);
        if(!validateData.success){
            session.abortTransaction();
            return res.status(411).send(`Error in the input ${validateData.error}`);
        }
        const userId = new mongoose.Types.ObjectId(req.id);

        const accountFrom = await Account.findOne({userId}).session(session);
        if(!accountFrom || accountFrom.balance < data.amount){
            session.abortTransaction();
            return res.status(411).send("Insufficient Balance");
        }
        const userIdTo = new mongoose.Types.ObjectId(data.to);
        const accountTo = await Account.findOne({userId : userIdTo}).session(session);
        if(!accountTo){
            session.abortTransaction();
            return res.status(411).send("Invalid Account");
        }
        await Account.updateOne({userId},{$inc : { balance : -data.amount}}).session(session);
        await Account.updateOne({userId : userIdTo},{$inc : { balance : data.amount}}).session(session);
        session.commitTransaction();
        
        return res.status(200).send("Transfer Sucessfully");
    }
    catch (err) {
        console.log(`Error while tranfering the balance ${err}`);
        return res.status(500).json({ "err": `Error while tranfering the balance ${err}` });
    }
}

module.exports = {
    userBalance: balance,
    userBalanceTransfer: transfer
}

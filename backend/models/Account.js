const mongoose = require("mongoose");

mongoose.pluralize(null);

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true,
    },
    balance :{
        type : Number,
        require : true
    }
});

const Account = mongoose.model("Account",accountSchema);

module.exports = Account;


/*

In the real world, you shouldn’t store `floats` for balances in the database.
You usually store an integer which represents the INR value with
decimal places (for eg, if someone has 33.33 rs in their account,
you store 3333 in the database).

There is a certain precision that you need to support (which for india is
2/4 decimal places) and this allows you to get rid of precision
errors by storing integers in your DB
*/
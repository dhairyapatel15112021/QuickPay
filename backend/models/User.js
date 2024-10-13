const mongoose = require("mongoose");

mongoose.pluralize(null);

const userSchema = new mongoose.Schema(
    {
        firstname : {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        lastname : {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        email : {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            minLength: 3,
            maxLength: 30
        },
        password : {
            type: String,
            required: true,
            minLength: 6
        },
    }
);

const User = mongoose.model("User",userSchema);

module.exports = User;
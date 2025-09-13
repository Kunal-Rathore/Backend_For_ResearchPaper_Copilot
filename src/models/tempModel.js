

const mongoose = require("mongoose");

const temp = new mongoose.Schema({
    signUpToken: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: String },
    expiresAt: {
        type: Date, default: () => { return new Date(Date.now() + 24 * 60 * 60 * 1000) },
        index: { expires: 0 }
    }
}, { timestamps: true });


const tempModel = mongoose.model("tempModel", temp);

module.exports = tempModel 



const mongoose = require("mongoose");
const usersModel = require("./UserModel");

const papers = new mongoose.Schema({
    paperId: { type: String, required: true },
    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
    url: { type: String, required: true }
}, { _id: false })

const validation = new mongoose.Schema({
    isValid: { type: Boolean, required: true },
    score: { type: Number, required: true },
    feedback: { type: String },
    citations: [{ type: String, required: true }]
}, { _id: false })

const conversations = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: usersModel, required: true },
    query: { type: String, required: true },
    answer: { type: String, required: true },
    papers: [papers],
    summary: { type: String, required: true },
    validation: validation
}, { timestamps: true });


const conversationsModel = mongoose.model("Conversations", conversations);

module.exports = conversationsModel;


const mongoose = require("mongoose");

async function connectDB() {
    try {
        console.log("Db connecting...");
        await mongoose.connect(process.env.MONGOO_DB_URL);
        console.log("DB connected");
    } catch (error) {
        console.log(error.message);
    }

}

module.exports = { connectDB };
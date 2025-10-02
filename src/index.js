
require("dotenv").config();


const cors = require("cors");

const app = require("./app");
app.use(cors({
    origin: "*",
    credentials: true
}));



const { connectDB } = require("./config/db");

const PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => { console.log(`Server running on port- http://localhost:${PORT}`) });
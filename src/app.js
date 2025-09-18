

// libraries
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");


//routes
const routesIndex = require("./routes/routesIndex");


const app = express();
app.use(cookieParser());

app.use(morgan("dev"));
app.use(express.json());

app.use("/app/api", routesIndex);  //auth Route

app.get("/", (req, res) => { res.send("this is the inital route") })

module.exports = app;
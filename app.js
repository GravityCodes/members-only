const express = require("express");
const path = require("path");
const session = require("express-session");
const indexRouter = require("./routes/indexRouter");
const app = express();
require("dotenv").config();
app.use(express.urlencoded({extended: true}));


//asset path
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//view engine
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

//session
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized:false,
    resave:false,
}))

//routers
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));

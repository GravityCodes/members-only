require("dotenv").config();
const path = require("path");
const pool = require("./db/pool");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const indexRouter = require("./routes/indexRouter");
const pgStore = require("connect-pg-simple")(session);
require("./config/passport");




//asset path
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//view engine
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

//session
const sessionStore = new pgStore({pool: pool});

app.use(session({
    store: sessionStore,
    secret: process.env.SECRET,
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge: 1000 * 864 * 100 // 1 day
    }
}));
app.use(express.urlencoded({extended: true}));
app.use(passport.session());

//routers
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));

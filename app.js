const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const app = express();

app.use(express.urlencoded({extended: true}));


//asset path
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//view engine
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');



app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));

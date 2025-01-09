const {Router} = require("express");
const indexRouter = Router();
const indexController =  require("../controller/indexController");

indexRouter.use("/", indexController.homeGet);

module.exports = indexRouter;
const {Router} = require("express");
const indexRouter = Router();
const indexController =  require("../controller/indexController");

indexRouter.get("/", indexController.homeGet);
indexRouter.get("/sign-up", indexController.signUpGet);
indexRouter.get("/log-in", indexController.logInGet);

indexRouter.post("/sign-up", indexController.signUpPost);

module.exports = indexRouter;
const {Router} = require("express");
const indexRouter = Router();
const indexController =  require("../controller/indexController");
const passport = require("passport");

indexRouter.get("/", indexController.homeGet);
indexRouter.get("/sign-up", indexController.signUpGet);
indexRouter.post("/sign-up", indexController.signUpPost);

indexRouter.get("/log-in", indexController.logInGet);
indexRouter.post("/log-in", passport.authenticate('local', { successRedirect: "/",
  failureRedirect: "/log-in"}));

indexRouter.get("/log-out", indexController.userLogOutPost);

module.exports = indexRouter;
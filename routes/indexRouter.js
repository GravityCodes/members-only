const {Router} = require("express");
const indexRouter = Router();
const indexController =  require("../controller/indexController");
const passport = require("passport");

indexRouter.get("/", indexController.homeGet);
indexRouter.get("/sign-up", indexController.signUpGet);
indexRouter.post("/sign-up", indexController.signUpPost);

indexRouter.get("/log-in", indexController.logInGet);
indexRouter.post("/log-in", passport.authenticate('local', { successRedirect: "/", failureRedirect: "/log-in", failureMessage: true}));

indexRouter.get("/add-message", indexController.addMessageGet);
indexRouter.post("/add-message", indexController.addMessagePost);

indexRouter.get("/delete/:id", indexController.deleteMessagePost);

indexRouter.get("/become-member", indexController.becomeMemberGet);
indexRouter.post("/become-member", indexController.becomeMemberPost);

indexRouter.get("/log-out", indexController.userLogOutPost);

module.exports = indexRouter;
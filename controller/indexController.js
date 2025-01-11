const {userDb} = require("../db/queries");
const bcrypt = require("bcryptjs");
const {body , validationResult} = require("express-validator");


const validateUser = [
  body("firstname")
  .isAlpha()
  .withMessage("First name must only contain letters."),
  body("lastname")
  .isAlpha()
  .withMessage("Last name must only contain letters."),
  body("username")
  .matches(/^\S*$/)
  .withMessage("Username must not have spaces."),
  body("username")
  .custom(async (value) => {

    const user = await userDb.getUser(value);
    
    if(user){
      throw new Error("username already taken");
    }
    return true;
  }),
  body("repassword")
  .custom((value, {req}) => {
    return value === req.body.password;
  })
  .withMessage("Password do not match.")
]

const homeGet = (req, res) => {
    res.render("index", {user: req.user, messages: []});
  };

const logInGet = (req, res) => {
  res.render("log-in");
}


const signUpGet = (req, res) => {
  res.render("sign-up");
}

const signUpPost = [ validateUser, async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).render("sign-up", {errors: errors.array()});
  }
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if(err){
      throw err;
    }
    await userDb.insertUser({...req.body, password: hash});
  });
  res.render("log-in");
}]

const userLogOutPost = (req, res, next) => {
  req.logout((err) => {
    if(err) {
      return next(err);
    }
    res.redirect("/");
  });
} 

module.exports = {
  homeGet,
  logInGet,
  signUpGet,
  signUpPost,
  userLogOutPost
}
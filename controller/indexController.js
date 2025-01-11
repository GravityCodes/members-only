const {userDb, messageDb} = require("../db/queries");
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
];

const validateMember = [
  body("secret")
  .matches(/\b(?:name|Name)\b/)
  .withMessage("Hint: What is that which belongs to you But others use it more than you do?")
];

const homeGet = async (req, res) => {
    req.messages = await messageDb.getAllMessages();
    res.render("index", {user: req.user, messages: req.messages});
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
}];

const userLogOutPost = (req, res, next) => {
  req.logout((err) => {
    if(err) {
      return next(err);
    }
    res.redirect("/");
  });
} 

const addMessageGet = (req, res) => {
  res.render("add-message");
}

const addMessagePost = async (req, res) => {
  try {

  await messageDb.insertMessage({author_id: req.user.id, message: req.body.message, date_added: new Date()});
  res.redirect("/");

  } catch(err){
    throw err;
  }
  
}

const becomeMemberGet = (req, res) => {
  res.render("become-member");
}

const becomeMemberPost = [
  validateMember,
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).render("become-member", {errors: errors.array()});
    }
    
    await userDb.becomeMember();
    res.status(200).redirect("/", {becameMember : true});
  }


]

module.exports = {
  homeGet,
  logInGet,
  signUpGet,
  signUpPost,
  userLogOutPost,
  addMessageGet,
  addMessagePost,
  becomeMemberGet,
  becomeMemberPost
}
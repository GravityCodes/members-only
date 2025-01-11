const userDb = require("../db/queries");
const bcrypt = require("bcryptjs");

const homeGet = (req, res) => {
    res.render("index", {user: req.user});
  };

const logInGet = (req, res) => {
  res.render("log-in");
}


const signUpGet = (req, res) => {
  res.render("sign-up");
}

const signUpPost = async (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if(err){
      throw err;
    }
    await userDb.insertUser({...req.body, password: hash});
  });
  res.render("log-in");
}

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
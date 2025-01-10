
const homeGet = (req, res) => {
    res.render("index");
  };

const logInGet = (req, res) => {
  res.render("log-in");
}

const signUpGet = (req, res) => {
  res.render("sign-up");
}

module.exports = {
  homeGet,
  logInGet,
  signUpGet
}
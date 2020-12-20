const User = require('../models/user');

module.exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await new User({
      username,
      email,
    });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
    });
    req.flash('success', 'Welcome to Yelp Camp!');
    res.redirect('/campgrounds');
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render('users/login');
};

module.exports.login = (req, res) => {
  const username = req.user.username;
  const redirectUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  req.flash('success', `Welcome back ${username}!`);
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'Goodbye!');
  res.redirect('/campgrounds');
};

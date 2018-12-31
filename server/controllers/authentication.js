const User = require("../models/user");

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  //see if the user already exists
  User.findOne({ email: email }, function(err, existingUser) {
    //yes -> display error
    if (err) {
      return next(err);
    }

    if (existingUser) {
      res.status(422).send({ error: "Email is in use" });
    }

    //no -> create and save new user
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      //respond to request indicating user was created
      res.json({ success: true });
    });
  });
};
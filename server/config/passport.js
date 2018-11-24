const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local');
const { ExtractJwt } = require('passport-jwt');
const { secret } = require('./index');
const User = require('../models/user');

// JSON Web Token Strategy
passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secret
  }, async (payload, done) => {
    try {
      // find user specified in token
      const user = await User.findOne({ _id: payload.sub } );

      // If user doesnt exist, return 401 Unauthorized - User does not exist
      if (!user) return done(null, false); 

      // Log last login time
      user.lastLogin = Date.now();
      await user.save();

      //otherwise return the user
      done(null, user);

    } catch (error) {
      done(error, false); // 401 Unauthorized - No Token
    }
}));

// Local Strategy
passport.use(new localStrategy({ //authenticate user with username and password  [AUTHENTICATION]
  usernameField: 'email'
}, async (email, password, done) => {
  try {

    //find the user given the email
    const user = await User.findOne({ email: email });

    //if not return 401 unauthorized
    if (!user) return done(null, false);    

    //check if password is correct
    const isMatch = await user.isValidPassword(password);

    //if not return 401 unauthorized
    if (!isMatch) return done(null, false);

    // Save last login date to user
    user.lastLogin = Date.now();
    await user.save();

    //otherwise return the user
    done(null, user); // makes req.user
  } catch (e) {
    done(error, false);
  }
}));

module.exports = passport;
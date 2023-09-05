const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userController = require('./controllers/userController');
const User = require('./models/User');

passport.use(
  new GoogleStrategy(
    {
        clientID: '805358082610-04at6tctich63t93tupr0m4upqr4dm2d.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'https://track-track.fly.dev/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await userController.createUser(profile.id, profile.displayName);
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userController.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
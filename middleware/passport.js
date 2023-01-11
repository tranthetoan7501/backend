const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async function (email, password, done) {
      try {
        var user = await User.findOne({ email: email }).select('+password');
        const isMatch = await user.matchPassword(password);
        if (!user || !isMatch) {
          return done(null, false, {
            errors: { 'email or password': 'is invalid' },
          });
        }
        //user = await User.findOne({ email: email });
        return done(null, user);
      } catch (err) {
        done(null);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
      secretOrKey: 'secret key',
    },
    async function (jwt_payload, done) {
      try {
        const user = await User.findOne({ email: jwt_payload.email });
        if (
          (user && user.tokenCode == jwt_payload.code) ||
          (user && !jwt_payload.code)
        ) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '1043053836697-q5sku2jln8bohhqm2oqu25auha4als3u.apps.googleusercontent.com', //GOOGLE_CLIENT_ID,
      clientSecret: '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',
      callbackURL: '/api/user/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

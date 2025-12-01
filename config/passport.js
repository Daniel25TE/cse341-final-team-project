const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { getDatabase } = require('../data/database');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = getDatabase();
        const usersCollection = db.collection('users');

        let user = await usersCollection.findOne({ githubId: profile.id });

        if (!user) {
          const [firstName, lastName] = profile.displayName
            ? profile.displayName.split(' ')
            : ['', ''];

          user = {
            githubId: profile.id,
            displayName: profile.displayName,
            firstName,
            lastName,
            role: 'customer',
          };

          await usersCollection.insertOne(user);
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.githubId));
passport.deserializeUser(async (id, done) => {
  try {
    const db = getDatabase();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ githubId: id });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
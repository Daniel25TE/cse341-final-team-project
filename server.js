const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database.js');
const passport = require('./config/passport');
const session = require('express-session');
const cors = require('cors');

dotenv.config();

const app = express();

const port = process.env.PORT || 3004;

  app.use(bodyParser.json());
  app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, z-key'
);
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
  next();
})
.use(cors({ 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
}))

app.use('/', require('./routes/index'));

// Root route – use req.user (Passport)
app.get('/', (req, res) => {
  const user = req.session.user || req.user;

  if (user) {
    return res.send(`Logged in as ${user.displayName || user.username}`);
  }

  return res.send("Logged Out");
});

// GitHub OAuth login route
app.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

app.get('/', (req, res) => {
  res.send('If you see this message, the server is running.');
});


process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, 'Caught exception: ${err}\n' + 'Exception origin: ${origin}');
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    const PORT = process.env.PORT || 3004;
    app.listen(PORT, () => {
      console.log('Web Server is listening at port ' + PORT);
    });
  }
});

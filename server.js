const express = require('express');
const dotenv = require('dotenv');
const mongodb = require('./data/database.js');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    },
  })
);

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));

app.get('/', (req, res) => {
  res.send('If you see this message, the server is running.');
});

process.on('uncaughtException', (err, origin) => {
  console.error(`Caught exception: ${err}\nException origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Web Server is listening at port ${PORT}`);
    });
  }
});
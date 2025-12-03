const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database.js');

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
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

app.use('/', require('./routes/index'));

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

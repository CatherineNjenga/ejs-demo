'use strict';
require('dotenv').config();
const connectDB = require('./db/connect');
const session = require('express-session');
const port = 8080;

const express = require('express'),
  app = express();

const taskRouter =  require('./routes/tasks');
const setMessage = require('./middleware/message');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(express.urlencoded({extended: false}));
app.use('/tasks', setMessage, taskRouter);
// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  const mascots = [
    { name: 'Sammy', organization: 'DigitalOcean', birthYear: 2012 },
    { name: 'Tux', organization: 'Linux', birthYear: 1996 },
    { name: 'Moby Dock', organization: 'Docker', birthYear: 2013 },
  ];
  const tagline = 'No programming concept is complete without a cute animal mascot.';
  res.render('pages/index', {
    mascots: mascots,
    tagline: tagline,
  });
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

// app.listen(8080, () => {
//   console.log('Server is listening on port 8080');
// });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();
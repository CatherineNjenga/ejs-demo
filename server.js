'use strict';
const express = require('express'),
  app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

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

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});

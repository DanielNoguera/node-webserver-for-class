const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`
console.log(`${log}`);
fs.appendFile('server.log', log + '\n', (err) => {
  if (err) {
    console.log("serverlog didn't work!")
  }
})
  next();
});
//HERE IS THE DEACTIVATION CODE BELOW
//app.use((req, res, next) => {
//  res.render('um.hbs');
//});
//END OF SHUTDOWN CODE
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
return text.toUpperCase();
});
app.get('/', (req, res) => {
  res.render('home.hbs', {
    Message: "This is the main message text.  I will change this to announcements",
    pageTitle: 'home page'
  })
}
);
app.get('/about', (req, res) => {
  res.render('about.hbs', {
  pageTitle: 'about page'
});
});
app.get('/projects', (req, res) => {
  res.render('Projects.hbs', {
  pageTitle: 'Projects'
});
});
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Server Fail'
  });
})
app.listen(port, () => {
  console.log(`Yo! Daniel!  Server is up on port ${port} !`);
});

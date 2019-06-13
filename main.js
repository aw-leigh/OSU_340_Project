/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

//for Marvel DB
app.use('/characters', require('./characters.js'));
app.use('/characters-new', require('./characters-new.js'));
app.use('/characters-movies', require('./characters-movies.js'));
app.use('/characters-movies-new', require('./characters-movies-new.js'));
app.use('/characters-organizations', require('./characters-organizations.js'));
app.use('/characters-organizations-new', require('./characters-organizations-new.js'));
app.use('/planets', require('./planets.js'));
app.use('/planets-new', require('./planets-new.js'));
app.use('/movies', require('./movies.js'));
app.use('/movies-new', require('./movies-new.js'));
app.use('/organizations', require('./organizations.js'));
app.use('/organizations-new', require('./organizations-new.js'));
app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404', {layout: 'error.handlebars'});
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500', {layout: 'error.handlebars'});
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

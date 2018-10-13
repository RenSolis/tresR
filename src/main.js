// Modules
const path = require('path');
const ejs = require('ejs-mate');
const routes = require('./routes/routes');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();

// Open database in memory
const db = new sqlite3.Database(':memory:', err => {
    if (err) return console.log('Could not connect to Sqlite Database', err);
    console.log('Connected to the in-memory SQlite Database');
});

 // Close the database connection   
db.close(err => {
    if (err) return console.log(err.message);
    console.log('Close the database connection');
});

//  Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', ejs);
app.set('views', path.join(__dirname, 'views'));

//  Routes
app.use('/', routes);

//  Create server
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));

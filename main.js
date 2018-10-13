// Modules
const path = require('path');
const ejs = require('ejs-mate');
const routes = require('./routes/routes');
const express = require('express');
const app = express();

//  Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', ejs);
app.set('views', path.join(__dirname, 'views'));

//  Routes
app.use('/', routes);

//  Create server
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));

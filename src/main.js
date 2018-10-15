// Modules
import path from 'path';
import routes from './routes/routes';
import users from './routes/users';
import express from 'express';
const database = require('./database');
const app = express();

//  Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//  Routes
app.use('/', routes);
app.use('/users', users);

//  Create server and database
app.set('port', process.env.PORT || 3000);
database.sequelize.sync().done(() => {
    app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));
});

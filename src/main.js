// Modules
import routes from './routes/routes';
import users from './routes/users';
import passport from 'passport';
import database from './database';
import express from 'express';
const app = express();

//  Middlewares
require('./middlewares/app-settings')(app);
require('./middlewares/session-validates')(app);

//  Routes
app.use('/', routes);
app.use('/users', users);

//  Create server and database
app.set('port', process.env.PORT || 3000);
database.sequelize.sync().done(() => {
    app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));
});

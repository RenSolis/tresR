// Modules
import routes from './routes/routes';
import users from './routes/users';
import session from 'express-session';
import flash from 'connect-flash';
import express from 'express';
import database from './database';
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

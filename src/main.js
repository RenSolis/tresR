// Modules
import materials from './routes/materials';
import claims from './routes/claims';
import routes from './routes/routes';
import users from './routes/users';
import database from './config/database';
import express from 'express';
const app = express();

//  Middlewares
require('./middlewares/app-settings')(app);
require('./middlewares/session-validates')(app);
require('./middlewares/passport-settings')(app);

//  Routes
app.use('/', routes);
app.use('/users', users);
app.use('/claims', claims);
app.use('/materials', materials);

//  Create server and database
app.set('port', process.env.PORT || 3000);
database.sequelize.sync().done(() => {
    app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));
});

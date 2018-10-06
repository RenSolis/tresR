const path = require('path');
const routes = require('./routes/routes');
const express = require('express');
const app = express();

app.use('/', routes);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));
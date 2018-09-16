/* ----------------------------------------------------------
    DEPENDENCIES
---------------------------------------------------------- */

//  Installed
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

//  Routing - User
const routes = require('./routes/routes');

//  Routing - Admin
const admin = require('./routes/admin');

//  Controller
// require('./controllers/db_setup');


/* ----------------------------------------------------------
    EXPRESS DEPLOYMENT
---------------------------------------------------------- */

//  Initialization
const app = express();

//  Port selection
app.set('port', process.env.PORT || process.argv[2] || 3005);

//  Body Parser setup
app.use(bodyParser.urlencoded({extended: false}));

/* ----------------------------------------------------------
    ROUTING - EXPRESS
---------------------------------------------------------- */

//  Public Resources
app.use(express.static(path.join(__dirname, 'public')));

//  User Routes
routes(app);

//  Admin
app.use('/admin', admin);


/* ----------------------------------------------------------
    VIEWS ENGINE - HANDLEBARS
---------------------------------------------------------- */

// Handlebars as extension '.hbs'
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars({extname: '.hbs', defaultLayout: 'main'}));


/* ----------------------------------------------------------
    DATABASE SETUP
---------------------------------------------------------- */

// require('./controllers/db_setup');

/* ----------------------------------------------------------
    PORT LISTENER
---------------------------------------------------------- */

app.listen(app.get('port'), () => {
    console.log(`Listening on port: ${app.get('port')}`);
});
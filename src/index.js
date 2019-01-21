const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const monthMatch = require('./public/js/monthMatch.js')

//initializations
const app = express();
const config = require('./config/months');
require('./database');


//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	helpers: { monthMatch: monthMatch },
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs'
}));
app.set('view engine', '.hbs');


//middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
	secret: 'mysecretapp',
	resave: true,
	saveUninitialized: true
}));
app.use(flash());

//global variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

//routes
app.use(require('./routes/index'));
app.use(require('./routes/grades'));
app.use(require('./routes/sections'));
app.use(require('./routes/students'));
app.use(require('./routes/payments'));


//static files
app.use(express.static(path.join(__dirname, 'public')));


//server is listenning
app.listen(app.get('port'), () => {
	console.log('server on port ', app.get('port'));
});
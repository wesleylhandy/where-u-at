// Dependencies
const compression = require('compression');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require('path');
const assert = require('assert');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
    require('babel-register')({
        ignore: /\/(build|node_modules)\//,
        presets: ['env', 'react-app']
    });
}

// set Mongoose promises to es6 promises
mongoose.Promise = Promise;
// Initialize Express Server
const app = express();
// Specify the port.
var port = process.env.PORT || 3001;
//support gzip
app.use(compression());
// Use morgan for logs 
app.use(logger("dev"));
//body parser for routes our app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.set('port', port);

// MongoDB
var uri = process.env.MLAB_URI;

//connect to mongodb//set controllers and sockets here to have access to DB
mongoose.connect(uri, { useMongoClient: true })
const db = mongoose.connection;
mongoose.set('debug', true);
db.on('error', console.error.bind(console, '# Mongo DB: connection error:'));

//add session support
app.set('trust proxy', 1) // trust first proxy
const month = 1000 * 60 * 60 * 24 * 31;
app.use(cookieParser());
app.use(session({
    secret: 'twentythree@#@#2323',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: month },
    store: new MongoStore({ mongooseConnection: db })
}));

app.use(passport.initialize());
app.use(passport.session());

//middleware to display session data in console - remove for production
if (process.env.NODE_ENV !== 'production') {
    //log SESSION
    app.use(function(req, res, next) {
        console.log('');
        console.log('*************SESSION MIDDLEWARE***************');
        console.log(req.session);
        console.log('');
        console.log('Logged In: ');
        console.log('__________ ' + req.isAuthenticated());
        console.log('**********************************************');
        console.log('');
        next();
    });
    //enable CORS
    app.use(cors());
}

//set up passport for user authentication
const passportConfig = require('./config/passport');

require("./controllers/auth-controller.js")(app);
require("./controllers/search-controller.js")(app);
require("./controllers/checkin-controller.js")(app);

// Make public a static dir
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// else {
//     const proxy = require('express-http-proxy')
//     app.use('/*', proxy('http://127.0.0.1:3000/'))
// }

//SERVER SIDE RENDERING
// const universalLoader = require('./universal-compiled.js');
// app.use('/', universalLoader);

// Listen on port 3000 or assigned port
const server = app.listen(app.get('port'), function() {
    console.log(`App running on ${app.get('port')}`);
});

// socket.io server for websockets
//for future development
/*const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log('a user connected');

    //notify all but caller of new save
    socket.on('save-event', function(article) {
        console.log('Save called');
        socket.broadcast.emit('new-save', { article });
    });

    //notify all but caller of delete
    socket.on('remove-event', function(article) {
        console.log('Remove called');
        socket.broadcast.emit('new-delete', { article });
    });

    //notify all but caller of new vote
    socket.on('vote-event', function(article) {
        console.log('Vote called');
        socket.broadcast.emit('new-vote', { article });
    })

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

});*/
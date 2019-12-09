const express        = require('express');
const app            = express();
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const dbHost = 'mongodb://localhost:27017/';
let movies = require('./app/movie-crud');
let city = require('./app/city-crud');
let theatre = require('./app/theatre-crud');
let showtime = require('./app/showtime-crud');
let assign = require('./app/assign-crud');
let book = require('./app/bookings-crud');

app.use(bodyParser.json({}));

app.use('/movie', movies);
app.use('/city',city);
app.use('/theatre',theatre);
app.use('/showtime',showtime);
app.use('/assign',assign);
app.use('/book',book);

mongoose.connect(dbHost);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");
});
//PORT
var port = process.env.PORT || 3000; 

app.listen(port);
console.log('Listening on port: ' + port); 			
exports = module.exports = app; 				

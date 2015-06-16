'use strict';

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var app = express();

//all files in /build will be static
app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/app'));

process.env.APP_SECRET = process.env.APP_SECRET || 'changethischangethischangetis!';

var petRoutes = express.Router();
var usersRoutes = express.Router();

//create mongoDB for pet schema
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/pet_development');

app.use(passport.initialize());

require('./lib/passport_strat.js')(passport);

require('./routes/pet_routes.js')(petRoutes);
require('./routes/auth_routes.js')(usersRoutes, passport);

app.use('/api', petRoutes);
app.use('/api', usersRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on PORT ' + (process.env.PORT || 3000));
});//end listen method

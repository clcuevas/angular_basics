'use strict';

var express = require('express');
var mongoose = require('mongoose');
var app = express();

var petRoutes = express.Router();

//create mongoDB for pet schema
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/pet_development');

require('./routes/pet_routes.js')(petRoutes);

app.use('/api', petRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on PORT ' + (process.env.PORT || 3000));
});//end listen method

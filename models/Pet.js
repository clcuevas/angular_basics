'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var petSchema = new Schema({
  name: String,
  owner: String,
  weight: Number,
  type: String
});//end Pet Schema

petSchema.methods.findSimilarTypes = function(callback) {
  return this.model('Pet').find({type: this.type}, callback);
};

//create model
module.exports = mongoose.model('Pet', petSchema);

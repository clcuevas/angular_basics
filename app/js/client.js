'use strict';

var greet = require('./greet.js');
document.write(greet());
var petList = document.getElementById('petlist');

var request = require('superagent');

request
  .get('/api/pets')
  .end(function(err, res) {
    if (err) return console.log(err);
    var pets = JSON.parse(res.text);

    pets.forEach(function(pet) {
      var petEl = document.createElement('li');
      petEl.innerHTML = 'Pet: ' + pet.name + ', Owner: ' + pet.owner;
      petList.appendChild(petEl);
    });
  });
'use strict';

var Pet = require('../models/Pet.js');
var bodyparser = require('body-parser');

module.exports = function(router) {
  var queryDog = new Pet({type: 'dog'});
  var queryFerrets = new Pet({type: 'ferret'});

  router.use(bodyparser.json());

  router.get('/pets', function(req, res) {
    Pet.find({}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });//end find
  });//end get method

  router.get('/pets/search', function(req, res) {
    res.send('Type /dogs after the search URL to view all dogs or /ferrets to view all ferrets');
  });

  //custom query/ method for dogs
  router.get('/pets/search/dogs', function(req, res) {
    queryDog.findSimilarTypes(function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });//end dog query
  });

  //custom query/ method for ferrets
  router.get('/pets/search/ferrets', function(req, res) {
    queryFerrets.findSimilarTypes(function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });//end ferret query
  });

  router.post('/pets', function(req, res) {
    var newPet = new Pet(req.body);
    newPet.save(function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });//end save
  });//end post method

  router.delete('/pets/:id', function(req, res) {
    Pet.remove({'_id': req.params.id}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'success'});
    });//end remove method
  });//end delete method
};

'use strict';

//db for testing purposes
process.env.MONGOLAB_URI = 'mongodb://localhost/pet_test';
require('../server.js');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var Pet = require('../models/Pet.js');

describe('Pet REST API', function() {
  before(function(done) {
    var petTest2 = new Pet({name: 'Dos', owner: 'Claudia', weight: 60, type: 'dog'});
    petTest2.save(function(err, data) {
      if(err) {
        throw err;
      }
      
      this.petTest2 = data;
      done();
    }.bind(this));//end pet save
  });//end before

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });//drop/ end DB connection
  });

  it('should create a new Pet document', function(done) {
    chai.request('localhost:3000')
      .post('/api/pets')
      .send({name: 'Velia', owner: 'Claudia', weight: '1', type: 'hedgehog'})
      .end(function(err, res) {
        expect(err).to.equal(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.owner).to.equal('Claudia');
        done();
      });
  });

  it('should GET a Pet document from the collection', function(done) {
    chai.request('localhost:3000')
      .get('/api/pets')
      //.query({name: 'Dos', limit: 10})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.equal('object');
        expect(res.body[0].name).to.equal('Peanut');
        expect(res.body[1].name).to.equal('Dos');
        done();
      });
  });
});

describe('modify existing Pet documents', function() {
  beforeEach(function(done) {
    var petTest = new Pet({name: 'Peanut', owner: 'Claudia', weight: 22, type: 'dog'});
    petTest.save(function(err, data) {
      if(err) {
        throw err;
      }

      this.petTest = data;
      done();
    }.bind(this));//end Pet save
  });//end before each

  it('should verify that before each creates a Pet', function() {
    expect(this.petTest.name).to.eql('Peanut');
    expect(this.petTest).to.have.property('_id');
  });

  it('should DELETE a pet collection', function(done) {
    chai.request('localhost:3000')
      .del('/api/pets/' + this.petTest._id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        console.log(res.body.msg);
        expect(res.body.msg).to.equal('success');
        done();
      });
  });//end DELETE test
});

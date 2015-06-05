'use strict';

require('../../app/js/client.js');
require('angular-mocks');

describe('copy services', function() {
  beforeEach(angular.mock.module('petsApp'));

  it('should copy an object', angular.mock.inject(function(copy) {
    var testObj = {test: 'value'};
    var copiedObj = copy(testObj);
    testObj = null;
    expect(copiedObj.test).toBe('value');
    expect(testObj).toBe(null);
  }));
});

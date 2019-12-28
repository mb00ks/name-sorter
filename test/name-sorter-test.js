var expect  = require('chai').expect;
var compareFn = require('../compareNames');

describe('name sorter', function() {

  it('should sort correctly', function () {
    var res = compareFn('cd', 'ab');
    expect(res).to.equal(1);

    var res = compareFn('ab', 'cd');
    expect(res).to.equal(-1);

    var res = compareFn('ab', 'ab');
    expect(res).to.equal(0);

  });


  it('should sort long words correctly', function () {
    var res = compareFn('cd abc', 'ab aaa');
    expect(res).to.equal(1);
  });

});

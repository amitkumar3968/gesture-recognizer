var assert = require('assert');
var GestureRecognizer = require('gesture-recognizer');
var gestureRecognizer = new GestureRecognizer(document);

describe('GestureRecognizer', function () {
  describe('.prototype', function () {
    describe('.state', function () {
      it('should default to `possible`', function(){
        assert(GestureRecognizer.prototype.state === 'possible');
      });
    });
  });
});

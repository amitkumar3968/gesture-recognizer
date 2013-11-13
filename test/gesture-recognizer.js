var assert = require('assert');
var GestureRecognizer = require('gesture-recognizer');
var gestureRecognizer = new GestureRecognizer(document);

describe('GestureRecognizer', function () {
  describe('.prototype', function () {
    describe('.addTarget(target, action)', function () {
      var target, action, testTargetActionPairs;

      beforeEach(function() {
        target = { myAction: function () {} };
        action = 'myAction';
        testTargetActionPairs = [];
      });

      it('should store the target-action pair', function () {
        GestureRecognizer.prototype.addTarget(target, action, testTargetActionPairs);

        assert(testTargetActionPairs[0][0] === target);
        assert(testTargetActionPairs[0][1] === action);
      });

      describe(
        'when attempting to add a target-action pair that has already been added',
        function () {
          it('should ignore the request', function () {
            GestureRecognizer.prototype.addTarget(target, action, testTargetActionPairs);
            GestureRecognizer.prototype.addTarget(target, action, testTargetActionPairs);

            assert(testTargetActionPairs.length === 1);
          });
        }
      );

      describe('when `target` is falsey', function () {
        it('should raise an error', function () {
          var errorMessage;

          try {
            GestureRecognizer.prototype.addTarget();
          } catch (error) {
            errorMessage = error.message;
          } finally {
            assert(errorMessage === 'You must specify a target');
          }
        });
      });

      describe('when `action` is falsey', function () {
        it('should raise an error', function () {
          var errorMessage;

          try {
            GestureRecognizer.prototype.addTarget({});
          } catch (error) {
            errorMessage = error.message;
          } finally {
            assert(errorMessage === 'You must specify an action');
          }
        });
      });

      describe('when `action` is not a string', function () {
        it('should raise an error', function () {
          var errorMessage;

          try {
            GestureRecognizer.prototype.addTarget({}, {});
          } catch (error) {
            errorMessage = error.message;
          } finally {
            assert(errorMessage === 'Action must be a string');
          }
        });
      });

      describe('when the `action` is not a function of `target`', function () {
        it('should raise an error', function () {
          var errorMessage;

          try {
            GestureRecognizer.prototype.addTarget({}, 'foo');
          } catch (error) {
            errorMessage = error.message;
          } finally {
            assert(errorMessage === 'The specified action must be a function of the target');
          }
        });
      });
    });
  });
});

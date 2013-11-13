var assert = require('assert');
var GestureRecognizer = require('gesture-recognizer');
var gestureRecognizer = new GestureRecognizer(document);

describe('GestureRecognizer', function () {
  describe('.prototype', function () {
    var target, action, testTargetActionPairs, anotherTarget;

    beforeEach(function() {
      target = { myAction: function () {} };
      anotherTarget = { myAction: function () {} };
      action = 'myAction';
      testTargetActionPairs = [];
    });

    describe('.addTarget(target, action)', function () {
      it('should store the target-action pair', function () {
        GestureRecognizer.prototype.addTarget(target, action,
          testTargetActionPairs);

        assert(testTargetActionPairs[0][0] === target);
        assert(testTargetActionPairs[0][1] === action);
      });

      describe(
        'when attempting to add a target-action pair that has already been added',
        function () {
          it('should ignore the request', function () {
            GestureRecognizer.prototype.addTarget(target, action,
              testTargetActionPairs);
            GestureRecognizer.prototype.addTarget(target, action,
              testTargetActionPairs);

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

    describe('.removeTarget(target, action)', function () {
      it('should remove the specified target-action pair', function () {
        GestureRecognizer.prototype.addTarget(target, action,
          testTargetActionPairs);
        GestureRecognizer.prototype.removeTarget(target, action,
          testTargetActionPairs);

        assert(testTargetActionPairs.length === 0);
      });

      describe('when `target` and `action` are null', function () {
        it(
          'should remove all target-action pairs',
          function () {
            GestureRecognizer.prototype.addTarget(target, action,
              testTargetActionPairs);
            GestureRecognizer.prototype.addTarget(anotherTarget, action,
              testTargetActionPairs);
            GestureRecognizer.prototype.removeTarget(null, null,
              testTargetActionPairs);

            assert(testTargetActionPairs.length === 0);
          }
        );
      });

      describe('when `target` is null', function () {
        it(
          'should remove any target-action pairs with the associated `action`',
          function () {
            GestureRecognizer.prototype.addTarget(target, action,
              testTargetActionPairs);
            GestureRecognizer.prototype.addTarget(anotherTarget, action,
              testTargetActionPairs);
            GestureRecognizer.prototype.removeTarget(null, action,
              testTargetActionPairs);

            assert(testTargetActionPairs.length === 0);
          }
        );
      });

      describe('when `action` is null', function () {
        it(
          'should remove any target-action pairs with the associated `target`',
          function () {
            target.anotherAction = function () {};

            GestureRecognizer.prototype.addTarget(target, action,
              testTargetActionPairs);
            GestureRecognizer.prototype.addTarget(target, 'anotherAction',
              testTargetActionPairs);
            GestureRecognizer.prototype.removeTarget(target, null,
              testTargetActionPairs);

            assert(testTargetActionPairs.length === 0);
          }
        );
      });
    });
  });
});

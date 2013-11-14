var assert = require('assert');
var GestureRecognizer = require('gesture-recognizer');
var gestureRecognizer = new GestureRecognizer(document);

describe('GestureRecognizer', function () {
  describe('.prototype', function () {
    var target, action, testTargetActionPairs, anotherTarget, prototype;

    beforeEach(function() {
      target = { myAction: function () {} };
      anotherTarget = { myAction: function () {} };
      action = 'myAction';
      testTargetActionPairs = [];
      prototype = GestureRecognizer.prototype;
    });

    describe('.states', function () {
      describe('.POSSIBLE', function () {
        it('should evaluate to `possible`', function () {
          assert(prototype.states.POSSIBLE === 'possible');
        });
      });

      describe('.BEGAN', function () {
        it('should evaluate to `began`', function () {
          assert(prototype.states.BEGAN === 'began');
        });
      });

      describe('.CHANGED', function () {
        it('should evaluate to `changed`', function () {
          assert(prototype.states.CHANGED === 'changed');
        });
      });

      describe('.ENDED', function () {
        it('should evaluate to `ended`', function () {
          assert(prototype.states.ENDED === 'ended');
        });
      });

      describe('.CANCELLED', function () {
        it('should evaluate to `cancelled`', function () {
          assert(prototype.states.CANCELLED === 'cancelled');
        });
      });

      describe('.FAILED', function () {
        it('should evaluate to `failed`', function () {
          assert(prototype.states.FAILED === 'failed');
        });
      });

      describe('.RECOGNIZED', function () {
        it('should evaluate to `ended`', function () {
          assert(prototype.states.RECOGNIZED === 'ended');
        });
      });
    });

    describe('.state', function () {
      it('should default to `possible`', function () {
        console.log(prototype.state);
        assert(prototype.state === prototype.states.POSSIBLE);
      });
    });

    describe('.addTarget(target, action)', function () {
      it('should store the target-action pair', function () {
        prototype.addTarget(target, action, testTargetActionPairs);

        assert(testTargetActionPairs[0][0] === target);
        assert(testTargetActionPairs[0][1] === action);
      });

      describe(
        'when attempting to add a target-action pair that has already been added',
        function () {
          it('should ignore the request', function () {
            prototype.addTarget(target, action, testTargetActionPairs);
            prototype.addTarget(target, action, testTargetActionPairs);

            assert(testTargetActionPairs.length === 1);
          });
        }
      );

      describe('when `target` is falsey', function () {
        it('should raise an error', function () {
          var errorMessage;

          try {
            prototype.addTarget();
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
            prototype.addTarget({});
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
            prototype.addTarget({}, {});
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
            prototype.addTarget({}, 'foo');
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
        prototype.addTarget(target, action, testTargetActionPairs);
        prototype.removeTarget(target, action, testTargetActionPairs);

        assert(testTargetActionPairs.length === 0);
      });

      describe('when `target` and `action` are null', function () {
        it('should remove all target-action pairs', function () {
          prototype.addTarget(target, action, testTargetActionPairs);
          prototype.addTarget(anotherTarget, action, testTargetActionPairs);
          prototype.removeTarget(null, null, testTargetActionPairs);

          assert(testTargetActionPairs.length === 0);
        });
      });

      describe('when `target` is null', function () {
        it(
          'should remove any target-action pairs with the associated `action`',
          function () {
            prototype.addTarget(target, action, testTargetActionPairs);
            prototype.addTarget(anotherTarget, action, testTargetActionPairs);
            prototype.removeTarget(null, action, testTargetActionPairs);

            assert(testTargetActionPairs.length === 0);
          }
        );
      });

      describe('when `action` is null', function () {
        it(
          'should remove any target-action pairs with the associated `target`',
          function () {
            target.anotherAction = function () {};

            prototype.addTarget(target, action, testTargetActionPairs);
            prototype.addTarget(target, 'anotherAction', testTargetActionPairs);
            prototype.removeTarget(target, null, testTargetActionPairs);

            assert(testTargetActionPairs.length === 0);
          }
        );
      });
    });
  });
});

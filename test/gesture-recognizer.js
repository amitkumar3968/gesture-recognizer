var assert = require('assert');
var GestureRecognizer = require('gesture-recognizer');
var gestureRecognizer = new GestureRecognizer(document);

describe('GestureRecognizer', function () {
  describe('.prototype', function () {
    var target;
    var action;
    var pairs;
    var pairsLength;
    var states;
    var anotherTarget;
    var prototype;
    var addTarget;
    var removeTarget;
    var anotherAction;

    beforeEach(function() {
      target = { myAction: function () {}, anotherAction: function () {} };
      anotherTarget = { myAction: function () {}, anotherAction: function () {} };
      action = 'myAction';
      anotherAction = 'anotherAction'
      pairs = this.pairs = [];
      prototype = GestureRecognizer.prototype;
      states = prototype.states;
      addTarget = prototype.addTarget.bind(this);
      removeTarget = prototype.removeTarget.bind(this);

      addTarget(target, action);
      addTarget(target, action);
      addTarget(target, anotherAction);
      addTarget(anotherTarget, action);
      addTarget(anotherTarget, anotherAction);

      pairsLength = pairs.length;
    });

    describe('.states', function () {
      describe('.POSSIBLE', function () {
        it('should evaluate to `possible`', function () {
          assert(states.POSSIBLE === 'possible');
        });
      });

      describe('.BEGAN', function () {
        it('should evaluate to `began`', function () {
          assert(states.BEGAN === 'began');
        });
      });

      describe('.CHANGED', function () {
        it('should evaluate to `changed`', function () {
          assert(states.CHANGED === 'changed');
        });
      });

      describe('.ENDED', function () {
        it('should evaluate to `ended`', function () {
          assert(states.ENDED === 'ended');
        });
      });

      describe('.CANCELLED', function () {
        it('should evaluate to `cancelled`', function () {
          assert(states.CANCELLED === 'cancelled');
        });
      });

      describe('.FAILED', function () {
        it('should evaluate to `failed`', function () {
          assert(states.FAILED === 'failed');
        });
      });

      describe('.RECOGNIZED', function () {
        it('should evaluate to `ended`', function () {
          assert(states.RECOGNIZED === 'ended');
        });
      });
    });

    describe('.state', function () {
      it('should default to `possible`', function () {
        assert(prototype.state === states.POSSIBLE);
      });
    });

    describe('.addTarget(target, action)', function () {
      it('should store the target-action pair', function () {
        assert(pairs[0][0] === target && pairs[0][1] === action);
      });

      it('should ignore requests to add duplicates', function () {
        assert(pairs.length === 4);
      });

      describe('when `target` is falsey', function () {
        it('should raise an error', function () {
          var errorMessage;

          try {
            addTarget();
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
            addTarget({});
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
            addTarget({}, {});
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
            addTarget({}, 'foo');
          } catch (error) {
            errorMessage = error.message;
          } finally {
            assert(errorMessage === 'The specified action must be a function of the target');
          }
        });
      });
    });

    describe('.removeTarget(target, action)', function () {
      it('should remove the specified target-action pair(s)', function () {
        removeTarget(target, action);

        assert(pairs.length === pairsLength - 1);
      });

      describe('when `target` and `action` are null', function () {
        it('should remove all target-action pairs', function () {
          removeTarget(null, null);

          assert(pairs.length === 0);
        });
      });

      describe('when `target` is null', function () {
        it(
          'should remove any target-action pairs with the associated `action`',
          function () {
            removeTarget(null, action);

            assert(pairs.length === 2);
          }
        );
      });

      describe('when `action` is null', function () {
        it(
          'should remove any target-action pairs with the associated `target`',
          function () {
            removeTarget(target, null);

            assert(pairs.length === 2);
          }
        );
      });
    });
  });
});

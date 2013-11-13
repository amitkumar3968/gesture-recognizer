/**
 * Expose
 */
module.exports = GestureRecognizer;

/**
 * Constructor
 */
function GestureRecognizer() {}

/**
 * Private variables
 */
var targetActionPairs = [];

/**
 * Prototype
 */
var prototype = Object.create(null);

GestureRecognizer.prototype = prototype;

prototype.addTarget = function (target, action, testTargetActionPairs) {
  var pairs = (testTargetActionPairs || targetActionPairs);

  if (!target)
    throw new Error("You must specify a target");

  if (!action)
    throw new Error("You must specify an action");

  if (typeof action !== "string")
    throw new Error("Action must be a string");

  if (typeof target[action] !== "function")
    throw new Error("The specified action must be a function of the target");

  if (typeof indexOfTargetActionPair(target, action, pairs) !== "number")
    pairs.push([target, action]);
};

prototype.removeTarget = function (target, action, testTargetActionPairs) {
  var pairs = (testTargetActionPairs || targetActionPairs);

  if (target === null && action === null) {
    pairs.length = 0;
  } else if (target === null) {
    var i = pairs.length;

    while (i--) if (pairs[i][1] === action) pairs.splice(i, 1);
  } else if (action === null) {
    var i = pairs.length;

    while (i--) if (pairs[i][0] === target) pairs.splice(i, 1);
  } else {
    var i = indexOfTargetActionPair(target, action, pairs);

    if (typeof i === 'number') pairs.splice(i, 1);
  }
};

/**
 * Helper functions
 */
function indexOfTargetActionPair(target, action, pairs) {
  for (var i = 0, l = pairs.length; i < l; i ++)
    if (pairs[i][0] === target && pairs[i][1] === action) return i;
}

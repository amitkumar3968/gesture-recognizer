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
  if (!target) {
    throw new Error("You must specify a target");
  } else if (!action) {
    throw new Error("You must specify an action");
  } else if (typeof action !== "string") {
    throw new Error("Action must be a string");
  } else if (typeof target[action] !== "function") {
    throw new Error("The specified action must be a function of the target");
  }

  var targets = (testTargetActionPairs || targetActionPairs);

  for (var i = 0, l = targets.length; i < l; i ++)
    if (targets[i][0] === target && targets[i][1] === action ) return;

  targets.push([target, action]);
};

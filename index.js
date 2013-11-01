/**
 * Expose
 */
module.exports = GestureRecognizer;

/**
 * Constructor
 */
function GestureRecognizer() {}

/**
 * Prototype
 */
GestureRecognizer.prototype = {
  state: 'possible',
  gestureRecognizerShouldBegin: function () {
    return true;
  }
};

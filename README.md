# Gesture Recognizer

> An abstract base class for concrete gesture-recognizer classes.

`GestureRecognizer` is an abstract base class for concrete gesture-recognizer
classes. A gesture-recognizer object—or, simply, a gesture recognizer—decouples
the logic for recognizing a gesture and acting on that recognition. When one of
these objects recognizes a common gesture or, in some cases, a change in the
gesture, it sends an action message to each designated target object.

The concrete subclasses of `GestureRecognizer` are the following:

* [TapGestureRecognizer](https://github.com/multi-touch/tap-gesture-recognizer)
* [PanGestureRecognizer](https://github.com/multi-touch/pan-gesture-recognizer)

The `GestureRecognizer` class defines a set of common behaviors that can be
configured for all concrete gesture recognizers. It can also communicate with
its delegate, thereby enabling finer-grained customization of some behaviors.

By default, a gesture recognizer operates on touches hit-tested to the current
HTML document.

A gesture recognizer has one or more target-action pairs associated with it. If
there are multiple target-action pairs, they are discrete, and not cumulative.
Recognition of a gesture results in the dispatch of an action message to a
target for each of the associated pairs.

The gesture interpreted by a gesture recognizer can be either discrete or
continuous. A discrete gesture, such as a double tap, occurs but once in a
multi-touch sequence and results in a single action sent. However, when a
gesture recognizer interprets a continuous gesture such as a rotation gesture,
it sends an action message for each incremental change until the multi-touch
sequence concludes.

A window delivers touch events to a gesture recognizer before it delivers them
to the hit-tested view attached to the gesture recognizer. Generally, if a
gesture recognizer analyzes the stream of touches in a multi-touch sequence and
doesn’t recognize its gesture, the view receives the full complement of touches.
If a gesture recognizer recognizes its gesture, the remaining touches for the
view are cancelled.

## Installation

```sh
component install multi-touch/gesture-recognizer
```

## Tasks

### Initializing a Gesture Recognizer

[`initWithTarget`](#initwithtarget)

### Adding and Removing Targets and Actions

[`addTarget`](#addtarget)
[`removeTarget`](#removetarget)

### Getting the Touches and Location of a Gesture

[`locationInView`](#addtarget)
[`locationOfTouch`](#locationoftouch)
[`numberOfTouches`](#numberoftouches)

### Getting the Recognizer's State and View

[`state`](#state) *property*
[`view`](#view) *property*
[`enabled`](#enabled) *property*

### Canceling and Delaying Touches

[`cancelsTouchesInView`](#cancelstouchesinview) *property*
[`delaysTouchesBegan`](#delaystouchesbegan) *property*
[`delaysTouchesEnded`](#delaystouchesended) *property*

### Specifying Dependencies Between Gesture Recognizers

[`requireGestureRecognizerToFail`](#requiregesturerecognizertofail)

### Setting and Getting the Delegate

[`delegate`](#delegate) *property*

### Methods for Subclasses

Below is a list of methods intended to be called or overriden *only* by
subclasses of a `GestureRecognizer`. Clients that merely use concrete subclasses
of `GestureRecognizer` must never call these methods.

[`touchesBegan`](#touchesbegan)
[`touchesMoved`](#touchesmoved)
[`touchesEnded`](#touchesended)
[`touchesCancelled`](#touchescancelled)
[`reset`](#reset)
[`ignoreTouch`](#ignoretouch)
[`canBePreventedByGestureRecognizer`](#canbepreventedbygesturerecognizer)
[`shouldRequireFailureOfGestureRecognizer`](#shouldrequirefailureofgesturerecognizer)
[`shouldBeRequiredToFailByGestureRecognizer`](#shouldberequiredtofailbygesturerecognizer)

## Properties

### `cancelsTouchesInView`

A Boolean value affecting whether touches are delivered to a view when a gesture
is recognized.

#### Discussion

When this property is `true` (the default) and the receiver recognizes its
gesture, the touches of that gesture are pending are not delivered to the view
and previously delivered touches are cancelled through a
[`touchesCancelled`](#touchescancelled) message sent to the view. If a gesture
recognizer doesn't recognize its gesture or if the value of this property is
`false`, the view receives all the touches in the multi-touch sequence.

## License

MIT

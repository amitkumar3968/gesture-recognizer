# GestureRecognizer

> An abstract base class for concrete gesture-recognizer classes.

`GestureRecognizer` is an abstract base class for concrete gesture-recognizer
classes. A gesture-recognizer object—or, simply, a gesture recognizer—decouples
the logic for recognizing a gesture and acting on that recognition. When one of
these objects recognizes a common gesture or, in some cases, a change in the
gesture, it sends an action message to each designated target object.

The concrete subclasses of `GestureRecognizer` are the following:

* [`TapGestureRecognizer`](https://github.com/multi-touch/tap-gesture-recognizer)
* [`PanGestureRecognizer`](https://github.com/multi-touch/pan-gesture-recognizer)

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

* [`initWithTarget`](#initwithtarget)

### Adding and Removing Targets and Actions

* [`addTarget`](#addtarget)
* [`removeTarget`](#removetarget)

### Getting the Touches and Location of a Gesture

* [`locationInView`](#addtarget)
* [`locationOfTouch`](#locationoftouch)
* [`numberOfTouches`](#numberoftouches)

### Getting the Recognizer's State and View

* [`state`](#state) *property*
* [`view`](#view) *property*
* [`enabled`](#enabled) *property*

### Canceling and Delaying Touches

* [`cancelsTouchesInView`](#cancelstouchesinview) *property*
* [`delaysTouchesBegan`](#delaystouchesbegan) *property*
* [`delaysTouchesEnded`](#delaystouchesended) *property*

### Specifying Dependencies Between Gesture Recognizers

* [`requireGestureRecognizerToFail`](#requiregesturerecognizertofail)

### Setting and Getting the Delegate

* [`delegate`](#delegate) *property*

### Methods for Subclasses

Below is a list of methods intended to be called or overriden *only* by
subclasses of a `GestureRecognizer`. Clients that merely use concrete subclasses
of `GestureRecognizer` must never call these methods.

* [`touchesBegan`](#touchesbegan)
* [`touchesMoved`](#touchesmoved)
* [`touchesEnded`](#touchesended)
* [`touchesCancelled`](#touchescancelled)
* [`reset`](#reset)
* [`ignoreTouch`](#ignoretouch)
* [`canBePreventedByGestureRecognizer`](#canbepreventedbygesturerecognizer)
* [`shouldRequireFailureOfGestureRecognizer`](#shouldrequirefailureofgesturerecognizer)
* [`shouldBeRequiredToFailByGestureRecognizer`](#shouldberequiredtofailbygesturerecognizer)

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

### `delaysTouchesBegan`

A Boolean value determining whether the receiver delays sending touches in a
begin phase to its view.

#### Discussion

When the value of this property is `false` (the default), views analyze touch
events in `TouchPhaseBegan` and `TouchPhaseMoved` in parallel with the receiver.
When the value of the property is `true`, the window suspends delivery of touch
objects in the `TouchPhaseBegan` phase to the view. If the gesture recognizer
subsequently recognizes its gesture, these touch objects are discarded. If the
gesture recognizer, however, does not recognize its gesture, the window delivers
these objects to the view in a [`touchesBegan`](#touchesbegan) message (and
possibly a follow-up [`touchesMoved`](#touchesmoved) message to inform it of the
touches’ current locations). Set this property to `true` to prevent views from
processing any touches in the `TouchPhaseBegan` phase that may be recognized as
part of this gesture.

### `delaysTouchesEnded`

A Boolean value determining whether the receiver delays sending touches in a end
phase to its view.

#### Discussion

When the value of this property is `true` (the default) and the receiver is
analyzing touch events, the window suspends delivery of touch objects in the
`TouchPhaseEnded` phase to the attached view. If the gesture recognizer
subsequently recognizes its gesture, these touch objects are cancelled (via a
[`touchesCancelled`](#touchescancelled) message). If the gesture recognizer does
not recognize its gesture, the window delivers these objects in an invocation of
the view’s [`touchesEnded`](#touchesended) method. Set this property to `false`
to have touch objects in the `TouchPhaseEnded` delivered to the view while the
gesture recognizer is analyzing the same touches.

### `delegate`

The delegate of the gesture recognizer.

#### Discussion

The gesture recognizer maintains a weak reference to its delegate. The delegate
must adopt the `GestureRecognizerDelegate` protocol and implement one or more of
its methods.

### `enabled`

A Boolean property that indicates whether the gesture recognizer is enabled.

#### Discussion

Disables a gesture recognizers so it does not receive touches. The default value
is `true`. If you change this property to `false` while a gesture recognizer is
currently recognizing a gesture, the gesture recognizer transitions to a
cancelled state.

### `state`

The current state of the gesture recognizer.

#### Discussion

The possible states a gesture recognizer can be in are represented by the
constants of type `GestureRecognizerState`. Some of these states are not
applicable to discrete gestures.

Recognizers for discrete gestures transition from
`GestureRecognizerStatePossible` to `GestureRecognizerStateFailed` or
`GestureRecognizerStateRecognized`. Recognizers for continuous gesture
transition from `GestureRecognizerStatePossible` to these phases in the given
order: `GestureRecognizerStateBegan`, `GestureRecognizerStateChanged`, and
`GestureRecognizerStateEnded`. If, however, they receive a cancellation touch,
they should transition to `GestureRecognizerStateCancelled`. If recognizers for
continuous gestures can’t interpret a multi-touch sequence as their gesture,
they transition to `GestureRecognizerStateFailed`.

### `view`

The view the gesture recognizer is attached to.

#### Discussion

You attach (or add) a gesture recognizer to a view by setting this property.

## Instance Functions

### `addTarget`

Adds a target and an action to a gesture-recognizer object.

`addTarget(target, action)`

#### Arguments

##### `target`

An object that is a recipient of action messages sent by the receiver when the
represented gesture occurs. `null` is not a valid value.

##### `action`

A `String`, representing the name of a function on the `target` object, that is
to be invoked by the action message. `null` is not a valid value.

#### Discussion

You may call this method multiple times to specify target-action pairs. However,
if you request to add a target-action pair that has already been added, then the
request is ignored.

## License

MIT

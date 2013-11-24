# GestureRecognizer

> An abstract base class for concrete gesture-recognizer classes.

`GestureRecognizer` is an abstract base class for concrete gesture-recognizer
classes. A gesture-recognizer object—or, simply, a gesture recognizer—decouples
the logic for recognizing a gesture and acting on that recognition. When one of
these objects recognizes a common gesture or, in some cases, a change in the
gesture, it sends an action message to each designated target object.

The concrete subclasses of `GestureRecognizer` are the following:

* [`TapGestureRecognizer`](https://github.com/multi-touch/tap-gesture-recognizer)
* [`PinchGestureRecognizer`](https://github.com/multi-touch/pinch-gesture-recognizer)
* [`RotationGestureRecognizer`](https://github.com/multi-touch/rotation-gesture-recognizer)
* [`SwipeGestureRecognizer`](https://github.com/multi-touch/swipe-gesture-recognizer)
* [`PanGestureRecognizer`](https://github.com/multi-touch/pan-gesture-recognizer)
* [`ScreenEdgePanGestureRecognizer`](https://github.com/multi-touch/screen-edge-pan-gesture-recognizer)
* [`LongPressGestureRecognizer`](https://github.com/multi-touch/long-press-gesture-recognizer)

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

Initializing a gesture recognizer is done through the native JavaScript object
instantiation process; the `new` operator.

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

* [`cancelsTouchesInView`] *property*
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

### `canBePreventedByGestureRecognizer`

Overridden to indicate that the specified gesture recognizer can prevent the
receiver from recognizing a gesture.

`canBePreventedByGestureRecognizer(preventingGestureRecognizer)`

#### Arguments

##### `preventingGestureRecognizer`

An instance of a subclass of `UIGestureRecognizer`.

#### Return Value

`true` to indicate that `preventingGestureRecognizer` can block the receiver
from recognizing it's gesture, otherwise `false`.

#### Discussion

Overriding these methods enables the same behavior as implementing the
`GestureRecognizerDelegate` methods `shouldBegin` and `shouldReceiveTouch`.
However, by overriding them, subclasses can define class-wide prevention rules.
For example, a `TapGestureRecognizer` object never prevents another
`TapGestureRecognizer` object with a higher tap count.

### `canPreventGestureRecognizer`

Overridden to indicate that the receiver can prevent the specified gesture
recognizer from recognizing its gesture.

`canPreventGestureRecognizer(preventedGestureRecognizer)`

#### Arguments

##### `preventedGestureRecognizer`

An instance of a subclass of UIGestureRecognizer.

#### Return Value

`true` to indicate that the receiver can block `preventedGestureRecognizer` from
recognizing its gesture, otherwise `false`.

#### Discussion

Overriding these methods enables the same behavior as implementing the
`GestureRecognizerDelegate` methods `shouldBegin` and `shouldReceiveTouch`.
However, by overriding them, subclasses can define class-wide prevention rules.
For example, a `TapGestureRecognizer` object never prevents another
`TapGestureRecognizer` object with a higher tap count.

### `ignoreTouch`

Tells the gesture recognizer to ignore a specific touch of the given event.

`ignoreTouch(touch, event)`

#### Arguments

##### `touch`

A `Touch` object that is part of the current multi-touch sequence and associated
with `event`.

##### `event`

A `TouchEvent` object that includes a reference to `touch`.

#### Discussion

If a touch isn't part of this gesture you may pass it to this method, causing it
to be ignored. `GestureRecognizer` does not cancel ignored touches on the
associated view even if `cancelsTouchesInView` is `true`. This method is
intended to be called, not overridden.

### `locationInView`

Returns the point computed as the location in a given view of the gesture
represented by the receiver.

`locationInView(view)`

#### Arguments

##### `view`

A UIView object on which the gesture took place. If no value is specified, it
defaults to the current window.

#### Return Value

A point in the local coordinate system of view that identifies the location of
the gesture. If no value is specified for view, the method returns the gesture
location in the window’s base coordinate system.

#### Discussion

The returned value is a generic single-point location for the gesture.  It is
usually the centroid of the touches involved in the gesture. For objects of the
`SwipeGestureRecognizer` and `TapGestureRecognizer` classes, the location
returned by this method has a significance special to the gesture. This
significance is documented in the reference for those classes.

### `locationOfTouch`

Returns the location of one of the gesture’s touches in the local coordinate
system of a given view.

`locationOfTouch(touchIndex, view)`

#### Arguments

##### `touchIndex`

The index of a `Touch` object in a private array maintained by the receiver.
This touch object represents a touch of the current gesture.

##### `view`

A view object on which the gesture took place. If no value is specified, it
defaults to the current window.

#### Return Value

A point in the local coordinate system of `view` that identifies the location of
the touch. If no specified for view, the method returns the touch location
in the window’s base coordinate system.

### `numberOfTouches`

Returns the number of touches involved in the gesture represented by the
receiver.

`numberOfTouches()`


#### Return Value

The number of `Touch` objects in a private array maintained by the receiver.
Each of these objects represents a touch in the current gesture.


#### Discussion

Using the value returned by this method in a loop, you can ask for the location
of individual touches using the [`locationOfTouch`] method.

### `removeTarget`

Removes a target and an action from a gesture-recognizer object.

`removeTarget(target, action)`

#### Arguments

##### `target`

An object that currently is a recipient of action messages sent by the receiver
when the represented gesture occurs. Specify `null` if you want to remove all
targets from the receiver.

##### `action`

A `String` identifying the name of a function on the `target` object, which is
to be invoked by the action message.  Specify `null` if you want to remove all
actions from the receiver.

#### Discussion

Calling this method removes the specified target-action pair. Passing `null` for
`target` matches all targets and passing `null` for action matches all actions.

### `requireGestureRecognizerToFail`

Creates a dependency relationship between the receiver and another gesture
recognizer.

`requireGestureRecognizerToFail(otherGestureRecognizer)`

#### Arguments

##### `otherGestureRecognizer`

Another gesture-recognizer object (an instance of a subclass of
`GestureRecognizer`).

#### Discussion

This method creates a relationship with another gesture recognizer that delays
the receiver’s transition out of `GestureRecognizerStatePossible`. The state
that the receiver transitions to depends on what happens with
`otherGestureRecognizer`.

* If `otherGestureRecognizer` transitions to `GestureRecognizerStateFailed`, the
  receiver transitions to it's normal next state.
* If `otherGestureRecognizer` transitions to `GestureRecognizerStateRecognized`
  or `GestureRecognizerStateBegan`, the receiver transitions to `GestureRecognizerStateFailed`.

An example where this function might be called is when you want a single-tap
gesture require that a double-tap gesture fail.

### `reset`

Overridden to reset internal state when a gesture is recognized.

`reset()`

#### Discussion

The runtime calls this function after the gesture-recognizer state has been set
to `GestureRecognizerStateEnded` or `GestureRecognizerStateRecognized`.
Subclasses should reset any internal state in preparation for a new attempt at
gesture recognition. After this function is called, the runtime ignores all
remaining touches; that is, the gesture recognizer receives no further updates
for touches that have begun but haven't ended.

### `shouldBeRequiredToFailByGestureRecognizer`

Overridden to indicate that the receiver should be required to fail by the
specified gesture recognizer.

`shouldBeRequiredToFailByGestureRecognizer(otherGestureRecognizer)`

#### Arguments

##### `otherGestureRecognizer`

An instance of a subclass of `GestureRecognizer`.

#### Return Value

`true` to set up the failure requirement; otherwise, `false`.

#### Discussion

Overriding this method allows a subclass to define a class-wide failure
requirement.

### `shouldRequireFailureOfGestureRecognizer`

Overriden to indicate that the receiver requires the specified gesture
recognizer to fail.

`shouldRequireFailureOfGestureRecognizer(otherGestureRecognizer)`

#### Arguments

##### `otherGestureRecognizer`

An instance of a subclass of `GestureRecognizer`.

#### Return Value

`true` to set up the failure requirement; otherwise, `false`.

### Discussion

Overriding this function allows a subclass to define a class-wide failure
requirement.

### `touchesBegan`

Sent to the receiver when one or more fingers touch down in the associated view.

`touchesBegan(touchList, event)`

#### Arguments

##### `touchList`

A `TouchList` object, containing `Touch` instances in the event represented by
`event` that represent the touches in the `TouchPhaseBegan` phase.

##### `event`

A `TouchEvent` object representing the event which the touches belong to.

#### Discussion

Through this function a gesture recognizer receives touch objects (in their
`TouchPhaseBegan` phase) before the view attached to the gesture recognizer
receives them. `GestureRecognizer` objects are not in the responder chain, yet
observe touches hit-tested to their view. After observation, the delivery of
touch objects to the attached view, or their disposition otherwise, is affected
by the `cancelsTouchesInView`, `delaysTouchesBegan`, and `delaysTouchesEnded`
properties.

If the gesture recognizer is interpreting a continuous gesture, it should set
its state to `GestureRecognizerStateBegan` upon receiving this message. If at
any point in its handling of the touch objects the gesture recognizer determines
that the multi-touch event sequence is not its gesture, it should set it state
to `GestureRecognizerStateCancelled`.

### `touchesCancelled`

Sent to the receiver when a system event cancels a touch event.

`touchesCancelled(touchList, event)`

#### Arguments

##### `touchList`

A `TouchList` object, containing `Touch` instances in the event represented by
`event` that represent the touches in the `TouchPhaseCancelled` phase.

##### `event`

A `TouchEvent` object representing the event which the touches belong to.

#### Discussion

Through this function a gesture recognizer receives touch objects (in their
`TouchPhaseCancelled` phase) before the view attached to the gesture recognizer
receives them. UIGestureRecognizer objects are not in the responder chain, yet
observe touches hit-tested to their view. After observation, the delivery of
touch objects to the attached view, or their disposition otherwise, is affected
by the `cancelsTouchesInView`, `delaysTouchesBegan`, and `delaysTouchesEnded`
properties.

Upon receiving this message, the gesture recognizer for a continuous gesture
should set its state to `GestureRecognizerStateCancelled`; a gesture recognizer
for a discrete gesture should set its state to `GestureRecognizerStateFailed`.

### `touchesEnded`

Sent to the receiver when one or more fingers lift from the associated view.

`touchesEnded(touchList, event)`

#### Arguments

##### `touchList`

A `TouchList` object, containing `Touch` instances in the event represented by
`event` that represent the touches in the `TouchPhaseEnded` phase.

##### `event`

A `TouchEvent` object representing the event which the touches belong to.

#### Discussion

Through this function a gesture recognizer receives touch objects (in their
`TouchPhaseEnded` phase) before the view attached to the gesture recognizer
receives them. `GestureRecognizer` objects are not in the responder chain, yet
observe touches hit-tested to their view. After observation, the delivery of
touch objects to the attached view, or their disposition otherwise, is affected
by the `cancelsTouchesInView`, `delaysTouchesBegan`, and `delaysTouchesEnded`
properties.

If the gesture recognizer is interpreting a continuous gesture, it should set
its state to `GestureRecognizerStateEnded` upon receiving this message. If it is
interpreting a discrete gesture, it should set its state to
`GestureRecognizerStateRecognized`. If at any point in its handling of the touch
objects the gesture recognizer determines that the multi-touch event sequence is
not its gesture, it should set it state to `GestureRecognizerStateCancelled`.

### touchesMoved

Sent to the receiver when one or more fingers move in the associated view.

`touchesMoved(touchList, event)`

#### Arguments

##### `touchList`

A `TouchList` object, containing `Touch` instances in the event represented by
`event` that represent the touches in the `TouchPhaseMoved` phase.

##### `event`

A `TouchEvent` object representing the event which the touches belong to.

#### Discussion

Through this function a gesture recognizer receives touch objects (in their
`TouchPhaseMoved` phase) before the view attached to the gesture recognizer
receives them. `GestureRecognizer` objects are not in the responder chain, yet
observe touches hit-tested to their view. After observation, the delivery of
touch objects to the attached view, or their disposition otherwise, is affected
by the `cancelsTouchesInView`, `delaysTouchesBegan`, and `delaysTouchesEnded`
properties.

If the gesture recognizer is interpreting a continuous gesture, it should set
its state to `GestureRecognizerStateChanged` upon receiving this message. If at
any point in its handling of the touch objects the gesture recognizer determines
that the multi-touch event sequence is not its gesture, it should set it state
to `GestureRecognizerStateCancelled`.

## Constants

### `GestureRecognizerState`

The current state a gesture recognizer is in.

#### `GestureRecognizerStatePossible`

The gesture recognizer has not yet recognized its gesture, but may be evaluating
touch events. This is the default state.

#### `GestureRecognizerStateBegan`

The gesture recognizer has received touch objects recognized as a continuous
gesture. It sends its action message (or messages) at the next cycle of the run
loop.

#### `GestureRecognizerStateChanged`

The gesture recognizer has received touches recognized as a change to a
continuous gesture. It sends its action message (or messages) at the next cycle
of the run loop.

#### `GestureRecognizerStateEnded`

The gesture recognizer has received touches recognized as the end of a
continuous gesture. It sends its action message (or messages) at the next cycle
of the run loop and resets its state to `GestureRecognizerStatePossible`.

#### `GestureRecognizerStateCancelled`

The gesture recognizer has received touches resulting in the cancellation of a
continuous gesture. It sends its action message (or messages) at the next cycle
of the run loop and resets its state to `GestureRecognizerStatePossible`.

#### `GestureRecognizerStateFailed`

The gesture recognizer has received a multi-touch sequence that it cannot
recognize as its gesture. No action message is sent and the gesture recognizer
is reset to `GestureRecognizerStatePossible`.

#### `GestureRecognizerStateRecognized`

The gesture recognizer has received a multi-touch sequence that it recognizes as
its gesture. It sends its action message (or messages) at the next cycle of the
run loop and resets its state to `GestureRecognizerStatePossible`.

### Discussion

Gesture recognizers recognize a discrete event such as a tap or a swipe but
don’t report changes within the gesture. In other words, discrete gestures don’t
transition through the Began and Changed states and they can’t fail or be
cancelled.

## License

MIT

## Credits

Apple

[cancelsTouchesInView]: #cancelsTouchesInView

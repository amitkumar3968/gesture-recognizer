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

## License

MIT

Wavvy.js
---

A simple library to draw wavvy waves on HTML canvas using [paper.js](http://paperjs.org/) and [tween.js](https://github.com/tweenjs/tween.js/). Was one of the first things I wrote in JavaScript, so the code quality is pretty meh, but hey it works so here it is.

### How to use

Include a canvas in your page:

```
<canvas id="waves"></canvas>
```

Include jQuery, paper.js, and tween.js:

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.0/jquery.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.10.3/paper-core.js"></script>
```

Include wavvy.js, with your canvas's id and type="text/paperscript":

```
<script src="wave.js" type="text/paperscript" canvas="waves"></script>
```

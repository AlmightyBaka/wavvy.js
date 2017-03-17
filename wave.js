var canvasHeight = view.size.height;
var canvasVerticalCenter = canvasHeight / 2;

var wavesTime = 6500;
var horizontalOffset = 0;

var wavesHeight;
var path;

wave_init(view.size.width);
function wave_init(canvasWidth) {
    var wavesCount;
    var wavesLayers;
    if (canvasWidth >= 760) {
        wavesCount = 4;
        wavesHeight = canvasVerticalCenter / wavesCount;
        wavesLayers = 6;
    }
    if (canvasWidth < 760 && canvasWidth > 460) {
        wavesCount = 3;
        wavesHeight = canvasVerticalCenter / 5;
        wavesLayers = 4;
    } else if (canvasWidth <= 460) {
        wavesCount = 2;
        wavesHeight = canvasVerticalCenter / 5;
        wavesLayers = 4;
    }

    var sectorWidth = canvasWidth / wavesCount;

    var vector = new Point({
        angle: 45,
        length: sectorWidth / 6
    });
    var segments =
        [
            [[horizontalOffset, canvasVerticalCenter], null, vector],
            [[sectorWidth / 2, canvasVerticalCenter], vector.rotate(-180), vector],
            [[sectorWidth - horizontalOffset, canvasVerticalCenter], vector.rotate(180), null]
        ];
    path = new Path({
        segments: segments,
        fullySelected: false, //debug
        strokeWidth: 10,
        strokeColor: '#FFFFFF'
    });

    // render only one segment and then copy it over to make a full wave, increasing perfomance
    var waveSymbol = new Symbol(path);
    // increment wavesLayers to account for first layer not fitting into canvas
    var layerHeight = canvasHeight / (wavesLayers + 1);
    for (var x = 0; x <= canvasWidth; x = x + sectorWidth) {
        for (var y = layerHeight; y < canvasHeight; y = y + layerHeight) {
            waveSymbol.place(new Point(x, y));
            //view.update(); //debug
        }
    }
}

var tweenY = 0;
var tween = new TWEEN.Tween({ x: 0, y: canvasVerticalCenter - wavesHeight})
	.to({ x: 0, y: canvasVerticalCenter + wavesHeight }, wavesTime)
	.onUpdate(function() {
		tweenY = this.y;
	})
	.easing(TWEEN.Easing.Quadratic.InOut)
	.delay(50)
	.repeat(Infinity)
	.yoyo(true)
	.start();

function animate() {
	TWEEN.update();
}

function onFrame() {
	animate();

	var delta = tweenY - view.center.y;
	for (var i = 0; i < path.segments.length - 1; i++) {
		var curve = path.curves[i];
		curve.handle1.y = curve.handle2.y = delta * (i % 2 ? 1 : -1);	
	}
}

var window = $(window);
var width = window.width();
var height = window.height();

setInterval(function () {
    if ((width != window.width()) || (height != window.height())) {
        width = window.width();
        height = window.height();

        project.clear();

        view.size.width = width;
        //console.log(width);
        //console.log(view.size.width);

        wave_init(view.size.width);
    }
}, 300);
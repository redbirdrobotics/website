(function() {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
(function() {
  var fire,
  fireImage,
  canvas;

  function gameLoop () {

    window.requestAnimationFrame(gameLoop);

    fire.update();
    fire.render();
  }

  function sprite (options) {

		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;

		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;

		that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				       tickCount = 0;

                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                }
            }
        };

		that.render = function () {

		  // Clear the canvas
		  that.context.clearRect(0, 0, that.width, that.height);

		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,
		    that.height,
		    0,
		    0,
		    that.width / numberOfFrames,
		    that.height);
		};

		return that;
	}

  // Get canvas
  canvas = document.getElementById("fireAnimation");
  canvas.width = 960;
  canvas.height = 720;

  //Create sprite sheet
  fireImage = new Image();

  // Create sprite
  fire = sprite({
    context: canvas.getContext("2d"),
    width: 23040,
    height: 720,
    image: fireImage,
    numberOfFrames: 24,
    ticksPerFrame: 2
  });

  //Load sprite sheet
  fireImage.addEventListener("load", gameLoop);
  fireImage.src = "assets/images/Fire_sprite.png";

} ());

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
  canvas,
  alpha = 1,
  redBirdAlpha = 0,
  delta = 0.2,
  rxintemp=366,
  rxinfinal=111,
  rxtemp = 243,
  rxfinal = 273,
  brxintemp = 170,
  brxinfinal = 354,
  phase1 = true,
  phase2 = false,
  phase3 = false,
  phase4 = false,
  x1=10,
  x2=520,
  y1=40,
  y2=390,
  rate=7,
  xcenter=265,
  temp1=265,
  temp2=265,
  tempAlpha=1;

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
                if (frameIndex < numberOfFrames) {
                    // Go to the next frame
                    frameIndex += 1;
                }
            }
        };

		that.render = function () {

		  // Clear the canvas
		  that.context.clearRect(0, 0, that.width, that.height);

      if(frameIndex>13){
        ctx = that.context;
        //Draw Border
        ctx.lineWidth = 20;
        ctx.strokeStyle = "white";
        ctx.beginPath();
        if(phase1 == true){
          //line 1
          temp1 = ((temp1-rate>=x1)?temp1-rate:x1);
          ctx.moveTo(xcenter,y1);
          ctx.lineTo(temp1,y1);
          //line 2
          temp2 = ((temp2+rate<=x2)?temp2+rate:x2);
          ctx.moveTo(xcenter,y1);
          ctx.lineTo(temp2,y1);
          //Check if phase1 is over
          if((temp1 == x1) && (temp2 == x2)){
            phase1 = false;
            phase2 = true;
            temp1 = 108;
            temp2 = temp1;
          }
        }else if (phase2 == true) {
          //maintain phase 1
          ctx.moveTo(x1,y1);
          ctx.lineTo(x2,y1);
          //line 1
          temp1 = ((temp1+rate<=(y2+10))?temp1+rate:y2+10);
          ctx.moveTo(x1+10,y1+10);
          ctx.lineTo(x1+10,temp1);
          //line 2
          ctx.moveTo(x2-10,y1+10);
          ctx.lineTo(x2-10,temp1);
          //Check if phase1 is over
          if(temp1 == y2+10){
            phase2 = false;
            phase3 = true;
            temp1=x1;
            temp2=x2;
          }
        }else if (phase3 == true) {
          //maintain phases 1&2
          ctx.moveTo(x1,y1);
          ctx.lineTo(x2,y1);
          ctx.moveTo(x1+10,y1+10);
          ctx.lineTo(x1+10,y2);
          ctx.moveTo(x2-10,y1+10);
          ctx.lineTo(x2-10,y2);
          //line 1
          temp1 = ((temp1+rate<=xcenter)?temp1+rate:xcenter);
          ctx.moveTo(x1+10,y2-10);
          ctx.lineTo(temp1,y2-10);
          //line 2
          temp2 = ((temp2-rate>=xcenter)?temp2-rate:xcenter);
          ctx.moveTo(x2-10,y2-10);
          ctx.lineTo(temp2,y2-10);
          if((temp1 == xcenter) && (temp2 == xcenter)){
            phase3 = false;
            phase4 = true;
          }
        }else if (phase4 == true) {
          //maintain phases
          ctx.moveTo(x1,y1);
          ctx.lineTo(x2,y1);
          ctx.moveTo(x1+10,y1+10);
          ctx.lineTo(x1+10,y2);
          ctx.moveTo(x2-10,y1+10);
          ctx.lineTo(x2-10,y2);
          ctx.moveTo(x1+10,y2-10);
          ctx.lineTo(x2-10,y2-10);
          setTimeout(function () {
            tempAlpha = ((tempAlpha-0.1)>0 ? tempAlpha-0.1 : 0);
            redBirdAlpha = tempAlpha;
            alpha = tempAlpha;
            ctx.globalAlpha = tempAlpha;
            if (alpha == 0){
              canvas.width = 0;
              canvas.height=0;
            }
          }, 500);
        }
        ctx.stroke();
      }
      //Draw Rs
      if(frameIndex>12){
       rxintemp = ((rxintemp-7>=rxinfinal) ? rxintemp-7 : rxinfinal);
       if(rxintemp == rxinfinal){
         rxtemp = ((rxtemp+7<=rxfinal) ? rxtemp+7 : rxfinal);
       }
        that.context.drawImage(
          rImage,
          rxintemp,
          67,
          255,
          301,
          rxtemp,
          99,
          197.625,
          233.275);
        brxintemp = ((brxintemp+4.7<=brxinfinal) ? brxintemp+4.7 : brxinfinal);
        that.context.drawImage(
          brImage,
          brxintemp,
          67,
          255,
          301,
          65,//brxtemp,
          99,
          197.625,
          233.275);
      }

      //Draw Redbird
      if(frameIndex>8){
        if (redBirdAlpha<=1){
          redBirdAlpha += delta;
        }
        that.context.globalAlpha = redBirdAlpha;
        that.context.drawImage(
          redBirdImage,
          190,
          95,
          187.25,
          235.25);
      }

		  // Draw the animation
      that.context.globalAlpha = alpha;
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,
		    that.height,
		    -210,
		    -90,
		    that.width / numberOfFrames,
		    that.height);


		};

		return that;
	}

  // Get canvas
  canvas = document.getElementById("Animation");
  canvas.width = 800; //was 530
  canvas.height = 600; //was 550

  //Create sprite sheet
  fireImage = new Image();
  redBirdImage = new Image();
  rImage = new Image();
  brImage = new Image();

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
  redBirdImage.src = "assets/images/redbird.png";
  rImage.src = "assets/images/R.png";
  brImage.src = "assets/images/Backwards_R.png";

})();

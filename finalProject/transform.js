var rotCanvas;
var rotContext;
var drwCanvas;
var drwContext;
var skwCanvas;
var skwContext;

var image2 = new Image(); // image object to store loaded image
var last_degs = 0;
var last_skew = 50;
var last_scale = 1;
var scale_factor = 1.0;

function initTransform() {
    image2.src = "yellowflowers.png"; // set the image source
    
    rotCanvas = document.getElementById("rotateObj");
    rotContext = rotCanvas.getContext("2d")
    drwCanvas = document.getElementById("scaleImg");
    drwContext = drwCanvas.getContext("2d");
    skwCanvas = document.getElementById("skewText");
    skwContext = skwCanvas.getContext("2d");

    skwContext.font = "bold 30px sans-serif";
    skwContext.textAlign = "center";
    skwContext.lineWidth = 2;
    skwContext.strokeStyle = "navy";

    // Translate origin to center of canvas.
    rotContext.translate(rotCanvas.width / 2, rotCanvas.height / 2);
    skwContext.translate(skwCanvas.width / 2, skwCanvas.height / 2);
    drwContext.translate(drwCanvas.width / 2, drwCanvas.height / 2);
    
    drwContext.drawImage(image2, -100, -100);
    skew(last_skew);
    scale(last_scale);
    rotate(last_degs);
}

function skew(current_skew) {
    var skewX = (last_skew - current_skew) / 100;
    last_skew = current_skew;
    var txt = "HTML5 Canvas";

    skwContext.clearRect(-150, -150, skwCanvas.width, skwCanvas.height); 
    skwContext.transform(1, 0, skewX, 1, 0, 0);
    skwContext.strokeText(txt, 0, 0);
}

function scale(current_scale) {
    var scale_factor = 1.0 + (current_scale - last_scale)/25;
    last_scale = current_scale;
    drwContext.scale(scale_factor, scale_factor);
    drwContext.drawImage(image2, -100, -100);
}

function rotate(current_degs) 
{
    var rotate_offset = current_degs - last_degs;
    last_degs = current_degs;
    
    rotate_offset *= Math.PI / 180;
    
    rotContext.clearRect(-100, -100, 200, 200); 
    rotContext.rotate(rotate_offset);
    rotContext.fillStyle = "lime";
    rotContext.fillRect(-50, -50, 100, 100);
}
         
window.addEventListener( "load", initTransform, false );

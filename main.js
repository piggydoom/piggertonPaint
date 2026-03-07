const paintCanvas = document.getElementById('paintCanvas')
const ctx = paintCanvas.getContext('2d');

let mouseXbeginPoint = "50";
let mouseYbeginPoint = "50";
let paintMode = "default";

var mouseX;
var mouseY;
var mouseHeldDown;

//PAINT FUNCTION =>

paintCanvas.addEventListener("mouseenter", function () {
    mouseXbeginPoint = mouseX;
    mouseYbeginPoint = mouseY;
});

//base mouse coords
function findMouseX(paintCanvas, evt) {
    const paintCanvasPos = paintCanvas.getBoundingClientRect();
    mouseX = evt.clientX - paintCanvasPos.left;
    { return mouseX };
};

function findMouseY(paintCanvas, evt) {
    const paintCanvasPos = paintCanvas.getBoundingClientRect();
    mouseY = evt.clientY - paintCanvasPos.top;
    { return mouseY };
};

paintCanvas.addEventListener("mousemove", function (evt) {
    findMouseX(paintCanvas, evt);
});

paintCanvas.addEventListener("mousemove", function (evt) {
    findMouseY(paintCanvas, evt);
});

//paint mode change
function changePaintMode(mode) {
    console.log(paintMode);
    paintMode = mode;
    console.log(paintMode);
};

//MODES
function paint() {

    //DEFAULT MODE
    if (mouseHeldDown == "true" && paintMode == "default") {
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
        ctx.lineTo(mouseXbeginPoint, mouseYbeginPoint);
        ctx.stroke();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        mouseXbeginPoint = mouseX;
        mouseYbeginPoint = mouseY;
    }

    //LINE MODE
    else if (paintMode == "line") {

        if (mouseHeldDown == "true") {
            mouseXbeginPoint = mouseX;
            mouseYbeginPoint = mouseY;
            ctx.beginPath();
            ctx.moveTo(mouseXbeginPoint, mouseYbeginPoint);
            
            // console.log(mouseX);
        } else{
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
            ctx.moveTo(mouseXbeginPoint, mouseYbeginPoint);
        }
    }
};


document.addEventListener("mousedown", function () {
    mouseHeldDown = "true";

    if (paintMode == "default") {
        mouseXbeginPoint = mouseX;
        mouseYbeginPoint = mouseY;
    }



});

document.addEventListener('mouseup', function () {
    mouseHeldDown = "false";
});

paintCanvas.addEventListener("mousemove", function () {
    // console.log(mouseHeldDown)
    paint();


           });

//  if(mouseHeldDown == "true" ){  
//         console.log(mouseX + "working");
//     };


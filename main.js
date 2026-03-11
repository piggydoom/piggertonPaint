const paintCanvas = document.getElementById('paintCanvas');
const canvasOverlay = document.getElementById('GUIdisplayCanvas');
const canvasWrapper = document.getElementsByClassName('canvasWrapper');
const ctx = paintCanvas.getContext('2d');
const ctxOver = canvasOverlay.getContext('2d');

let mouseXbeginPoint = "50";
let mouseYbeginPoint = "50";
let paintMode = "base";
let firstPointDefined = false;

var mouseX;
var mouseY;
var mouseHeldDown;
var lastPreviewLineX;
var lastPreviewLineY;
var hoverOverCanvas;

ctx.lineCap = "round";
ctx.lineJoin = "round";
ctxOver.lineCap = "round";
ctxOver.lineJoin = "round";

//

canvasOverlay.addEventListener("mouseenter", () => {
    if (paintMode == "base", () => {
        mouseXbeginPoint = mouseX;
        mouseYbeginPoint = mouseY;
    });
    hoverOverCanvas = true;
});

canvasOverlay.addEventListener('mouseleave', () => {
    hoverOverCanvas = false;
});

//paint mode change
function changePaintMode(mode) {
    paintMode = mode;
    console.log(firstPointDefined);
    console.log(paintMode);
};


//PREVIEW DISP
function overlayUpdate() {

    if (paintMode == "line" && firstPointDefined == true) {
        ctxOver.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
        ctxOver.beginPath();
        ctxOver.moveTo(mouseXbeginPoint, mouseYbeginPoint);
        ctxOver.lineTo(mouseX, mouseY);
        ctxOver.stroke();
        ctxOver.closePath();
    }
    else if (paintMode == "base" && hoverOverCanvas == true) {
        ctxOver.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
        ctxOver.beginPath();
        ctxOver.arc(mouseX, mouseY, thickness / 2, 0, 2 * Math.PI);
        ctxOver.stroke();

        ctxOver.fill();
        ctxOver.closePath();
    }
};


//BASE MODE
function paint() {
    if (mouseHeldDown == "true" && paintMode == "base") {
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
        ctx.lineTo(mouseXbeginPoint, mouseYbeginPoint);
        ctx.stroke();
        mouseXbeginPoint = mouseX;
        mouseYbeginPoint = mouseY;
    }
};

//LINE MODE
canvasOverlay.addEventListener('mousedown', () => {

    if (paintMode == "line" && firstPointDefined != true) {
        console.log("first point made");
        mouseXbeginPoint = mouseX;
        mouseYbeginPoint = mouseY;
        ctx.beginPath();
        ctx.moveTo(mouseXbeginPoint, mouseYbeginPoint);
        firstPointDefined = true;
    } else if (paintMode == "line" && firstPointDefined == true) {

        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
        ctx.moveTo(mouseXbeginPoint, mouseYbeginPoint);
        firstPointDefined = false;
    }
});

//CIRCLE DRAW MODE


//MOUSE COOORDINATES
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

//EVENT LISTENERS
document.addEventListener("mousemove", () => {
    if (hoverOverCanvas == false) {
        ctxOver.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
    }
});

document.addEventListener("mousedown", () => {
    mouseHeldDown = "true";

    if (paintMode == "base") {
        mouseXbeginPoint = mouseX;
        mouseYbeginPoint = mouseY;
    }
});

document.addEventListener('mouseup', () => {
    mouseHeldDown = "false";
});

canvasOverlay.addEventListener("mousemove", (evt) => {
    findMouseX(paintCanvas, evt);
    findMouseY(paintCanvas, evt);

    paint();
    overlayUpdate();
});


//REPORT
document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        event.preventDefault();
        // console.log("mouse coords= " + mouseX, mouseY);
        // console.log("lastPreviewLine coords= " + lastPreviewLineX, lastPreviewLineY);
        // console.log("hoverOverCanvas= " + hoverOverCanvas);
        // console.log("paintMode= " + paintMode);

    }
});
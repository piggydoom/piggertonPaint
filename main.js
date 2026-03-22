const paintCanvas = document.getElementById('paintCanvas');
const canvasOverlay = document.getElementById('GUIdisplayCanvas');
const canvasWrapper = document.getElementsByClassName('canvasWrapper');
const selectionBoxCanvas = document.getElementById('selectionBoxCanvas');
const ctx = paintCanvas.getContext('2d');
const ctxOver = canvasOverlay.getContext('2d');
const ctxSelectionBox = selectionBoxCanvas.getContext('2d');

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
var cRadius;
var fillShapeToggle;

//immediant ctx/ctxOver stylings called in b&c.js

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
    } else if (paintMode == "circle" && firstPointDefined == true) {

        cRadius = Math.sqrt((mouseXbeginPoint - mouseX) ** 2 + (mouseYbeginPoint - mouseY) ** 2);
        ctxOver.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
        ctxOver.beginPath();
        ctxOver.arc(mouseXbeginPoint, mouseYbeginPoint, 1, 0, 2 * Math.PI);
        ctxOver.moveTo(mouseXbeginPoint, mouseYbeginPoint);
        ctxOver.lineTo(mouseX, mouseY);
        ctxOver.stroke();
        ctxOver.beginPath();
        ctxOver.arc(mouseXbeginPoint, mouseYbeginPoint, cRadius, 0, 2 * Math.PI);
        ctxOver.stroke();
        ctxOver.closePath();
    }
    else if (paintMode == "rect" && firstPointDefined == true) {
        ctxOver.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
        ctxOver.beginPath();
        ctxOver.moveTo(mouseXbeginPoint, mouseYbeginPoint);
        ctxOver.strokeRect(mouseXbeginPoint, mouseYbeginPoint, mouseX - mouseXbeginPoint, mouseY - mouseYbeginPoint);
        ctxOver.stroke();
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

//SHAPE DRAW MODES
canvasOverlay.addEventListener('mousedown', () => {

    //LINE MODE
    if (paintMode == "line" && firstPointDefined != true) {
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

    //CIRCLE MODE
    if (paintMode == "circle" && firstPointDefined != true) {
        mouseXbeginPoint = mouseX;
        mouseYbeginPoint = mouseY;
        ctx.moveTo(mouseXbeginPoint, mouseYbeginPoint);
        ctx.beginPath();
        firstPointDefined = true;

    } else if (paintMode == "circle" && firstPointDefined == true) {
        //cRadius is defined in the update function
        ctx.arc(mouseXbeginPoint, mouseYbeginPoint, cRadius, 0, 2 * Math.PI);
        if (fillShapeToggle == true) { ctx.fill() };
        ctx.stroke();
        ctx.closePath();
        ctxOver.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
        firstPointDefined = false;
    }

    //RECT MODE
    if (paintMode == "rect" && firstPointDefined != true) {
        console.log(ctxOver.strokeStle);
        mouseXbeginPoint = mouseX;
        mouseYbeginPoint = mouseY;
        firstPointDefined = true;
    } else if (paintMode == "rect" && firstPointDefined == true) {
        ctx.strokeRect(mouseXbeginPoint, mouseYbeginPoint, mouseX - mouseXbeginPoint, mouseY - mouseYbeginPoint);
        if (fillShapeToggle == true) { ctx.fillRect(mouseXbeginPoint, mouseYbeginPoint, mouseX - mouseXbeginPoint, mouseY - mouseYbeginPoint) };
        firstPointDefined = false;
    }
});



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
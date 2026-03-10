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

//PAINT FUNCTION =>

canvasOverlay.addEventListener("mouseenter", function () {
    hoverOverCanvas = true;
    mouseXbeginPoint = mouseX;
    mouseYbeginPoint = mouseY;
});

canvasOverlay.addEventListener('mouseleave', function(){
    hoverOverCanvas = false;
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

canvasOverlay.addEventListener("mousemove", function (evt) {
    findMouseX(paintCanvas, evt);
});

canvasOverlay.addEventListener("mousemove", function (evt) {
    findMouseY(paintCanvas, evt);
});

//paint mode change
function changePaintMode(mode) {
    // console.log(paintMode);
    paintMode = mode;
    console.log(firstPointDefined);
    console.log(paintMode);
};

//PREVIEW DISP
function drawPreviewLine(){
        if (firstPointDefined == true) {

            ctxOver.beginPath();
            ctxOver.moveTo(mouseXbeginPoint, mouseYbeginPoint);
            
            if(lastPreviewLineX != undefined){
                ctxOver.strokeStyle = 'rgb(255, 255, 255)';
                ctxOver.lineWidth = thickness + 50;
                ctxOver.lineTo(lastPreviewLineX, lastPreviewLineY);
                ctxOver.stroke();
                ctxOver.closePath();

                ctxOver.beginPath();
                ctx.lineWidth = thickness;
                ctxOver.moveTo(mouseXbeginPoint, mouseYbeginPoint);
                ctxOver.strokeStyle = 'rgba(' + R + ',' + G + ',' + B + ',' + 255 + ')';
            };

            lastPreviewLineX = mouseX;
            lastPreviewLineY = mouseY;
         
            ctxOver.lineTo(mouseX, mouseY);
            ctxOver.stroke();
            ctxOver.closePath();
        } 
    };

//MODES
function paint() {

    //DEFAULT MODE
    if (mouseHeldDown == "true" && paintMode == "base") {
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
    // else if (paintMode == "line") {

        
    // }
};


document.addEventListener("mousedown", function () {
    mouseHeldDown = "true";

    if (paintMode == "base") {
        mouseXbeginPoint = mouseX;
        mouseYbeginPoint = mouseY;
    }



});

document.addEventListener('mouseup', function () {
    mouseHeldDown = "false";

});

canvasOverlay.addEventListener("mousemove", function() {
    paint();
      console.log(firstPointDefined);

    if(paintMode == "line"){ 
    drawPreviewLine();    
}

});


//line mode point #1
canvasOverlay.addEventListener('mousedown', function () {
    
    if (paintMode == "line" && firstPointDefined != true) {
        console.log("first point made");
        mouseXbeginPoint = mouseX;
        mouseYbeginPoint = mouseY;
        ctx.beginPath();
        ctx.moveTo(mouseXbeginPoint, mouseYbeginPoint);
        firstPointDefined = true;
    } else if(paintMode == "line" && firstPointDefined == true){

            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
            ctx.moveTo(mouseXbeginPoint, mouseYbeginPoint);
            firstPointDefined = false;



    }
}
);

document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        event.preventDefault(); // Prevent default action (e.g., page scrolling)
        console.log("mouse coords= "+ mouseX, mouseY);
        console.log("lastPreviewLine coords= " + lastPreviewLineX, lastPreviewLineY);

    }
});
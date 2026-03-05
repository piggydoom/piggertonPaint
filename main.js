const paintCanvas = document.getElementById('paintCanvas')
const ctx = paintCanvas.getContext('2d');    

let brushSize = "10";
let mouseXbeginPoint = "50";
let mouseYbeginPoint = "50";

var mouseX;
var mouseY;
var hoverOverCanvasW;

//PAINT FUNCTION =>

paintCanvas.addEventListener("mouseenter", function(){
     hoverOverCanvas = "true";
     mouseXbeginPoint = mouseX;
     mouseYbeginPoint = mouseY;
    //  console.log("over");
});

paintCanvas.addEventListener("mouseleave", function(){
    //  console.log("not over")
     hoverOverCanvas = "false";
});

//base mouse coords
function findMouseX(paintCanvas, evt){
const paintCanvasPos = paintCanvas.getBoundingClientRect(); 
    mouseX = evt.clientX - paintCanvasPos.left;
    {return mouseX};
};

function findMouseY(paintCanvas, evt){
const paintCanvasPos = paintCanvas.getBoundingClientRect(); 
    mouseY = evt.clientY - paintCanvasPos.top;
    {return mouseY};    
};

paintCanvas.addEventListener("mousemove", function(evt){
    findMouseX(paintCanvas, evt);
    });

paintCanvas.addEventListener("mousemove", function(evt){
    findMouseY(paintCanvas, evt)
});

function paint(){
     if (hoverOverCanvas == "true"){
        ctx.lineWidth = brushSize;
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
        ctx.lineTo(mouseXbeginPoint, mouseYbeginPoint);
        ctx.stroke();
        mouseXbeginPoint = mouseX;
        mouseYbeginPoint = mouseY;
     };
};

paintCanvas.addEventListener("mousemove", function(){
    paint();
});


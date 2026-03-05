const colourChange = document.getElementById("colourWheel");
const colourSelWindow = document.getElementById("colourSel");
const RGB1 = document.getElementById('RGB1');
const RGB2 = document.getElementById('RGB2');
const RGB3 = document.getElementById('RGB3');
const paintCanvas = document.getElementById('paintCanvas')
const ctx = paintCanvas.getContext('2d');    

let R = RGB1.value;
let G = RGB2.value;
let B = RGB3.value;
let colourSelDisplay = "none";
let brushSize = "10";
let mouseXbeginPoint = "50";
let mouseYbeginPoint = "50";

var mouseX;
var mouseY;
var hoverOverCanvasW;

//COLOUR PICKER CODE

function openColourPicker(){
 console.log("open");
 openColourSel();
};

function changeStateColourPicker(){
if(colourSelDisplay === "none"){
     colourSelWindow.style.display = "inline";
     console.log("changeState init, determined to be none and attempted to show.");
     RGB1.style.display = "inline";
     RGB2.style.display = "inline";
     RGB3.style.display = "inline";
     colourSelDisplay = "inline";
} else{
colourSelWindow.style.display = "none";
console.log("changeState init, determined to be show and attempted to hide.");
colourSelDisplay = "none";
RGB1.style.display = "none";
RGB2.style.display = "none";
RGB3.style.display = "none";
};
};

function colourSelWindowChange(){
     console.log("RGB val change detected")
     
     let R = RGB1.value;
     let G = RGB2.value;
     let B = RGB3.value;

     colourSelWindow.style.backgroundColor = 'rgb(' + R + ',' + G + ',' + B + ')';
     console.log("R" + R + " G" + G + " B" + B);
};

colourChange.addEventListener("click", changeStateColourPicker);

RGB1.addEventListener('input', colourSelWindowChange);
RGB2.addEventListener('input', colourSelWindowChange);
RGB3.addEventListener('input', colourSelWindowChange);


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

    // const mouseX = findMouseX(paintCanvas, paint);
    // const mouseY = findMouseY(paintCanvas, paint);

function paint(){
     if (hoverOverCanvas == "true"){

        // console.log("mouseX= " + mouseX + " | mouse Y= " + mouseY);
        // console.log("mouseXbeginPoint= " + mouseXbeginPoint + " | mouse Y begin point= " + mouseYbeginPoint);
          
        ctx.lineWidth = brushSize;
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
        ctx.lineTo(mouseXbeginPoint, mouseYbeginPoint);
        ctx.stroke();
        mouseXbeginPoint = mouseX;
        mouseYbeginPoint = mouseY;



     };
};


// setInterval(() => {
    
//     paint();

// }, 1);

paintCanvas.addEventListener("mousemove", function(){
    // console.log("MOUSEMOVE")
    paint();
});


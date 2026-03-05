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

// //mouseX
// paintCanvas.addEventListener('mousemove', function(event) {
//   let mouseX = event.pageX;
//   console.log('Mouse X position (document):', mouseX);
// });

// //mouseY
// paintCanvas.addEventListener('mousemove', function(event) {
//   let mouseY = event.pageY;
//   console.log('Mouse Y position (document):', mouseY);
// });

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


paintCanvas.addEventListener("mouseenter", function(){
     hoverOverCanvas = "true";
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

//begin points
// function findMouseXbeginPoint(paintCanvas, evt){
// const paintCanvasPos = paintCanvas.getBoundingClientRect(); 
//     mouseXbeginPoint = evt.clientX - paintCanvasPos.left;
//     {return mouseXbeginPoint};
// };

// function findMouseYbeginPoint(paintCanvas, evt){
// const paintCanvasPos = paintCanvas.getBoundingClientRect(); 
//     mouseYbeginPoint = evt.clientY - paintCanvasPos.top;
//     {return mouseYbeginPoint};    
// };

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
          
        ctx.lineWidth = 10;
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

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        console.log('Spacebar pressed!');
        
        console.log("mouseX= " + mouseX + " | mouse Y= " + mouseY);
        console.log("mouseXbeginPoint= " + mouseXbeginPoint + " | mouse Y begin point= " + mouseYbeginPoint);

    }
});



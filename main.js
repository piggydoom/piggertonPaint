const colourChange = document.getElementById("colourWheel");
const colourSelWindow = document.getElementById("colourSel");
const RGB1 = document.getElementById('RGB1');
const RGB2 = document.getElementById('RGB2');
const RGB3 = document.getElementById('RGB3');
const paintCanvas = document.getElementById('paintCanvas')
let R = RGB1.value;
let G = RGB2.value;
let B = RGB3.value;
let colourSelDisplay = "none";
let hoverOverCanvas;

colourChange.onload = console.log("test");

// function openColourSel(){
//  colourSelWindow.style.display = "flex";
// };

function openColourPicker(){
 console.log("open");
 openColourSel();
};

// function closeColourPicker(){
// colourSelWindow.style.display = "none";
// };

// function resizeCanvas(){
// screen.width = window.innerWidth;
// screen.height = window.innerHeight;
// };

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
     hoverOverCanvas = true;
});

paintCanvas.addEventListener("mouseenter", function(){
     hoverOverCanvas = false;
});


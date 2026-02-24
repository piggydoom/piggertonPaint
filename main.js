const colourChange = document.getElementById("colourWheel");
const colourSelWindow = document.getElementById("colourSel");
const headerCanvas = document.getElementById("headerCanvas");
const ctx = headerCanvas.getContext('2d');
const RGB1 = document.getElementById('RGB1');
const RGB2 = document.getElementById('RGB2');
const RGB3 = document.getElementById('RGB3');
let colourSelDisplay = "none";


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
     colourSelWindow.style.display = "flex";
     console.log("changeState init, determined to be none and attempted to show.");
     colourSelDisplay = "flex";
     RGB1.style.display = "inline";
     RGB2.style.display = "inline";
     RGB3.style.display = "inline";
     ctx.fillRect((RGB3.style.x + 4), (RGB3.style.y), 10, 10);
} else{
colourSelWindow.style.display = "none";
console.log("changeState init, determined to be show and attempted to hide.");
colourSelDisplay = "none";
RGB1.style.display = "none";
RGB2.style.display = "none";
RGB3.style.display = "none";
};
};



colourChange.addEventListener("click", changeStateColourPicker);


function resizeCanvas() {
  headerCanvas.width = canvas.offsetWidth;
  headerCanvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
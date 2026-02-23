const colourChange = document.getElementById("colourWheel");
const colourSelWindow = document.getElementById("colourSel");
// let colourSelComputedStyle = window.getComputedStyle(colourSelWindow);  
// const colourSelWindowDisplay = colourSelComputedStyle.display;
// let colourSelDisplay = window.getComputedStyle(colourSelWindow).display;
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

function changeStateColourPicker(){
if(colourSelDisplay === "none"){
     colourSelWindow.style.display = "flex";
     console.log("changeState init, determined to be none and attempted to show.");
     colourSelDisplay = "flex";
} else{
colourSelWindow.style.display = "none";
console.log("changeState init, determined to be show and attempted to hide.");
colourSelDisplay = "none";
};

};

colourChange.addEventListener("click", changeStateColourPicker)
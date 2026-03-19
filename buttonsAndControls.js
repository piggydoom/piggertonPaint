const colourChange = document.getElementById("colourWheel");
const colourSelWindow = document.getElementById("colourSel");
const thicknessChange = document.getElementById("brushSize");
const thicknessVal = document.getElementById("thicknessVal");
const RGB1 = document.getElementById('RGB1');
const RGB2 = document.getElementById('RGB2');
const RGB3 = document.getElementById('RGB3');
const clearCanvasButton = document.getElementById('resetCanvasButton');
const lineDraw = document.getElementById('lineDraw');
const baseDraw = document.getElementById('baseDraw');
const bStyle1 = document.querySelectorAll(".bStyle1");
const circleDraw = document.getElementById('circleDraw');
const rectDraw = document.getElementById('rectDraw');
const fillShape = document.getElementById('fillShapeVal');
const fillShapeWindow = document.getElementById('fillShape');
const optionWindowElementsArray = Array.from(document.querySelector(".optionWindow").children);

const hueSlider = document.getElementById('hueSlider');

// let R = RGB1.value;
// let G = RGB2.value;
// let B = RGB3.value;

let thickness = thicknessVal.value;
let colourSelDisplay = "none";
let thicknessSelDisplay = "none";
let fillShapeSelDisplay = "none";
let CSBhue = 0;

var pixelData;
var SBCPixelPosX;
var SBCPixelPosY;
let CSBsaturation = 100;
let CSBluminescence = 100;
var iRow;

function clearInputField(fieldID, setTo) {
     document.getElementById(fieldID).value = setTo;
};

window.onload = clearInputField("RGB1", 255);
window.onload = clearInputField("RGB2", 90);
window.onload = clearInputField("RGB3", 90);

window.onload = clearInputField("hueSlider", 0);
// colourSelWindowChange();

window.onload = clearInputField("thicknessVal", 15);
thicknessUpdate();

//COLOUR SEL
// function openColourPicker() {
//      console.log("open");
//      openColourSel();
// };

function hideAllandShow(show, showDisplay){
     optionWindowElementsArray.forEach(item => {
          if(getComputedStyle(item).display != "none" && item != show){item.style.display = "none"}
          if(getComputedStyle(item).display == "none" && item == show){item.style.display = showDisplay};
    });
};

// function colourSelWindowChange() {
//      R = RGB1.value;
//      G = RGB2.value;
//      B = RGB3.value;
//      ctx.strokeStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
//      ctx.fillStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
//      ctxOver.strokeStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
//      colourSelWindow.style.backgroundColor = 'rgb(' + R + ',' + G + ',' + B + ')';
// };

function thicknessUpdate() {
     thickness = thicknessVal.value;
     ctx.lineWidth = thickness;
     ctxOver.lineWidth = thickness;
};

function resetLinearGradientCSB(){
     //reset
     // ctxSelectionBox.fillStyle = 'rgba(0,0,0,0)'
     // ctxSelectionBox.fillRect(0, 0, selectionBoxCanvas.width, selectionBoxCanvas.height);
     //let i = 0; i < (selectionBoxCanvas.width / 5) * (selectionBoxCanvas.height / 5); i++ for loop
     ctxSelectionBox.moveTo(selectionBoxCanvas.width, 0);
     SBCPixelPosX = 0;
     SBCPixelPosY = 0;
     CSBsaturation = 0;

     while(SBCPixelPosY <= selectionBoxCanvas.height){
          
          if(SBCPixelPosX < selectionBoxCanvas.width){
          // x
          // console.log(ctxSelectionBox.fillStyle = 'HSL(' + CSBhue + ',' + CSBsaturation + '%,' + CSBluminescence +'%)');
          // console.log(SBCPixelPosX + " " + SBCPixelPosY);   
          ctxSelectionBox.fillStyle = 'HSL(' + CSBhue + ',' + CSBsaturation + '%,' + CSBluminescence +'%)';
          ctxSelectionBox.fillRect(SBCPixelPosX, SBCPixelPosY, 5, 5);
          SBCPixelPosX = SBCPixelPosX + 5;
          CSBsaturation = CSBsaturation + (100 / 60);
          
          // console.log("irow=" + iRow);
          } else if(SBCPixelPosX >= selectionBoxCanvas.width){
               SBCPixelPosX = 0;
               SBCPixelPosY = SBCPixelPosY + 5;
               CSBluminescence = CSBluminescence - (100 / 300); 
               console.log(SBCPixelPosY);
          };
          
     };
};

window.onload = () => {
     resetLinearGradientCSB();
};

//eventlisteners

// RGB1.addEventListener('input', colourSelWindowChange);
// RGB2.addEventListener('input', colourSelWindowChange);
// RGB3.addEventListener('input', colourSelWindowChange);

thicknessVal.addEventListener('input', thicknessUpdate);
fillShape.addEventListener('input', () => {fillShapeToggle = fillShape.checked; console.log(fillShapeToggle)});

// colourChange.addEventListener("click", () => {
//      hideAllandShow(colourSelWindow, "inline");
//           colourSelWindow.style.display = "inline";
//           RGB1.style.display = "inline";
//           RGB2.style.display = "inline";
//           RGB3.style.display = "inline";
// });

hueSlider.addEventListener('input', () => {
// console.log("hue-rotate(" + hueSlider.value + "deg)");
CSBhue = hueSlider.value;
resetLinearGradientCSB()

// findMouseXColourSel(selectionBoxCanvas, evt);
// findMouseYColourSel(selectionBoxCanvas, evt);
console.log(selectedX);
});

thicknessChange.addEventListener("click", () => {
     hideAllandShow(thicknessVal, "inline");
});

clearCanvasButton.addEventListener('click', function () {
     ctx.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
});

lineDraw.addEventListener('click', () => { 
     changePaintMode("line"); 
     fillShapeWindow.style.display = "none";
});

baseDraw.addEventListener('click', () => { 
     changePaintMode("base");
     fillShapeWindow.style.display = "none";
 });

circleDraw.addEventListener('click', () => { 
     changePaintMode("circle");
     hideAllandShow(fillShapeWindow, "block");
});

rectDraw.addEventListener('click', () => { 
     changePaintMode("rect");
     hideAllandShow(fillShapeWindow, "block");
});

bStyle1.forEach(btn => {
     btn.addEventListener("click", () => {

          bStyle1.forEach(b => b.ariaPressed = "false");
          btn.ariaPressed = btn.ariaPressed = "true";

     });
});

selectionBoxCanvas.addEventListener('mousedown', (evt) => {
     findMouseXColourSel(selectionBoxCanvas, evt);
     findMouseYColourSel(selectionBoxCanvas, evt);
     console.log("y= " + selectedY);
     console.log("x= " + selectedX);

     pixelData = ctxSelectionBox.getImageData(selectedX, selectedY, 1, 1).data;

     const R = pixelData[0];   // Red component
     const G = pixelData[1]; // Green component
     const B = pixelData[2];  // Blue component
     const A = pixelData[3]; // Alpha component (transparency)

     //find the RGB values based upon the percentage across the field the selected x/y is and matching that to the percentage of 255 to fix the saturation but still get the colour from getimagedata
     saturationMultiplyFactor = 1+ selectedY / 120;
     console.log(saturationMultiplyFactor);

     ctx.strokeStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
     ctxOver.fillStyle = 'rgb(' + R + ',' + G + ',' + B +')';
     console.log('rgb(' + R + ',' + G + ',' + B +')');
     ctxOver.fillRect(50, 50, 40, 40);
});

function findMouseXColourSel(selectionBoxCanvas, evt) {
    const selectionBoxCanvasPos = selectionBoxCanvas.getBoundingClientRect();
    selectedX = evt.clientX - selectionBoxCanvasPos.left;
    { return selectedX };
};

function findMouseYColourSel(selectionBoxCanvas, evt) {
    const selectionBoxCanvasPos = selectionBoxCanvas.getBoundingClientRect();
    selectedY = evt.clientY- selectionBoxCanvasPos.top;
    { return selectedY };
};


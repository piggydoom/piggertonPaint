const colourIDinput = document.getElementById("colourIDinput");
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
const hueSlider = document.getElementById('hueSlider');
const optionWindowElementsArray = Array.from(document.querySelector(".optionWindow").children);
const RGBinputElements = Array.from(document.querySelectorAll(".RGBinputs"));

let thickness = thicknessVal.value;
let colourSelDisplay = "none";
let thicknessSelDisplay = "none";
let fillShapeSelDisplay = "none";
let SBChue = 0;
let saturationValue = 100;
let lumenValue = 68;
let selectedX = 81;
let selectedY = 9;

var SBCPixelPosX;
var SBCPixelPosY;
let SBCsat = 100;
let SBClumen = 100;

function clearInputField(fieldID, setTo) {
     document.getElementById(fieldID).value = setTo;
};

function hideAllandShow(show, showDisplay){
     optionWindowElementsArray.forEach(item => {
          if(getComputedStyle(item).display != "none" && item != show){item.style.display = "none"}
          if(getComputedStyle(item).display == "none" && item == show){item.style.display = showDisplay};
    });
};

function thicknessUpdate() {
     thickness = thicknessVal.value;
     ctx.lineWidth = thickness;
     ctxOver.lineWidth = thickness;
};

function resetLinearGradientCSB(){
     SBCPixelPosX = 0;
     SBCPixelPosY = 0;
     SBCsat = 0;
     let SBCBaseLumen = 100;
     let jumps 
     SBClumen = SBCBaseLumen;

     ctxSelectionBox.clearRect(0,0, selectionBoxCanvas.width, selectionBoxCanvas.height);

     

     while(SBCPixelPosY <= selectionBoxCanvas.height){
          
          if(SBCPixelPosX < selectionBoxCanvas.width){ 
          ctxSelectionBox.fillStyle = 'HSL(' + SBChue + ',' + SBCsat + '%,' + SBClumen +'%)';
          ctxSelectionBox.fillRect(SBCPixelPosX, SBCPixelPosY, 1, 1);
          SBCPixelPosX = SBCPixelPosX + 1;
          SBCsat = SBCsat + (100 / (selectionBoxCanvas.width / 1));
          SBClumen = SBClumen - (50 / (selectionBoxCanvas.width / 1));
          } else if(SBCPixelPosX >= selectionBoxCanvas.width){
               SBCPixelPosX = 0;
               SBCPixelPosY = SBCPixelPosY + 1;
               SBCBaseLumen = SBCBaseLumen - (100 / (selectionBoxCanvas.height / 1));
               SBCsat = 0;
               SBClumen = SBCBaseLumen; 
          };
     };
     ctxSelectionBox.strokeStyle = 'rgb(255,255,255)'
     ctxSelectionBox.beginPath();
     ctxSelectionBox.arc(selectedX, selectedY, 2, 0, 2 * Math.PI);
     ctxSelectionBox.stroke();
};

//find mouse X, Y coords relative to inside the colour selection box
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

//immediant function calls
window.addEventListener('load', () => {
     resetLinearGradientCSB();
     clearInputField("RGB1", 255);
     clearInputField("RGB2", 90);
     clearInputField("RGB3", 90);
     clearInputField("hueSlider", 0);
     clearInputField("thicknessVal", 15);
     thicknessUpdate();

     ctx.fillStyle = 'rgb(255, 90, 90)';
     ctxOver.fillStyle= 'rgb(255, 90, 90)';
     ctx.strokeStyle = 'rgb(255, 90, 90)';
     ctxOver.strokeStyle = 'rgb(255, 90, 90)';
     ctx.lineCap = "round";
     ctx.lineJoin = "round";
     ctxOver.lineCap = "round";
     ctxOver.lineJoin = "round";
});

function rgbToHue(r, g, b) {
  // Convert R, G, B to the range 0-1
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h;
  let d = max - min; // Chroma

  if (max === min) {
    h = 0; // Achromatic case (gray, white, black)
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = 2 + (b - r) / d;
        break;
      case b:
        h = 4 + (r - g) / d;
        break;
    }
    h *= 60; // Convert to degrees
  }
  
  return h; // Hue value in degrees (0-360)
};

function valueInputLimCheck(inputID, min, max){
const field = document.getElementById(inputID);

if(field.value > max){
     field.value = max;
};

if(field.value < min){
     field.value = min;
};
}

//button click and input change listeners
thicknessVal.addEventListener('input', thicknessUpdate);
fillShape.addEventListener('input', () => {fillShapeToggle = fillShape.checked; console.log(fillShapeToggle)});

hueSlider.addEventListener('input', () => {
SBChue = hueSlider.value;
resetLinearGradientCSB();
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

colourIDinput.addEventListener('click', () => {
     hideAllandShow();
     RGB1.style.display = "inline";
     RGB2.style.display = "inline";
     RGB3.style.display = "inline";
});

RGBinputElements.forEach(inputElement => {
     inputElement.addEventListener('input', () => {
          valueInputLimCheck(inputElement.id, 0, 255);

          R = RGB1.value;
          G = RGB2.value;
          B = RGB3.value;

          ctx.strokeStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
          ctx.fillStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
          ctxOver.fillStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
          ctxOver.strokeStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
          SBChue = rgbToHue(R, G, B);
          hueSlider.value = rgbToHue(R, G, B);
          resetLinearGradientCSB();
          
     });
});



//colour selection box events onclick
selectionBoxCanvas.addEventListener('mousedown', (evt) => {
     findMouseXColourSel(selectionBoxCanvas, evt);
     findMouseYColourSel(selectionBoxCanvas, evt);

     saturationValue = selectedX / 1.2;
     lumenValue = (100 - selectedX / 1.2 / 2 - selectedY / 1.2);

     ctx.strokeStyle = 'HSL(' + SBChue + ',' + saturationValue + '%,' + lumenValue +'%)';
     ctx.fillStyle = 'HSL(' + SBChue + ',' + saturationValue + '%,' + lumenValue +'%)';
     ctxOver.fillStyle = 'HSL(' + SBChue + ',' + saturationValue + '%,' + lumenValue +'%)';
     ctxOver.strokeStyle = 'HSL(' + SBChue + ',' + saturationValue + '%,' + lumenValue +'%)';  
     resetLinearGradientCSB();
});





//button styling
bStyle1.forEach(btn => {
     btn.addEventListener("click", () => {

          bStyle1.forEach(b => b.ariaPressed = "false");
          btn.ariaPressed = btn.ariaPressed = "true";

     });
});
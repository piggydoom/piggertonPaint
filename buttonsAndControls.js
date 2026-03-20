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

let thickness = thicknessVal.value;
let colourSelDisplay = "none";
let thicknessSelDisplay = "none";
let fillShapeSelDisplay = "none";
let CSBhue = 0;
let saturationValue = 100;
let lumenValue = 68;

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

window.onload = clearInputField("thicknessVal", 15);
thicknessUpdate();

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
     CSBsaturation = 0;
     let SBCBaseLumen = 100;
     CSBluminescence = SBCBaseLumen;

     while(SBCPixelPosY <= selectionBoxCanvas.height){
          
          if(SBCPixelPosX < selectionBoxCanvas.width){ 
          ctxSelectionBox.fillStyle = 'HSL(' + CSBhue + ',' + CSBsaturation + '%,' + CSBluminescence +'%)';
          ctxSelectionBox.fillRect(SBCPixelPosX, SBCPixelPosY, 5, 5);
          SBCPixelPosX = SBCPixelPosX + 5;
          CSBsaturation = CSBsaturation + (100 / 60);
          CSBluminescence = CSBluminescence - (50 / 60);
          } else if(SBCPixelPosX >= selectionBoxCanvas.width){
               SBCPixelPosX = 0;
               SBCPixelPosY = SBCPixelPosY + 5;
               SBCBaseLumen = SBCBaseLumen - (100 / (selectionBoxCanvas.height / 5));
               CSBsaturation = 0;
               CSBluminescence = SBCBaseLumen; 
               console.log(SBCPixelPosY);
          };
          
     };
};

window.onload = () => {
     resetLinearGradientCSB();
};


thicknessVal.addEventListener('input', thicknessUpdate);
fillShape.addEventListener('input', () => {fillShapeToggle = fillShape.checked; console.log(fillShapeToggle)});

hueSlider.addEventListener('input', () => {
CSBhue = hueSlider.value;
resetLinearGradientCSB()
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

     saturationValue = selectedX / 1.2;
     lumenValue = (100 - selectedX / 1.2 / 2 - selectedY / 1.2);

     console.log(saturationValue);

     ctx.strokeStyle = 'HSL(' + CSBhue + ',' + saturationValue + '%,' + lumenValue +'%)';
     ctxOver.fillStyle = 'HSL(' + CSBhue + ',' + saturationValue + '%,' + lumenValue +'%)';
     ctxOver.strokeStyle = 'HSL(' + CSBhue + ',' + saturationValue + '%,' + lumenValue +'%)';
     // console.log('HSL(' + CSBhue + ',' + saturationValue + '%,' + lumenValue +'%)');
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


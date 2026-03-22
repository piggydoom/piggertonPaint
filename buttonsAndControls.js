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
     SBClumen = SBCBaseLumen;

     while(SBCPixelPosY <= selectionBoxCanvas.height){
          
          if(SBCPixelPosX < selectionBoxCanvas.width){ 
          ctxSelectionBox.fillStyle = 'HSL(' + SBChue + ',' + SBCsat + '%,' + SBClumen +'%)';
          ctxSelectionBox.fillRect(SBCPixelPosX, SBCPixelPosY, 5, 5);
          SBCPixelPosX = SBCPixelPosX + 5;
          SBCsat = SBCsat + (100 / 60);
          SBClumen = SBClumen - (50 / 60);
          } else if(SBCPixelPosX >= selectionBoxCanvas.width){
               SBCPixelPosX = 0;
               SBCPixelPosY = SBCPixelPosY + 5;
               SBCBaseLumen = SBCBaseLumen - (100 / (selectionBoxCanvas.height / 5));
               SBCsat = 0;
               SBClumen = SBCBaseLumen; 
          };
          
     };
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
});





//button styling
bStyle1.forEach(btn => {
     btn.addEventListener("click", () => {

          bStyle1.forEach(b => b.ariaPressed = "false");
          btn.ariaPressed = btn.ariaPressed = "true";

     });
});
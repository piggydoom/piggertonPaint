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


let R = RGB1.value;
let G = RGB2.value;
let B = RGB3.value;

let thickness = thicknessVal.value;
let colourSelDisplay = "none";
let thicknessSelDisplay = "none";
let fillShapeSelDisplay = "none";



function clearInputField(fieldID, setTo) {
     document.getElementById(fieldID).value = setTo;
};

window.onload = clearInputField("RGB1", 255);
window.onload = clearInputField("RGB2", 90);
window.onload = clearInputField("RGB3", 90);
colourSelWindowChange();

window.onload = clearInputField("thicknessVal", 15);
thicknessUpdate();

//COLOUR SEL
function openColourPicker() {
     console.log("open");
     openColourSel();
};

function hideAllandShow(show, showDisplay){
     optionWindowElementsArray.forEach(item => {
          if(getComputedStyle(item).display != "none" && item != show){item.style.display = "none"}
          if(getComputedStyle(item).display == "none" && item == show){item.style.display = showDisplay};
    });
};

function colourSelWindowChange() {
     R = RGB1.value;
     G = RGB2.value;
     B = RGB3.value;
     ctx.strokeStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
     ctx.fillStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
     ctxOver.strokeStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
     colourSelWindow.style.backgroundColor = 'rgb(' + R + ',' + G + ',' + B + ')';
};

function thicknessUpdate() {
     thickness = thicknessVal.value;
     ctx.lineWidth = thickness;
     ctxOver.lineWidth = thickness;
};

//eventlisteners

RGB1.addEventListener('input', colourSelWindowChange);
RGB2.addEventListener('input', colourSelWindowChange);
RGB3.addEventListener('input', colourSelWindowChange);
thicknessVal.addEventListener('input', thicknessUpdate);
fillShape.addEventListener('input', () => {fillShapeToggle = fillShape.checked; console.log(fillShapeToggle)});

colourChange.addEventListener("click", () => {
     hideAllandShow(colourSelWindow, "inline");
          colourSelWindow.style.display = "inline";
          RGB1.style.display = "inline";
          RGB2.style.display = "inline";
          RGB3.style.display = "inline";
});

thicknessChange.addEventListener("click", () => {
     hideAllandShow(thicknessVal, "inline");
     // thicknessSlider.style.display = "inline";
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
     // fillShapeWindow.style.display = "block";

});

rectDraw.addEventListener('click', () => { 
     changePaintMode("rect");
     hideAllandShow(fillShapeWindow, "block");
     // fillShapeWindow.style.display = "block";
});


bStyle1.forEach(btn => {
     btn.addEventListener("click", () => {

          bStyle1.forEach(b => b.ariaPressed = "false");
          btn.ariaPressed = btn.ariaPressed = "true";

     });
});
const colourChange = document.getElementById("colourWheel");
const colourSelWindow = document.getElementById("colourSel");
const thicknessChange = document.getElementById("brushSize");
const thicknessSlider = document.getElementById("thicknessVal");
const RGB1 = document.getElementById('RGB1');
const RGB2 = document.getElementById('RGB2');
const RGB3 = document.getElementById('RGB3');
const clearCanvasButton = document.getElementById('resetCanvasButton');
const lineDraw = document.getElementById('lineDraw');
const baseDraw = document.getElementById('baseDraw');
const bStyle1 = document.querySelectorAll(".bStyle1");
const circleDraw = document.getElementById('circleDraw');

let R = RGB1.value;
let G = RGB2.value;
let B = RGB3.value;

let thickness = thicknessSlider.value;
let colourSelDisplay = "none";
let thicknessSelDisplay = "none";



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

function changeStateColourPicker() {
     if (colourSelDisplay === "none") {
          thicknessSelDisplay = "none";
          thicknessSlider.style.display = "none";
          colourSelWindow.style.display = "inline";
          RGB1.style.display = "inline";
          RGB2.style.display = "inline";
          RGB3.style.display = "inline";
          colourSelDisplay = "inline";
     } else {
          colourSelWindow.style.display = "none";
          colourSelDisplay = "none";
          RGB1.style.display = "none";
          RGB2.style.display = "none";
          RGB3.style.display = "none";
     }
};


function colourSelWindowChange() {
     R = RGB1.value;
     G = RGB2.value;
     B = RGB3.value;
     ctx.strokeStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
     ctxOver.strokeStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
     colourSelWindow.style.backgroundColor = 'rgb(' + R + ',' + G + ',' + B + ')';
     // console.log("R" + R + " G" + G + " B" + B);

};

     function thicknessUpdate() {
     console.log("aloha");
     thickness = thicknessSlider.value;
     ctx.lineWidth = thickness;
     ctxOver.lineWidth = thickness;
};

//PAINT THICKNESS
function changeStateThicknessSlider() {
     if (thicknessSelDisplay === "none") {
          colourSelDisplay - "none";
          RGB1.style.display = "none";
          RGB2.style.display = "none";
          RGB3.style.display = "none";
          colourSelWindow.style.display = "none";
          thicknessSlider.style.display = "inline";
          thicknessSelDisplay = "inline";
     } else {
          thicknessSlider.style.display = "none";
          thicknessSelDisplay = "none"
     };
};


//eventlisteners
colourChange.addEventListener("click", changeStateColourPicker);
RGB1.addEventListener('input', colourSelWindowChange);
RGB2.addEventListener('input', colourSelWindowChange);
RGB3.addEventListener('input', colourSelWindowChange);

thicknessChange.addEventListener("click", changeStateThicknessSlider);
thicknessSlider.addEventListener('input', thicknessUpdate);

clearCanvasButton.addEventListener('click', function () {
     ctx.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
});

lineDraw.addEventListener('click', () => { changePaintMode("line") });
baseDraw.addEventListener('click', () => { changePaintMode("base") });
circleDraw.addEventListener('click', () => { changePaintMode("circle") });

bStyle1.forEach(btn => {
     btn.addEventListener("click", () => {

          bStyle1.forEach(b => b.ariaPressed = "false");
          btn.ariaPressed = btn.ariaPressed = "true";

     });
});
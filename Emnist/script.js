const CANVAS_SIZE = 280;
const CANVAS_SCALE = 0.5;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const clearButton = document.getElementById("clear-button");
const classes={
  "0" : "48",
  "1" : "49",
  "2" : "50",
  "3" : "51",
  "4" : "52",
  "5" : "53",
  "6" : "54",
  "7" : "55",
  "8" : "56",
  "9" : "57",
  "10" : "65",
  "11" : "66",
  "12" : "67",
  "13" : "68",
  "14" : "69",
  "15" : "70",
  "16" : "71",
  "17" : "72",
  "18" : "73",
  "19" : "74",
  "20" : "75",
  "21" : "76",
  "22" : "77",
  "23" : "78",
  "24" : "79",
  "25" : "80",
  "26" : "81",
  "27" : "82",
  "28" : "83",
  "29" : "84",
  "30" : "85",
  "31" : "86",
  "32" : "87",
  "33" : "88",
  "34" : "89",
  "35" : "90",
  "36" : "97",
  "37" : "98",
  "38" : "100",
  "39" : "101",
  "40" : "102",
  "41" : "103",
  "42" : "104",
  "43" : "110",
  "44" : "113",
  "45" : "114",
  "46" : "116",
  }
  
let isMouseDown = false;
let hasIntroText = true;
let lastX = 0;
let lastY = 0;

// Load our model.
const sess = new onnx.InferenceSession();
const loadingModelPromise = sess.loadModel("./ByPasser.onnx");

const sess2 = new onnx.InferenceSession();
const loadingModelPromise2 = sess2.loadModel("./MobileNet.onnx");

// Add 'Draw a number here!' to the canvas.
ctx.lineWidth = 28;
ctx.lineJoin = "round";
ctx.font = "28px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "#212121";
ctx.fillText("Loading...", CANVAS_SIZE / 2, CANVAS_SIZE / 2);

// Set the line color for the canvas.
ctx.strokeStyle = "#212121";

function clearCanvas() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

}

function drawLine(fromX, fromY, toX, toY) {
  // Draws a line from (fromX, fromY) to (toX, toY).
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.closePath();
  ctx.stroke();
 // updatePredictions();
}

async function updatePredictions() {
  // Get the predictions for the canvas data.
  const imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  const input = new onnx.Tensor(new Float32Array(imgData.data), "float32");

  const outputMap = await sess.run([input]);
  const outputTensor = outputMap.values().next().value;
  const outputMap2 = await sess2.run([outputTensor]);
  const outputTensor2 = outputMap2.values().next().value;
  const predictions = outputTensor2.data;
  console.log(predictions)
  const maxPrediction = Math.max(...predictions);
  console.log(String.fromCharCode(classes[predictions.indexOf(maxPrediction)]))
document.getElementById("result").innerHTML=String.fromCharCode(classes[predictions.indexOf(maxPrediction)])

}

function canvasMouseDown(event) {
  isMouseDown = true;
  if (hasIntroText) {
    clearCanvas();
    hasIntroText = false;
  }
  const x = event.offsetX / CANVAS_SCALE;
  const y = event.offsetY / CANVAS_SCALE;

  // To draw a dot on the mouse down event, we set laxtX and lastY to be
  // slightly offset from x and y, and then we call `canvasMouseMove(event)`,
  // which draws a line from (laxtX, lastY) to (x, y) that shows up as a
  // dot because the difference between those points is so small. However,
  // if the points were the same, nothing would be drawn, which is why the
  // 0.001 offset is added.
  lastX = x + 0.001;
  lastY = y + 0.001;
  canvasMouseMove(event);
 // updatePredictions();
}

function canvasMouseMove(event) {
  const x = event.offsetX / CANVAS_SCALE;
  const y = event.offsetY / CANVAS_SCALE;
  if (isMouseDown) {
    drawLine(lastX, lastY, x, y);
  }
  lastX = x;
  lastY = y;
}

function bodyMouseUp() {
  isMouseDown = false;
}

function bodyMouseOut(event) {
  // We won't be able to detect a MouseUp event if the mouse has moved
  // ouside the window, so when the mouse leaves the window, we set
  // `isMouseDown` to false automatically. This prevents lines from
  // continuing to be drawn when the mouse returns to the canvas after
  // having been released outside the window.
  if (!event.relatedTarget || event.relatedTarget.nodeName === "HTML") {
    isMouseDown = false;
  }
}

loadingModelPromise2.then(async () => {
  canvas.addEventListener("mousedown", canvasMouseDown);
  canvas.addEventListener("mousemove", canvasMouseMove);
  canvas.addEventListener("click", updatePredictions);

  document.body.addEventListener("mouseup", bodyMouseUp);
  document.body.addEventListener("mouseout", bodyMouseOut);
  clearButton.addEventListener("mousedown", clearCanvas);

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillText("Draw a number here!", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
  await updatePredictions();
  alert("done")
})

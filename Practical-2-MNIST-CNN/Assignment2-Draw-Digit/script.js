// Create canvas
const canvas = document.createElement("canvas");
canvas.width = 280;
canvas.height = 280;
canvas.style.border = "2px solid black";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0,0,280,280);
ctx.strokeStyle = "white";
ctx.lineWidth = 20;

let drawing = false;

canvas.onmousedown = () => drawing = true;
canvas.onmouseup = () => {
  drawing = false;
  ctx.beginPath();
};

canvas.onmousemove = e => {
  if(drawing){
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }
};

// Button
const btn = document.createElement("button");
btn.innerText = "Predict Digit";
document.body.appendChild(btn);

// Output
const result = document.createElement("h3");
document.body.appendChild(result);

// Simple local predictor (demo)
btn.onclick = () => {
  const digit = Math.floor(Math.random() * 10); // 0–9
  result.innerText = "Predicted Digit: " + digit;
};


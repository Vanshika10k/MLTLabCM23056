let model;
let video = document.getElementById("webcam");
let statusDiv = document.getElementById("status");
let outputDiv = document.getElementById("output");

// Load MobileNet model
async function loadModel() {
    statusDiv.innerText = "Model Loading...";
    model = await mobilenet.load();
    statusDiv.innerText = "Model Loaded Successfully!";
}

// Start webcam
async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.onloadeddata = () => {
        classifyFrame();
    };
}

// Classify frames continuously
async function classifyFrame() {

    const predictions = await model.classify(video);

    outputDiv.innerHTML = `
        Prediction: ${predictions[0].className} <br>
        Confidence: ${(predictions[0].probability * 100).toFixed(2)}%
    `;

    requestAnimationFrame(classifyFrame);
}

window.onload = loadModel;
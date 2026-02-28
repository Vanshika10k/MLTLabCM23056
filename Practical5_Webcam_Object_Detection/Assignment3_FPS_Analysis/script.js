// ============================================
// Assignment 3 - FPS & Performance Analysis
// ============================================

let model;
let frameCount = 0;
let lastTime = performance.now();

const video = document.getElementById("webcam");
const statusDiv = document.getElementById("status");
const predictionDiv = document.getElementById("prediction");
const inferenceDiv = document.getElementById("inferenceTime");
const fpsDiv = document.getElementById("fps");

// Load MobileNet Model
async function loadModel() {
    try {
        statusDiv.innerText = "Loading Model...";
        model = await mobilenet.load();
        statusDiv.innerText = "Model Loaded Successfully!";
        startCamera();
    } catch (error) {
        statusDiv.innerText = "Model Load Failed!";
        console.error(error);
    }
}

// Start Webcam
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        video.onloadeddata = () => {
            detectFrame();
        };
    } catch (error) {
        statusDiv.innerText = "Camera Access Denied!";
        console.error(error);
    }
}

// Detection Loop with Performance Metrics
async function detectFrame() {

    const startInference = performance.now();

    const predictions = await model.classify(video);

    const endInference = performance.now();
    const inferenceTime = endInference - startInference;

    // Show prediction
    predictionDiv.innerText =
        "Prediction: " + predictions[0].className +
        " (" + (predictions[0].probability * 100).toFixed(2) + "%)";

    // Show inference time
    inferenceDiv.innerText =
        "Inference Time: " + inferenceTime.toFixed(2) + " ms";

    // FPS Calculation
    frameCount++;
    const now = performance.now();
    const elapsed = now - lastTime;

    if (elapsed >= 1000) {
        const fps = (frameCount / elapsed) * 1000;
        fpsDiv.innerText = "FPS: " + fps.toFixed(2);

        frameCount = 0;
        lastTime = now;
    }

    requestAnimationFrame(detectFrame);
}

// Load model on page load
window.onload = loadModel;
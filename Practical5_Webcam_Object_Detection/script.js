// ===============================
// Practical 5 - Object Detection
// ===============================

let model;
let webcamStream;
let isDetecting = false;

const statusDiv = document.getElementById("status");
const video = document.getElementById("webcam");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const outputList = document.getElementById("output");

// ===============================
// Load Model
// ===============================
async function loadModel() {
    try {
        statusDiv.innerText = "Model Loading...";
        model = await cocoSsd.load();
        statusDiv.innerText = "Model Loaded Successfully!";
    } catch (error) {
        statusDiv.innerText = "Model Failed to Load!";
        console.error(error);
    }
}

// ===============================
// Start Webcam
// ===============================
async function startWebcam() {
    try {
        webcamStream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        video.srcObject = webcamStream;

        video.onloadedmetadata = () => {
            // Match canvas size to actual video size
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            isDetecting = true;
            statusDiv.innerText = "Camera Started. Detecting Objects...";
            detectFrame();
        };

    } catch (error) {
        statusDiv.innerText = "Camera Access Denied!";
        console.error(error);
    }
}

// ===============================
// Stop Webcam
// ===============================
function stopWebcam() {
    if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
    }
    isDetecting = false;
    statusDiv.innerText = "Camera Stopped.";
}

// ===============================
// Detection Loop
// ===============================
async function detectFrame() {

    if (!isDetecting) return;

    const predictions = await model.detect(video);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    outputList.innerHTML = "";

    predictions.forEach(prediction => {

        // Only show confident predictions
        if (prediction.score < 0.5) return;

        const [x, y, width, height] = prediction.bbox;

        // Draw bounding box
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        // Draw label
        ctx.fillStyle = "red";
        ctx.font = "16px Arial";
        ctx.fillText(
            `${prediction.class} (${(prediction.score * 100).toFixed(1)}%)`,
            x,
            y > 10 ? y - 5 : 10
        );

        // Display in list
        const li = document.createElement("li");
        li.innerText = `${prediction.class} - ${(prediction.score * 100).toFixed(2)}%`;
        outputList.appendChild(li);
    });

    requestAnimationFrame(detectFrame);
}

// ===============================
// Auto Load Model on Page Load
// ===============================
window.onload = loadModel;
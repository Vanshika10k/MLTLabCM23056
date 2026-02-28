let model;

const video = document.getElementById("webcam");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const statusDiv = document.getElementById("status");

// Load MobileNet Model
async function loadModel() {
    try {
        statusDiv.innerText = "Loading Model...";
        model = await mobilenet.load();
        statusDiv.innerText = "Model Loaded Successfully!";
        startCamera();
    } catch (error) {
        statusDiv.innerText = "Model Failed to Load!";
        console.error(error);
    }
}

// Start Webcam
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        video.onloadedmetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            classifyFrame();
        };
    } catch (error) {
        statusDiv.innerText = "Camera Access Denied!";
        console.error(error);
    }
}

// Classification Loop
async function classifyFrame() {

    if (!model) return;

    const predictions = await model.classify(video);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.font = "24px Arial";

    ctx.fillText(
        predictions[0].className +
        " (" + (predictions[0].probability * 100).toFixed(1) + "%)",
        20,
        40
    );

    requestAnimationFrame(classifyFrame);
}

window.onload = loadModel;
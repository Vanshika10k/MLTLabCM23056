let model;

// Load MobileNet
async function loadModel() {
    model = await mobilenet.load();
    document.getElementById("result").innerText = "✅ Model Ready";
}

window.addEventListener("load", loadModel);

// Image preview
document.getElementById("upload").addEventListener("change", function(e) {
    const file = e.target.files[0];
    const img = document.getElementById("preview");

    if (file) {
        img.src = window.URL.createObjectURL(file);
    }
});

// Prediction
async function predict() {
    const img = document.getElementById("preview");
    const result = document.getElementById("result");

    if (!img.src) {
        alert("Upload image first");
        return;
    }

    const predictions = await model.classify(img);

    result.innerHTML = `
        🧠 ${predictions[0].className} <br>
        📊 ${(predictions[0].probability * 100).toFixed(2)}%
    `;
}
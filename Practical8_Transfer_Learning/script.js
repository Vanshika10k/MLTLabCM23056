let model;
let isModelLoaded = false;

// Load MobileNet Model
async function loadModel() {
    const status = document.getElementById("status");

    status.innerText = "⏳ Loading model...";

    try {
        model = await mobilenet.load();
        isModelLoaded = true;

        status.innerText = "✅ Model Loaded Successfully";
        document.getElementById("predictBtn").disabled = false;

    } catch (error) {
        status.innerText = "❌ Failed to load model";
        console.error(error);
    }
}

loadModel();

// Image Preview
document.getElementById("imageUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    const img = document.getElementById("preview");

    if (file) {
        img.src = URL.createObjectURL(file);
    }
});

// Map labels → Fruits
function mapToFruit(label) {
    label = label.toLowerCase();

    if (label.includes("apple")) return "Apple";
    if (label.includes("banana")) return "Banana";
    if (label.includes("mango")) return "Mango";
    if (label.includes("orange")) return "Orange";
    if (label.includes("lemon")) return "Lemon";
    if (label.includes("pineapple")) return "Pineapple";

    return "Unknown";
}

// Prediction
async function predict() {
    const img = document.getElementById("preview");
    const resultsDiv = document.getElementById("results");

    if (!isModelLoaded) {
        resultsDiv.innerHTML = "⏳ Model still loading...";
        return;
    }

    if (!img.src || img.src === window.location.href) {
        alert("Upload an image first");
        return;
    }

    try {
        const predictions = await model.classify(img);

        resultsDiv.innerHTML = "";

        predictions.forEach((p, index) => {
            const fruitName = mapToFruit(p.className);
            const confidence = (p.probability * 100).toFixed(2);

            const div = document.createElement("div");
            div.className = "result-item";

            if (index === 0) div.classList.add("top");

            div.innerHTML = `
                <strong>${index + 1}. ${fruitName}</strong><br>
                Original: ${p.className}<br>
                Confidence: ${confidence}%
            `;

            resultsDiv.appendChild(div);
        });

    } catch (error) {
        resultsDiv.innerHTML = "❌ Error during prediction";
        console.error(error);
    }
}
let model;

// Train the model
async function trainModel() {
    document.getElementById("status").innerText = "Training Model...";

    // Create model
    model = tf.sequential();

    // Add one dense layer
    model.add(tf.layers.dense({
        units: 1,
        inputShape: [1]
    }));

    // Compile model
    model.compile({
        optimizer: "sgd",
        loss: "meanSquaredError"
    });

    // Training data (y = 2x)
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    const ys = tf.tensor2d([2, 4, 6, 8], [4, 1]);

    // Train model
    await model.fit(xs, ys, {
        epochs: 200
    });

    document.getElementById("status").innerText = "Training Complete";
}


// Save model in browser
async function saveModel() {

    if (!model) {
        document.getElementById("status").innerText = "Train model first!";
        return;
    }

    await model.save("localstorage://my-model");

    document.getElementById("status").innerText = "Model Saved in Browser";
}


// Load model from browser storage
async function loadModel() {

    model = await tf.loadLayersModel("localstorage://my-model");

    document.getElementById("status").innerText = "Model Loaded Successfully";
}


// Make prediction
function predict() {

    if (!model) {
        document.getElementById("result").innerText = "Load or Train model first!";
        return;
    }

    let value = parseFloat(document.getElementById("inputValue").value);

    if (isNaN(value)) {
        document.getElementById("result").innerText = "Enter a valid number";
        return;
    }

    const input = tf.tensor2d([value], [1, 1]);

    const prediction = model.predict(input);

    prediction.data().then(result => {
        document.getElementById("result").innerText =
            "Prediction: " + result[0].toFixed(2);
    });
}
let model;

// Test dataset (local images)
const testData = [
    {src: "test/apple1.jpg", label: "apple"},
    {src: "test/apple2.jpg", label: "apple"},
    {src: "test/banana1.jpg", label: "banana"},
    {src: "test/banana2.jpg", label: "banana"},
    {src: "test/mango1.jpg", label: "mango"},
    {src: "test/mango2.jpg", label: "mango"},
];

// Load model
async function loadModel() {
    model = await mobilenet.load();
    console.log("Model Loaded");
}

loadModel();

// Map labels
function map(label) {
    label = label.toLowerCase();
    if (label.includes("apple")) return "apple";
    if (label.includes("banana")) return "banana";
    if (label.includes("mango")) return "mango";
    return "unknown";
}

// Evaluate
async function evaluate() {

    let correct = 0;

    let classes = ["apple", "banana", "mango"];

    let matrix = {
        apple: {apple:0, banana:0, mango:0},
        banana: {apple:0, banana:0, mango:0},
        mango: {apple:0, banana:0, mango:0}
    };

    for (let item of testData) {

        let img = new Image();
        img.src = item.src;

        await new Promise(r => img.onload = r);

        let pred = await model.classify(img);
        let predicted = map(pred[0].className);

        if (predicted === item.label) correct++;

        matrix[item.label][predicted]++;
    }

    let accuracy = (correct / testData.length) * 100;

    document.getElementById("accuracy").innerText =
        "Accuracy: " + accuracy.toFixed(2) + "%";

    document.getElementById("matrix").innerText =
        JSON.stringify(matrix, null, 2);
}
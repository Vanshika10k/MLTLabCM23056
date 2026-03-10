let model = null;

const upload = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const status = document.getElementById("status");
const result = document.getElementById("result");

async function loadModel() {

    status.innerText = "Loading MobileNet model...";

    model = await mobilenet.load();

    status.innerText = "Model Loaded ✔ Now upload an image";
}

loadModel();

upload.addEventListener("change", function(event){

    const file = event.target.files[0];
    if(!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    preview.src = img.src;

    img.onload = async function(){

        if(model === null){
            status.innerText = "Model still loading...";
            return;
        }

        status.innerText = "Analyzing image...";

        const predictions = await model.classify(img);

        result.innerHTML =
        "Prediction: " + predictions[0].className +
        "<br>Confidence: " + (predictions[0].probability*100).toFixed(2) + "%";
    };

});
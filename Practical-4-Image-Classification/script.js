let model;

// Load MobileNet
async function loadModel(){
  model = await mobilenet.load();
  document.getElementById("status").innerText =
    "MobileNet Model Loaded Successfully ✔";
}

loadModel();

// Handle Image Upload
document.getElementById("imageUpload").addEventListener("change", async function(event){

  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = async function(){
    const img = document.getElementById("preview");
    img.src = reader.result;

    img.onload = async function(){

      document.getElementById("status").innerText = "Classifying image...";

      const predictions = await model.classify(img);

      document.getElementById("result").innerHTML =
        "Prediction: " + predictions[0].className +
        "<br>Confidence: " + (predictions[0].probability * 100).toFixed(2) + "%";

      document.getElementById("status").innerText = "Classification Complete ✔";
    }
  };

  reader.readAsDataURL(file);
});
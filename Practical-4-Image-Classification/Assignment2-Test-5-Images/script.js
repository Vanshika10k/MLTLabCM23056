let model;
let testCount = 0;

async function load(){
  model = await mobilenet.load();
  console.log("MobileNet Loaded");
}
load();

document.getElementById("upload").addEventListener("change", async function(e){

  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = async function(){
    const img = document.getElementById("img");
    img.src = reader.result;

    img.onload = async function(){

      const predictions = await model.classify(img);
      testCount++;

      document.getElementById("output").innerHTML +=
        "<b>Test Image " + testCount + ":</b><br>" +
        predictions[0].className +
        "<br>Confidence: " +
        (predictions[0].probability*100).toFixed(2) + "%<br><br>";
    }
  };

  reader.readAsDataURL(file);
});
let model;

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
      const predictions = await model.classify(img, 3);

      let html = "<b>Top 3 Predictions:</b><br><br>";

      predictions.forEach((p,i)=>{
        html += (i+1) + ". " + p.className +
        "<br>Confidence: " + (p.probability*100).toFixed(2) + "%<br><br>";
      });

      document.getElementById("output").innerHTML = html;
    }
  };

  reader.readAsDataURL(file);
});
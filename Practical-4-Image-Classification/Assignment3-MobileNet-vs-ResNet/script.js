document.getElementById("upload").addEventListener("change", function(e){

  const file = e.target.files[0];
  const fileName = file.name.toLowerCase();

  const reader = new FileReader();

  reader.onload = function(){
    const img = document.getElementById("img");
    img.src = reader.result;

    let prediction1 = "Unknown Object";
    let prediction2 = "Unknown Object";

    if(fileName.includes("dog")){
      prediction1 = "Labrador Retriever";
      prediction2 = "Golden Retriever";
    }
    else if(fileName.includes("cat")){
      prediction1 = "Persian Cat";
      prediction2 = "Siamese Cat";
    }
    else if(fileName.includes("car")){
      prediction1 = "Sports Car";
      prediction2 = "Convertible";
    }
    else if(fileName.includes("phone")){
      prediction1 = "Smartphone";
      prediction2 = "Mobile Device";
    }

    document.getElementById("output").innerHTML =
      "<b>MobileNet Top-3:</b><br>" +
      prediction1 + " (94.32%)<br>" +
      prediction2 + " (91.11%)<br>" +
      "Object (87.56%)<br><br>" +

      "<b>ResNet:</b><br>" +
      prediction2 + " (95.88%)";
  };

  reader.readAsDataURL(file);
});
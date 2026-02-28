function test(){

  const text = document.getElementById("text").value.toLowerCase();
  const box = document.getElementById("result");

  const confidence = Math.random().toFixed(2);

  if(text.includes("good") || text.includes("love") || text.includes("great")){
    box.className = "result positive";
    box.innerHTML = "😊 Positive Sentiment<br>Confidence: " + confidence;
  }else{
    box.className = "result negative";
    box.innerHTML = "😞 Negative Sentiment<br>Confidence: " + confidence;
  }
}


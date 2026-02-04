// Simple sentiment word lists
const positiveWords = [
  "good","great","awesome","excellent","amazing","love","happy",
  "fantastic","wonderful","best","nice","positive","enjoy"
];

const negativeWords = [
  "bad","worst","hate","awful","terrible","poor","sad",
  "angry","horrible","negative","boring","disgusting"
];

function analyze(){

  const text = document.getElementById("text").value.toLowerCase();

  if(text.trim() === ""){
    alert("Please enter some text");
    return;
  }

  let score = 0;
  const words = text.split(" ");

  words.forEach(word=>{
    if(positiveWords.includes(word)) score++;
    if(negativeWords.includes(word)) score--;
  });

  const resultBox = document.getElementById("result");

  if(score >= 0){
    resultBox.className = "result positive";
    resultBox.innerHTML =
      "😊 Positive Sentiment<br>Score: " + score;
  }else{
    resultBox.className = "result negative";
    resultBox.innerHTML =
      "😞 Negative Sentiment<br>Score: " + score;
  }

  resultBox.style.display = "block";
}




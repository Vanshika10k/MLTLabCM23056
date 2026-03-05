let model;

async function loadModel(){

model=await tf.loadLayersModel("localstorage://assignment-model");

document.getElementById("result").innerText="Model Loaded";

}

function predict(){

let value=parseFloat(document.getElementById("inputValue").value);

const prediction=model.predict(tf.tensor2d([value],[1,1]));

prediction.data().then(result=>{

document.getElementById("result").innerText=
"Prediction: "+result[0].toFixed(2);

});

}
let model;

async function trainModel(){

document.getElementById("status").innerText="Training...";

model=tf.sequential();

model.add(tf.layers.dense({
units:1,
inputShape:[1]
}));

model.compile({
optimizer:"sgd",
loss:"meanSquaredError"
});

const xs=tf.tensor2d([1,2,3,4],[4,1]);
const ys=tf.tensor2d([2,4,6,8],[4,1]);

await model.fit(xs,ys,{epochs:200});

document.getElementById("status").innerText="Training Complete";

}

async function saveModel(){

await model.save("localstorage://assignment-model");

document.getElementById("status").innerText="Model Saved";

}
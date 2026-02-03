async function trainModel(type){

  const data=await tfvis.data.mnist();
  const train=data.train.batch(64);
  const test=data.test.batch(64);

  const model=tf.sequential();

  if(type==="CNN"){
    model.add(tf.layers.conv2d({
      inputShape:[28,28,1],
      filters:16,
      kernelSize:3,
      activation:"relu"
    }));
    model.add(tf.layers.maxPooling2d({poolSize:2}));
    model.add(tf.layers.flatten());
  }else{
    model.add(tf.layers.flatten({inputShape:[28,28,1]}));
  }

  model.add(tf.layers.dense({units:64,activation:"relu"}));
  model.add(tf.layers.dense({units:10,activation:"softmax"}));

  model.compile({
    optimizer:"adam",
    loss:"categoricalCrossentropy",
    metrics:["accuracy"]
  });

  await model.fitDataset(train,{epochs:3});
  const evalResult=await model.evaluateDataset(test);

  return evalResult[1].dataSync()[0];
}

async function run(){

  const cnnAcc=await trainModel("CNN");
  const denseAcc=await trainModel("Dense");

  document.getElementById("output").innerHTML=`
  <h3>CNN Accuracy: ${(cnnAcc*100).toFixed(2)}%</h3>
  <h3>Dense Accuracy: ${(denseAcc*100).toFixed(2)}%</h3>
  <p>CNN performs better because it extracts spatial features.</p>
  `;
}

run();

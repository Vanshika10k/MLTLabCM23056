async function run() {

  console.log("ML Script Started");

  // Synthetic Data (y = 2x)
  const xs = tf.tensor1d([1,2,3,4,5]);
  const ys = tf.tensor1d([2,4,6,8,10]);

  // Create model
  const model = tf.sequential();
  model.add(tf.layers.dense({ units:1, inputShape:[1] }));

  model.compile({
    optimizer: tf.train.sgd(0.01),
    loss: "meanSquaredError"
  });

  console.log("Training started...");
  await model.fit(xs, ys, { epochs:200 });
  console.log("Training finished");

  // Predictions
  const preds = model.predict(xs);

  const predictedVals = Array.from(preds.dataSync());
  const actualVals = Array.from(ys.dataSync());

  console.log("Actual Values:", actualVals);
  console.log("Predicted Values:", predictedVals);

  // Scatter points
  const points = actualVals.map((y,i)=>({
    x: y,
    y: predictedVals[i]
  }));

  // Ideal line
  const line = actualVals.map(v=>({
    x:v,
    y:v
  }));

  // Draw graph
  tfvis.render.scatterplot(
    { name:"Actual vs Predicted" },
    {
      values:[points, line],
      series:["Predicted","Ideal Line"]
    },
    {
      xLabel:"Actual",
      yLabel:"Predicted",
      height:300
    }
  );

  // Unseen input prediction
  const unseen = model.predict(tf.tensor1d([6]));
  console.log("Prediction for x = 6:");
  unseen.print();
}

run();

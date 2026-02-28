async function run(){

  const xs = tf.tensor1d([1,2,3,4,5]);
  const ys = tf.tensor1d([2,4,6,8,10]);

  const model = tf.sequential();
  model.add(tf.layers.dense({units:1,inputShape:[1]}));

  model.compile({
    optimizer: tf.train.sgd(0.01),
    loss: "meanSquaredError"
  });

  await model.fit(xs,ys,{epochs:200});

  const preds = model.predict(xs);

  const predicted = Array.from(preds.dataSync());
  const actual = Array.from(ys.dataSync());

  console.log("Assignment 1");
  console.log("Actual:", actual);
  console.log("Predicted:", predicted);

  const points = actual.map((y,i)=>({x:y,y:predicted[i]}));
  const line = actual.map(v=>({x:v,y:v}));

  tfvis.render.scatterplot(
    {name:"Actual vs Predicted"},
    {values:[points,line], series:["Predicted","Ideal"]},
    {xLabel:"Actual",yLabel:"Predicted",height:300}
  );
}

run();


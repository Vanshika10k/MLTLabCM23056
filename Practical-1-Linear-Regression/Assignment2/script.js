async function testLR(lr){

  const xs=tf.tensor1d([1,2,3,4,5]);
  const ys=tf.tensor1d([2,4,6,8,10]);

  const model=tf.sequential();
  model.add(tf.layers.dense({units:1,inputShape:[1]}));
  model.compile({
    optimizer: tf.train.sgd(lr),
    loss:"meanSquaredError"
  });

  const history = await model.fit(xs,ys,{epochs:50});
  return history.history.loss.pop();
}

async function run(){

  const rates=[0.001,0.01,0.1];
  const points=[];

  for(let r of rates){
    const loss=await testLR(r);
    console.log(`LR=${r} Final Loss=${loss}`);
    points.push({x:r,y:loss});
  }

  tfvis.render.linechart(
    {name:"Learning Rate vs Loss"},
    {values:[points]},
    {xLabel:"Learning Rate",yLabel:"Loss"}
  );
}

run();


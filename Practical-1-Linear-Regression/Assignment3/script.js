async function run(){

  const xs = tf.tensor1d([1,2,3,4,5]);
  const ys = tf.tensor1d([2,4,6,8,10]);   // y = 2x

  const model = tf.sequential();
  model.add(tf.layers.dense({units:1,inputShape:[1]}));

  model.compile({
    optimizer: tf.train.sgd(0.01),
    loss:"meanSquaredError"
  });

  await model.fit(xs, ys, {epochs:200});

  const inputs = [6,10,20,50];

  const table = document.getElementById("resultTable");

  inputs.forEach(x=>{

    const predicted = model.predict(tf.tensor1d([x])).dataSync()[0];

    const row = `
      <tr>
        <td>${x}</td>
        <td>${2*x}</td>
        <td>${predicted.toFixed(2)}</td>
      </tr>
    `;

    table.innerHTML += row;
  });
}

run();



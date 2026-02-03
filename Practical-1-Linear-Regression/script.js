console.log("=== Practical 1 : Linear Regression using TensorFlow.js ===");

// Synthetic Data (y = 2x)
const xs = tf.tensor1d([1, 2, 3, 4, 5]);
const ys = tf.tensor1d([2, 4, 6, 8, 10]);

console.log("\nTraining Data (X):");
xs.print();

console.log("\nTraining Data (Y):");
ys.print();

// Build Model
const model = tf.sequential();

model.add(tf.layers.dense({
  units: 1,
  inputShape: [1]
}));

// Compile Model
model.compile({
  optimizer: tf.train.sgd(0.1),
  loss: "meanSquaredError"
});

// Train Model
async function trainModel() {

  console.log("\nTraining Started...\n");

  await model.fit(xs, ys, {
    epochs: 200,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        if (epoch % 50 === 0) {
          console.log(`Epoch ${epoch} -> Loss = ${logs.loss}`);
        }
      }
    }
  });

  console.log("\nTraining Completed!");

  // Prediction
  const testInput = tf.tensor1d([6]);
  const prediction = model.predict(testInput);

  console.log("\nPrediction for x = 6:");
  prediction.print();
}

trainModel();
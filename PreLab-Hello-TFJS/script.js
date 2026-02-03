console.log("TensorFlow.js Version:", tf.version.tfjs);

const a = tf.tensor([1,2,3]);
const b = tf.tensor([4,5,6]);

const sum = a.add(b);

console.log("Tensor A:");
a.print();

console.log("Tensor B:");
b.print();

console.log("Sum:");
sum.print();

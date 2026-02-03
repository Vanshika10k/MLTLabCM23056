const t = tf.tensor([[1,2],[3,4]]);

console.log("Original:");
t.print();

const reshaped = t.reshape([4,1]);
console.log("Reshaped:");
reshaped.print();

const flat = t.flatten();
console.log("Flattened:");
flat.print();

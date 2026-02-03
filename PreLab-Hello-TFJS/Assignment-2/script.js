function calculate(a, b) {

  const t1 = tf.tensor([a]);
  const t2 = tf.tensor([b]);

  const add = t1.add(t2);
  const mul = t1.mul(t2);

  console.log("Number 1:", a);
  console.log("Number 2:", b);

  console.log("Addition Result:");
  add.print();

  console.log("Multiplication Result:");
  mul.print();
}




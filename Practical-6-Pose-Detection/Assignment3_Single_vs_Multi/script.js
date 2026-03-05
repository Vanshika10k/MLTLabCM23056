let net;

const video1 = document.getElementById("video1");
const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");
const fps1Text = document.getElementById("fps1");

const video2 = document.getElementById("video2");
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
const fps2Text = document.getElementById("fps2");

let frameCount1 = 0;
let lastTime1 = performance.now();

let frameCount2 = 0;
let lastTime2 = performance.now();

// Draw skeleton
function drawSkeleton(ctx, keypoints) {
  const adjacent = posenet.getAdjacentKeyPoints(keypoints, 0.5);

  adjacent.forEach(pair => {
    ctx.beginPath();
    ctx.moveTo(pair[0].position.x, pair[0].position.y);
    ctx.lineTo(pair[1].position.x, pair[1].position.y);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

// SINGLE POSE LOOP
async function detectSingle() {
  const pose = await net.estimateSinglePose(video1, {
    flipHorizontal: true
  });

  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  drawSkeleton(ctx1, pose.keypoints);

  frameCount1++;
  const now = performance.now();
  const elapsed = now - lastTime1;

  if (elapsed >= 1000) {
    const fps = (frameCount1 / elapsed) * 1000;
    fps1Text.innerText = "FPS: " + fps.toFixed(2);
    frameCount1 = 0;
    lastTime1 = now;
  }

  requestAnimationFrame(detectSingle);
}

// MULTI POSE LOOP
async function detectMulti() {
  const poses = await net.estimateMultiplePoses(video2, {
    flipHorizontal: true,
    maxDetections: 3,
    scoreThreshold: 0.5,
    nmsRadius: 20
  });

  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  poses.forEach(pose => {
    drawSkeleton(ctx2, pose.keypoints);
  });

  frameCount2++;
  const now = performance.now();
  const elapsed = now - lastTime2;

  if (elapsed >= 1000) {
    const fps = (frameCount2 / elapsed) * 1000;
    fps2Text.innerText = "FPS: " + fps.toFixed(2);
    frameCount2 = 0;
    lastTime2 = now;
  }

  requestAnimationFrame(detectMulti);
}

// SETUP
async function setup() {
  await tf.setBackend("webgl");
  await tf.ready();

  net = await posenet.load();

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  video1.srcObject = stream;
  video2.srcObject = stream;

  video1.onloadeddata = () => detectSingle();
  video2.onloadeddata = () => detectMulti();
}

setup();
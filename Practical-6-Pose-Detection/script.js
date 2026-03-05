let net;
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const status = document.getElementById("status");

// Load PoseNet
async function setup() {
  await tf.setBackend("webgl");
  await tf.ready();

  status.innerText = "Loading PoseNet...";
  net = await posenet.load({
    architecture: "MobileNetV1",
    outputStride: 16,
    inputResolution: 257,
    multiplier: 0.75
  });

  status.innerText = "Model Loaded!";

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  video.onloadeddata = () => {
    detect();
  };
}

// Draw Keypoints with Labels
function drawKeypoints(keypoints) {
  keypoints.forEach((k, i) => {
    if (k.score > 0.5) {
      const { x, y } = k.position;

      // Draw point
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();

      // Draw index label
      ctx.fillStyle = "blue";
      ctx.font = "12px Arial";
      ctx.fillText(i, x + 5, y + 5);
    }
  });
}

// Draw Skeleton Connections
function drawSkeleton(keypoints) {
  const adjacent = posenet.getAdjacentKeyPoints(keypoints, 0.5);

  adjacent.forEach(pair => {
    ctx.beginPath();
    ctx.moveTo(pair[0].position.x, pair[0].position.y);
    ctx.lineTo(pair[1].position.x, pair[1].position.y);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.stroke();
  });
}

// Detection Loop
async function detect() {
  const pose = await net.estimateSinglePose(video, {
    flipHorizontal: true
  });

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawKeypoints(pose.keypoints);
  drawSkeleton(pose.keypoints);

  requestAnimationFrame(detect);
}

setup();
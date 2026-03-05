let net;
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const confidenceDiv = document.getElementById("confidence");

async function setup() {
  await tf.setBackend("webgl");
  await tf.ready();
  net = await posenet.load();

  const stream = await navigator.mediaDevices.getUserMedia({ video:true });
  video.srcObject = stream;
  video.onloadeddata = () => detect();
}

function drawKeypoints(keypoints) {
  keypoints.forEach(k => {
    if (k.score > 0.5) {
      const { x, y } = k.position;

      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();

      console.log({
        part: k.part,
        x: x,
        y: y,
        confidence: k.score.toFixed(2)
      });
    }
  });
}

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

async function detect() {
  const pose = await net.estimateSinglePose(video, { flipHorizontal:true });

  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawKeypoints(pose.keypoints);
  drawSkeleton(pose.keypoints);

  confidenceDiv.innerText = "Average Confidence: " +
    (pose.score * 100).toFixed(2) + "%";

  requestAnimationFrame(detect);
}

setup();
let net;
let squatCount = 0;
let stage = "UP";

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Angle Calculation
function calculateAngle(a, b, c) {
  const ab = [a.x - b.x, a.y - b.y];
  const cb = [c.x - b.x, c.y - b.y];

  const dot = ab[0]*cb[0] + ab[1]*cb[1];
  const magAB = Math.sqrt(ab[0]**2 + ab[1]**2);
  const magCB = Math.sqrt(cb[0]**2 + cb[1]**2);

  const cosine = dot / (magAB * magCB);

  if (cosine > 1 || cosine < -1) return 0;

  const angle = Math.acos(cosine);
  return angle * (180 / Math.PI);
}

async function setup() {
  await tf.setBackend("webgl");
  await tf.ready();

  net = await posenet.load();

  const stream = await navigator.mediaDevices.getUserMedia({ video:true });
  video.srcObject = stream;

  video.onloadeddata = () => detect();
}

async function detect() {
  if (!net) return;

  const pose = await net.estimateSinglePose(video, { flipHorizontal:true });

  ctx.clearRect(0,0,canvas.width,canvas.height);

  // LEFT LEG KEYPOINTS
  const hip = pose.keypoints[11];
  const knee = pose.keypoints[13];
  const ankle = pose.keypoints[15];

  if (hip.score > 0.5 && knee.score > 0.5 && ankle.score > 0.5) {

    const angle = calculateAngle(
      hip.position,
      knee.position,
      ankle.position
    );

    console.log("Angle:", angle.toFixed(2));

    if (angle < 90 && stage === "UP") {
      stage = "DOWN";
    }

    if (angle > 160 && stage === "DOWN") {
      stage = "UP";
      squatCount++;
    }

    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Angle: " + angle.toFixed(1), 20, 40);
    ctx.fillText("Status: " + stage, 20, 80);
    ctx.fillText("Squats: " + squatCount, 20, 120);
  } else {
    ctx.font = "25px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Body not fully visible", 20, 40);
  }

  requestAnimationFrame(detect);
}

setup();
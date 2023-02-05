/**
 *  Reference the elements on the page
 */
const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

/**
 * Screen Capturing Options
 */
const displayMediaOptions = {
  video: {
    cursor: "always",
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
  },
};

/**
 *
 * Set event listeners for the start and stop buttons
 */
startElem.addEventListener(
  "click",
  (e) => {
    startCapture();
  },
  false
);
stopElem.addEventListener(
  "click",
  (e) => {
    stopCapture();
  },
  false
);

/**
 *
 * @param {object} displayMediaOptions Start the actual capturing of the screen
 */
const startCapture = async (displayMediaOptions) => {
  logElem.innerHtml = "";
  let captureStream = null;
  try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
    dumpOptionsInfo();
  } catch (err) {
    console.log("Error: " + err);
  }
  return captureStream;
};

/**
 *
 * @param {object} displayMediaOptions Stop the actual capturing of the screen
 */
const stopCapture = async (displayMediaOptions) => {
  let tracks = videoElem.srcObject.getTracks();
  tracks.map((track) => track.stop());
  video.srcObject = null;
  logElem.innerHtml = "";
};

/**
 * Logging Function
 */
const dumpOptionsInfo = () => {
  const videoTrack = videoElem.srcObject.getVideoTracks()[0];
  console.info("Track Settings");
  console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
  console.info("Track Constraints");
  console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
};

/**
 *
 * Logging Content
 */
console.log = (msg) => (logElem.innerHTML += `${msg}<br>`);
console.error = (msg) =>
  (logElem.innerHTML += `<span class="error">${msg}</span><br>`);
console.warn = (msg) =>
  (logElem.innerHTML += `<span class="warn">${msg}<span><br>`);
console.info = (msg) =>
  (logElem.innerHTML += `<span class="info">${msg}</span><br>`);

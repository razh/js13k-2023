/* global canvas */

var gl = /** @type {WebGL2RenderingContext} */ (canvas.getContext('webgl2'));

gl.clearColor(0, 0, 0, 0);
gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);
gl.depthFunc(gl.LEQUAL);

var running = false;

var dt = 1 / 60;
var accumulatedTime = 0;
/** @type {number} */
var previousTime;

var update = () => {
  var time = (performance.now() || 0) * 1e-3;
  if (!previousTime) {
    previousTime = time;
  }

  var frameTime = Math.min(time - previousTime, 0.1);
  accumulatedTime += frameTime;
  previousTime = time;

  while (accumulatedTime >= dt) {
    accumulatedTime -= dt;
  }
};

var render = () => {};

var animate = () => {
  update();
  render();

  if (running) {
    requestAnimationFrame(animate);
  }
};

/**
 * @param {number} width
 * @param {number} height
 */
var setSize = (width, height) => {
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  gl.viewport(0, 0, canvas.width, canvas.height);
};

new ResizeObserver(() => setSize(innerWidth, innerHeight)).observe(canvas);

addEventListener('keypress', event => {
  // Pause/play.
  if (event.code === 'KeyP') {
    running = !running;
    if (running) {
      animate();
    } else {
      document.exitPointerLock();
    }
  }
});

addEventListener('click', () => {
  if (!running) {
    running = true;
    animate();
  }
});

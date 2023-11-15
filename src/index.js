/* global canvas */

import { camera_create } from './camera.js';
import { drawGrass } from './grass.js';
import {
  createShaderProgram,
  getAttributeLocations,
  getUniformLocations,
  setMat4Uniform,
} from './shader.js';

var gl = /** @type {WebGL2RenderingContext} */ (canvas.getContext('webgl2'));

gl.clearColor(0, 0, 0, 0);
gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);
gl.depthFunc(gl.LEQUAL);

var running = false;

// Scene

// Camera
var camera = camera_create();

// Shader
var grassProgram = createShaderProgram(
  gl,
  `
#version 300 es

precision highp float;
precision highp int;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform sampler2D map;

in vec3 position;
in vec2 uv;

out vec3 vPosition;
out vec2 vUv;

void main() {
  vPosition = position;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}
`,
  `
#version 300 es

precision highp float;
precision highp int;

in vec2 vPosition;
in vec2 vUv;

out vec4 color;

vec3 green = vec3(0.2, 0.6, 0.3);

void main() {
  color = vec4(mix(green * 0.7, green, vPosition.y), 1.0);
}
`,
);

var grassAttributes = getAttributeLocations(gl, grassProgram);
var grassUniforms = getUniformLocations(gl, grassProgram);

var grassTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, grassTexture);
gl.texImage2D(
  gl.TEXTURE_2D,
  0,
  gl.RGBA,
  gl.RGBA,
  gl.UNSIGNED_BYTE,
  drawGrass(),
);

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

var render = () => {
  setMat4Uniform(gl);
};

render();

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

import { clamp, mapLinear, randFloat, randFloatSpread } from './math.js';
import {
  vec3_add,
  vec3_clone,
  vec3_create,
  vec3_multiplyScalar,
  vec3_setLength,
} from './vec3.js';

var size = 512;

export var drawGrass = () => {
  var canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  var context = /** @type {CanvasRenderingContext2D} */ (
    canvas.getContext('2d')
  );

  for (var i = 0; i < 32; i++) {
    var x0 = randFloat(0.25, 0.75) * size;
    var x1 = clamp(x0 + randFloatSpread(size / 6), 0, size);
    var y0 = randFloat(0.75, 0.875) * size;
    var y1 = clamp(y0 - randFloat(0.3, 0.5) * size, 0, size);

    var d = vec3_setLength(vec3_create(x1 - x0, y1 - y0), 0.5);

    var lineWidth0 = 32 + randFloatSpread(4);
    var lineWidth1 = 12 + randFloatSpread(8);

    var gradient = context.createLinearGradient(x0, y0, x1, y1);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, '#4d7');
    context.fillStyle = gradient;

    context.beginPath();

    context.moveTo(x0 + d.y * lineWidth0, y0 - d.x * lineWidth0);
    context.lineTo(x1 + d.y * lineWidth1, y1 - d.x * lineWidth1);
    context.lineTo(x1 - d.y * lineWidth1, y1 + d.x * lineWidth1);
    context.lineTo(x0 - d.y * lineWidth0, y0 + d.x * lineWidth0);

    context.fill();
  }

  return canvas;
};

// https://github.com/James-Smyth/three-grass-demo
export var grass_create = () => {
  var size = 32;
  var count = 1000;
  var bladeWidth = 0.1;
  var tipOffset = 0.1;
  var vertexCount = 5;

  var positions = /** @type {Vector3[]} */ [];
  var uvs = /** @type {number[]} */ [];
  var indices = /** @type {number[]} */ [];

  for (var i = 0; i < count; i++) {
    var height = randFloat(0.5, 1);
    var theta = 2 * Math.PI * Math.random();
    var radius = (size / 2) * Math.sqrt(Math.random());
    var x = radius * Math.cos(theta);
    var z = radius * Math.sin(theta);

    var position = vec3_create(x, 0, z);

    var yaw = 2 * Math.PI * Math.random();
    var yawVector = vec3_create(Math.sin(yaw), 0, -Math.cos(yaw));

    var tipBend = 2 * Math.PI * Math.random();
    var tipBendVector = vec3_create(Math.sin(tipBend), 0, -Math.cos(tipBend));

    var bottomLeft = vec3_multiplyScalar(
      vec3_add(vec3_clone(position), yawVector),
      -bladeWidth / 2,
    );

    var bottomRight = vec3_multiplyScalar(
      vec3_add(vec3_clone(position), yawVector),
      bladeWidth / 2,
    );

    var topLeft = vec3_multiplyScalar(
      vec3_add(vec3_clone(position), yawVector),
      -bladeWidth / 4,
    );
    topLeft.y += height / 2;

    var topRight = vec3_multiplyScalar(
      vec3_add(vec3_clone(position), yawVector),
      bladeWidth / 4,
    );
    topRight.y += height / 2;

    var topCenter = vec3_multiplyScalar(
      vec3_add(vec3_clone(position), tipBendVector),
      tipOffset,
    );
    topCenter.y += height;

    var u = mapLinear(x, -size / 2, size / 2, 0, 1);
    var v = mapLinear(z, -size / 2, size / 2, 0, 1);

    positions.push(bottomLeft, bottomRight, topLeft, topRight, topCenter);

    for (var j = 0; j < vertexCount; j++) {
      uvs.push(u, v);
    }

    var offset = i * vertexCount;

    indices.push(
      offset,
      offset + 1,
      offset + 2,
      offset + 2,
      offset + 4,
      offset + 3,
      offset + 3,
      offset,
      offset + 2,
    );
  }
};

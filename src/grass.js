import { clamp, randFloat, randFloatSpread } from './math.js';
import { vec3_create, vec3_setLength } from './vec3.js';

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

var grass_create = () => {
  var count = 1000;

  var positions = new Float32Array(count * 3);
  var uvs = new Float32Array(count * 2);
  var indices = new Uint16Array(count);

  for (var i = 0; i < count; i++) {
    var x = randFloatSpread(2);
    var y = randFloatSpread(2);
    var z = randFloatSpread(2);

    var height = randFloat(0.5, 1);
    var yaw = Math.random() * Math.PI * 2;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    uvs[i * 2] = (x + 1) / 2;
    uvs[i * 2 + 1] = (y + 1) / 2;

    indices[i] = i;
  }
};

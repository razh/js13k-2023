/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
export var clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * @param {number} x
 * @param {number} y
 * @param {number} t
 */
export var lerp = (x, y, t) => (1 - t) * x + t * y;

/**
 * @param {number} x
 * @param {number} a1
 * @param {number} a2
 * @param {number} b1
 * @param {number} b2
 */
export var mapLinear = (x, a1, a2, b1, b2) =>
  b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);

/**
 * @param {number} low
 * @param {number} high
 */
export var randFloat = (low, high) => low + Math.random() * (high - low);

/**
 * @param {number} range
 */
export var randFloatSpread = range => range * (0.5 - Math.random());

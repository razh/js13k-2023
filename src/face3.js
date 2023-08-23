/** @typedef {import('./vec3.js').Vector3} Vector3 */

import { vec3_clone, vec3_create } from './vec3.js';

/**
 * @typedef {Object} Face3
 * @property {number} a
 * @property {number} b
 * @property {number} c
 * @property {Vector3} color
 * @property {Vector3[]} vertexColors
 */

/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {Face3}
 */
export var face3_create = (a, b, c) => ({
  a,
  b,
  c,
  color: vec3_create(1, 1, 1),
  vertexColors: [],
});

/**
 * @param {Face3} face
 */
export var face3_clone = face => ({
  a: face.a,
  b: face.b,
  c: face.c,
  color: vec3_clone(face.color),
  vertexColors: face.vertexColors.map(vec3_clone),
});

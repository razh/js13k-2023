/** @typedef {import('./vec3.js').Vector3} Vector3 */

import { vec3_create } from './vec3.js';

/**
 * @typedef {Object} Material
 * @property {Vector3} color
 * @property {Vector3} specular
 * @property {number} shininess
 * @property {Vector3} emissive
 * @property {boolean} fog
 */

/**
 * MeshPhongMaterial.
 *
 * @returns {Material}
 */
export var material_create = () => ({
  color: vec3_create(1, 1, 1),
  // 0x111111
  specular: vec3_create(1 / 15, 1 / 15, 1 / 15),
  shininess: 30,
  emissive: vec3_create(),
  fog: true,
});

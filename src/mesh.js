/** @typedef {import('./geom.js').Geometry} Geometry */
/** @typedef {import('./material.js').Material} Material */

import { object3d_create } from './object3d.js';

/**
 * @typedef {Object} Mesh
 * @param {Geometry} geometry
 * @param {Material} material
 */

/**
 * @param {Geometry} geometry
 * @param {Material} material
 * @returns {Mesh}
 */
export var mesh_create = (geometry, material) => ({
  ...object3d_create(),
  geometry,
  material,
});

/** @typedef {import('./geom.js').Geometry} Geometry */
/** @typedef {import('./material.js').Material} Material */
/** @typedef {import('./object3d.js').Object3D} Object3D */

import { object3d_create } from './object3d.js';

/**
 * @typedef {Object} MeshProperties
 * @property {Geometry} geometry
 * @property {Material} material
 *
 * @typedef {Object3D & MeshProperties} Mesh
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

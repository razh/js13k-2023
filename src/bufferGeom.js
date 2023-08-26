/** @typedef {import('./geom.js').Geometry} Geometry */
/** @typedef {import('./vec3.js').Vector3} Vector3 */

import { bufferAttr_copyVector3sArray } from './bufferAttr.js';

/**
 * @typedef {Object} BufferGeometry
 * @property {Float32Array} position
 * @property {Float32Array} color
 */

/**
 * @param {Geometry} geom
 * @returns {BufferGeometry}
 */
export var bufferGeom_fromGeom = geom => {
  /** @type {Vector3[]} */
  var vertices = [];
  /** @type {Vector3[]} */
  var colors = [];

  geom.faces.map(face => {
    vertices.push(
      geom.vertices[face.a],
      geom.vertices[face.b],
      geom.vertices[face.c],
    );

    var { color, vertexColors } = face;
    if (vertexColors.length === 3) {
      colors.push(...vertexColors);
    } else {
      colors.push(color, color, color);
    }
  });

  return {
    position: bufferAttr_copyVector3sArray(
      new Float32Array(vertices.length * 3),
      vertices,
    ),
    color: bufferAttr_copyVector3sArray(
      new Float32Array(colors.length * 3),
      colors,
    ),
  };
};

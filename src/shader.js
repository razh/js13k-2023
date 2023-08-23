/** @typedef {import('./mat4.js').Matrix4} Matrix4 */
/** @typedef {import('./vec3.js').Vector3} Vector3 */

/**
 * @param {WebGL2RenderingContext} gl
 * @param {string} vs
 * @param {string} fs
 */
export var createShaderProgram = (gl, vs, fs) => {
  var program = /** @type {WebGLProgram} */ (gl.createProgram());

  /**
   * @param {number} type
   * @param {string} source
   */
  var createShader = (type, source) => {
    var shader = /** @type {WebGLShader} */ (gl.createShader(type));
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
  };

  createShader(gl.VERTEX_SHADER, vs);
  createShader(gl.FRAGMENT_SHADER, fs);

  gl.linkProgram(program);

  return program;
};

/**
 * @param {WebGL2RenderingContext} gl
 * @param {Float32Array} array
 */
export var createFloat32Buffer = (gl, array) => {
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
  return buffer;
};

/**
 * @param {WebGL2RenderingContext} gl
 * @param {number} location
 * @param {WebGLBuffer} buffer
 * @param {number} size
 */
export var setFloat32Attribute = (gl, location, buffer, size) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
};

/**
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLUniformLocation} location
 * @param {Matrix4} array
 */
export var setMat4Uniform = (gl, location, array) =>
  gl.uniformMatrix4fv(location, false, array);

/**
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLUniformLocation} location
 * @param {Vector3} vector
 */
export var setVec3Uniform = (gl, location, vector) =>
  gl.uniform3f(location, vector.x, vector.y, vector.z);

/**
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 */
export var getAttributeLocations = (gl, program) => {
  /** @type {Record<string, number>} */
  var locations = {};

  var count = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

  for (var i = 0; i < count; i++) {
    var attribute = /** @type {WebGLActiveInfo} */ (
      gl.getActiveAttrib(program, i)
    );
    var { name } = attribute;
    locations[name] = gl.getAttribLocation(program, name);
  }

  return locations;
};

/**
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 */
export var getUniformLocations = (gl, program) => {
  /** @type {Record<string, WebGLUniformLocation>} */
  var locations = {};

  var count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

  for (var i = 0; i < count; i++) {
    var uniform = /** @type {WebGLActiveInfo} */ (
      gl.getActiveUniform(program, i)
    );
    var { name } = uniform;
    locations[name] = /** @type {WebGLUniformLocation} */ (
      gl.getUniformLocation(program, name)
    );
  }

  return locations;
};

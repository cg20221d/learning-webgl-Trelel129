function main() {
  // Ambil canvas
  const canvas = document.getElementById("myCanvas");
  // Ambil konteks WebGL
  const gl = canvas.getContext("webgl");

  const vertexShaderCode = `
    void main() {
      gl_Position = vec4(0.3, 0.5, 0.0, 1.0);
      gl_PointSize = 10.0;
    }
  `;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  const fragmentShaderCode = `
    void main() {
      gl_FragColor = vec4(0.5, 0.0, 0.0, 1.0);
    }
  `;

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  // Set warna background
  gl.clearColor(0.9, 0.2, 0.0, 0.5);
  // Bersihkan buffer warna
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Gambar titik
  gl.drawArrays(gl.POINTS, 0, 1);
}
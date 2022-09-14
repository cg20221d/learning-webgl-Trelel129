function main() {
  // Ambil canvas
  var canvas = document.getElementById("myCanvas");
  // Ambil konteks WebGL
  var gl = canvas.getContext("webgl");

  //posisi
  var vertexShaderCode = `
    void main() {
      float x = 0.0;
      float y = 0.0;
      gl_Position = vec4(x, y, 0.0, w);
      gl_PointSize = 10.0;
    }
  `;

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  //warna
  var fragmentShaderCode = `
    void main() {
      float r = 0.0;
      float g = 0.0;
      float b = 1.0;
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `;

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  // Set warna background
  //gl.clearColor(0.9, 0.2, 0.0, 0.5);
  // Bersihkan buffer warna
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Gambar titik
  gl.drawArrays(gl.POINTS, 0, 1);
}
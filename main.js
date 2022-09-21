function main() {
  // Ambil canvas
  var canvas = document.getElementById("myCanvas");
  // Ambil konteks WebGL
  var gl = canvas.getContext("webgl");
  //array 1 dimensi
var vertices = [
  0.5, 0.5, 0.0, 1.0, 1.0, // A: kanan atas   (CYAN)
  0.0, 0.0, 1.0, 0.0, 1.0, // B: bawah tengah (MAGENTA)
  -0.5, 0.5, 1.0, 1.0, 0.0, // C: kiri atas   (KUNING)
  0.0, 1.0, 1.0, 1.0, 1.0 // D: atas tengah   (PUTIH)
];

var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  //posisi
  var vertexShaderCode = `
  attribute vec2 aPosition;
  attribute vec2 aColor;
  varying vec3 vColor;
    void main() {
      float x = aPosition.x;
      float y = aPosition.y;
      gl_PointSize = 10.0;
      gl_Position = vec4(aPosition.xy, 0.0, 1.0);
      vColor = aColor;
    }
  `;

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  //warna
  var fragmentShaderCode = `
    precision mediump float;
    varying vec3  vColor;
    void main() {
      gl_FragColor = vec4(vColor, 1.0);
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

  //Kita mengajari GPU bagaimana caranya mengoleksi
  // nilai posisi dari ARRAY_BUFFER
  // untuk setiap vertex yang sedang diproses
  var aPosition = gl.getAttribLocation(shaderProgram,"aPosition");
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 
  5 * Float32Array.BYTES_PER_ELEMENT, 
  0);
gl.enableVertexAttribArray(aPosition);

  var aColor = gl.getAttribLocation(shaderProgram,"aColor");
gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 
  5 * Float32Array.BYTES_PER_ELEMENT, 
  2 * Float32Array.BYTES_PER_ELEMENT);
gl.enableVertexAttribArray(aColor);

  // Set warna background
  gl.clearColor(1.0, 1.0, 0.0, 1.0);
  // Bersihkan buffer warna
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Gambar titik
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

//TRIANGLE FAN --> berdasarkan titik pusat
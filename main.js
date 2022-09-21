function main() {
  var kanvas = document.getElementById("myCanvas");
  var gl = kanvas.getContext("webgl");

  var vertices = [
      0.5, 0.5, 0.0, 1.0, 1.0,   // A: kanan atas    (BIRU LANGIT)
      0.0, 0.0, 1.0, 0.0, 1.0,   // B: bawah tengah  (MAGENTA)
      -0.5, 0.5, 1.0, 1.0, 0.0,  // C: kiri atas     (KUNING)
      0.0, 1.0, 1.0, 1.0, 1.0    // D: atas tengah   (PUTIH)
  ];

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // posisi
  var vertexShaderCode =  `
  attribute vec2 aPosition;
  attribute vec3 aColor;
  uniform float uTheta;
  varying vec3 vColor;
  void main() {
      float x = aPosition.x;
      float y = aPosition.y;      
      gl_Position.x = -sin(uTheta) * aPosition.x + cos(uTheta) * aPosition.y;
      gl_Position.y = cos(uTheta) * aPosition.x + sin(uTheta) * aPosition.y;
      gl_Position = vec4(x, y, 0.0, 1.0);
      vColor = aColor;
  }
  `;
  
  var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShaderObject, vertexShaderCode);
  gl.compileShader(vertexShaderObject);   // sampai sini sudah jadi .o

  // warna
  var fragmentShaderCode = `
  precision mediump float;
  varying vec3 vColor;
  void main() {
      gl_FragColor = vec4(vColor, 1.0);
  }
  `;
  var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
  gl.compileShader(fragmentShaderObject);   // sampai sini sudah jadi .o

  var shaderProgram = gl.createProgram(); // wadah dari executable (.exe)
  gl.attachShader(shaderProgram, vertexShaderObject);
  gl.attachShader(shaderProgram, fragmentShaderObject);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  //variabel lokal
  var theta = 0.0;

  //Variabel pointer ke GLSL
  var uTheta = gl.getUniformLocation(shaderProgram, "uTheta")

  // Kita mengajari GPU bagaimana caranya mengoleksi
  //  nilai posisi dari ARRAY_BUFFER
  //  untuk setiap verteks yang sedang diproses
  var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 
      5 * Float32Array.BYTES_PER_ELEMENT, 
      0);
  gl.enableVertexAttribArray(aPosition);

  var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 
      5 * Float32Array.BYTES_PER_ELEMENT, 
      2 * Float32Array.BYTES_PER_ELEMENT);
  gl.enableVertexAttribArray(aColor);

 // Set warna background
  function render() {
    gl.clearColor(1.0,      0.65,    0.0,    1.0);  // Oranye
    //            Merah     Hijau   Biru    Transparansi
    gl.clear(gl.COLOR_BUFFER_BIT);
    theta+= 0.1;
    gl.uniform1f(uTheta, theta);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    setInterval(render,1000);
  }
}
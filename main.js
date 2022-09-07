function main(){
    var kanvas = document.getElementById("kanvas");
    var gl = kanvas.getContext("webgl");

    //vertex shader
    var vertexShaderCode = `
    "void main(){
        
    }
    `;
    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject); //sampai sini sudah jadi .o

    //fragment shader
    var fragmentShaderCode =`
    void main(){

    }`;
    var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject); //sampai sini sudah jadi .o

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.clearColor(0.0,0.0,0.0,0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
function initShader(gl, vertexShaderSource, fragmentShaderSource) {
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    gl.useProgram(program);
    console.log(gl.getShaderInfoLog(fragmentShader));
    return program;
}

function bindAttribute(cxt, attributeName, data, program) {

    var buffer = cxt.createBuffer();
    cxt.bindBuffer(cxt.ARRAY_BUFFER, buffer);
    cxt.bufferData(cxt.ARRAY_BUFFER, data, cxt.STATIC_DRAW);

    var posLocation = cxt.getAttribLocation(program, attributeName);
    cxt.vertexAttribPointer(posLocation, 2, cxt.FLOAT, false, 0, 0);
    cxt.enableVertexAttribArray(posLocation);

}

// 矩阵相乘
function multiplyMatrix(matrixA, matrixB) {
    var result = new Float32Array(16);
    for (var i = 0; i < 4; i++) {
        result[i] =
            matrixA[i] * matrixB[0] + matrixA[i + 4] * matrixB[1] + matrixA[i + 8] * matrixB[2] + matrixA[i + 12] * matrixB[3];
        result[i + 4] =
            matrixA[i] * matrixB[4] + matrixA[i + 4] * matrixB[5] + matrixA[i + 8] * matrixB[6] + matrixA[i + 12] * matrixB[7];
        result[i + 8] =
            matrixA[i] * matrixB[8] + matrixA[i + 4] * matrixB[9] + matrixA[i + 8] * matrixB[10] + matrixA[i + 12] * matrixB[11];
        result[i + 12] =
            matrixA[i] * matrixB[12] + matrixA[i + 4] * matrixB[13] + matrixA[i + 8] * matrixB[14] + matrixA[i + 12] * matrixB[15];

    }
    return result;
}


// 创建旋转矩阵
function createXZMatrix(angle) {
    var t = Math.PI * angle / 180;
    var sinB = Math.sin(t);
    var cosB = Math.cos(t);
    return new Float32Array([
        cosB, sinB, 0.0, 0.0,
        -sinB, cosB, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ])
}

// 创建缩放矩阵
function createSFMatrix(sx, sy) {
    return new Float32Array([
        sx, 0.0, 0.0, 0.0,
        0.0, sy, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

// 创建平移矩阵
function createPYMatrix(tx, ty) {
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        tx, ty, 0.0, 1.0
    ]);
}















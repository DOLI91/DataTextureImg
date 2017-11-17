attribute vec3 position;
attribute vec3 translation;
attribute vec3 rotation;
attribute vec3 scale;

attribute vec2 uvOffset;
attribute vec2 uvScale;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec2 vUv;

mat4 Translation(vec3 v) {

    return mat4(

        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        v.x, v.y, v.z, 1.0

    );

}

mat4 rotateX(float x) {

return mat4(
    
1.0, 0.0, 0.0, 0.0,
0.0, cos(x), -sin(x), 0.0,
0.0, sin(x), cos(x), 0.0,
0.0, 0.0, 0.0, 1.0

);

}

mat4 rotateY(float y) {

return mat4(

cos(y), 0.0, sin(y), 0.0,
0.0, 1.0, 0.0, 0.0,
-sin(y), 0.0, cos(y), 0.0,
0.0, 0.0, 0.0, 1.0 

);

}

mat4 rotateZ(float z) {

return mat4(

cos(z), -sin(z), 0.0, 0.0,
sin(z), cos(z), 0.0, 0.0,
0.0, 0.0, 1.0, 0.0,
0.0, 0.0, 0.0, 1.0

);

}

mat4 Rotate(vec3 v) {

    return (rotateX(v.x) * rotateY(v.y) * rotateZ(v.z));

}

mat4 Scale(vec3 v) {

    return mat4(

        v.x, 0.0, 0.0, 0.0,
        0.0, v.y, 0.0, 0.0,
        0.0, 0.0, v.z, 0.0,
        0.0, 0.0, 0.0, 1.0

    );

}

void main() {

    vUv = uv;

    // vUv.x = uv.x * uvScale.x + uvOffset.x;
    
    // vUv.y = uv.y * uvScale.y + uvOffset.y;

    mat4 Rotation = Rotate(rotation);

    vec4 pos = Translation(translation) * Rotation * Scale(scale) * vec4(position, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * pos;

}
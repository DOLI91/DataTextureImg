precision highp float;

uniform sampler2D tex;

varying vec2 vUv;

void main() {

    vec3 diffuse = texture2D(tex, vUv).rgb;

    gl_FragColor = vec4(diffuse, 1.0); 
    
    // gl_FragColor = vec4(vec3(1.0), 1.0); 

}
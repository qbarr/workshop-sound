precision highp float;

varying vec3 vColor;
varying vec2 vUv;
varying vec3 vPos;
varying float vIsActive;
varying float vIsOn;
varying float vGroup;

uniform float uTime;
uniform float uGroup;


void main() {
    float isOn = 0.;
    if(vGroup ==uGroup) {
        isOn =1.;
    }

   gl_FragColor = vec4(isOn * uGroup * 0.25 * vec3(0.,0.,1.), 1.0);
}

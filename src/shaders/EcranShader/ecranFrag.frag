precision highp float;

varying vec3 vColor;
varying vec2 vUv;
varying float vIsActive;
varying float vIsOn;

uniform float uTime;

void main() {
 //  vec2 newUv= vec2(vUv.x + uTime* .01, vUv.y + uTime );
   vec2 z = max(vec2(0.05), mod(vUv, 0.2));
   float newZ = z.x;
//   z = min(z, vec2(0.1));
   gl_FragColor = vec4( vColor * newZ, 1.);
}

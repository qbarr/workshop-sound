precision highp float;

//attribute float aIsActive;
attribute vec3 aOffset;
attribute vec3 aColor;
attribute float aIsOn;

uniform float uTime;

varying vec2 vUv;
varying float vIsActive;
varying vec3 vColor;
varying float vIsOn;

void main() {

   vUv = uv;
   vIsOn= aIsOn;
   vColor = aColor;
  // vIsActive = aIsActive;
   vec4 pos = projectionMatrix * modelViewMatrix * vec4( position + aOffset, 1.0 );
  // pos.y += sin(aOffset.x + aOffset.y + uTime) / 3.;
   gl_Position = pos;
   gl_PointSize = 10.;
}

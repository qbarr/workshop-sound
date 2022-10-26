precision highp float;

//attribute float aIsActive;
attribute vec3 aOffset;
attribute float aIsOn;
attribute vec3 aColor;

uniform float uTime;

varying vec2 vUv;
varying float vIsActive;
varying vec3 vColor;
varying float vIsOn;



void main() {

   vUv = uv;
   vIsOn= aIsOn;
   vColor = aColor;

   vec4 pos = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
   gl_Position = pos;
}

precision highp float;

//attribute float aIsActive;
attribute vec3 aOffset;
attribute vec3 aColor;
attribute float aIsOn;
attribute float aGroup;

uniform float uTime;

varying vec2 vUv;
varying float vIsActive;
varying vec3 vColor;
varying float vIsOn;
varying float vGroup;



void main() {

   vUv = uv;
   vIsOn= aIsOn;
   vColor = aColor;
   vGroup = aGroup;

   vec4 pos = projectionMatrix * modelViewMatrix * vec4( position + aOffset, 1.0 );
   pos.y += 5.* sin(aOffset.x + aOffset.y + uTime);

   gl_Position = pos;
}

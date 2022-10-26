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
varying float vGroup;
varying vec3 vPos;
varying float vIsOn;

void main() {

   vUv = uv;
   vGroup= aGroup;
   vColor = aColor;
   vPos = position;
   vIsOn = aIsOn;
  // vIsActive = aIsActive;
   vec4 pos = projectionMatrix * modelViewMatrix * vec4( position  , 1.0 );
  // pos.y += sin(aOffset.x + aOffset.y + uTime) / 3.;
   gl_Position = pos;

}

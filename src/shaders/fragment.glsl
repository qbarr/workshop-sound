precision highp float;

varying vec3 vColor;
varying vec2 vUv;
varying float vIsActive;
varying float vIsOn;

void main() {
   float stepp = step(0.95, vUv.x);
   float stepp2 = 1.- step(0.05, vUv.x);
   float steppY = step(0.95, vUv.y);
   float steppY2 = 1.- step(0.05, vUv.y);
   float border = stepp + stepp2 + steppY + steppY2;
   if(vIsOn == 0.) {
      border = 1.0;
   }
   gl_FragColor = vec4(vec3(0.,0., border), 1.);
}

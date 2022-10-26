import * as THREE from 'three';

import vertexShader from '../../shaders/AbstractShader/abstract.vert'
import fragmentShader from '../../shaders/AbstractShader/abstract.frag'

export default class Blob extends THREE.Object3D {
  constructor(size, speed, color, density, strength, offset) {
    super();

    this.geometry = new THREE.IcosahedronGeometry(size, 64);
    this.material = new THREE.ShaderMaterial({
      vertexShader ,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uNoiseDensity: { value: density },
        uNoiseStrength: { value: strength },
        uFreq: { value: 3 },
        uAmp: { value: 6 },
        uHue: { value: color },
        uOffset: { value: offset },
        red: { value: 0 },
        green: { value: 0 },
        blue: { value: 0 },
        uAlpha: { value: 1.0 },
      },
      defines: {
        PI: Math.PI
      },
      // wireframe: true,
      // side: THREE.DoubleSide
      transparent: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
   // this.mesh.position.set(200,0,500)
    this.add(this.mesh);
  }

  update(){
    this.material.uniforms.uTime.value += 0.03;
   // this.mesh.position.z -= 0.08
  }

}
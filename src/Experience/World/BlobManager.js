import gsap from "gsap";
import Experience from "../Experience";
import Blob from "./Blob";


export default class BlobManager {

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.blobs = []

        this.addBlobs()

        this.tl = gsap.timeline({
            delay: 0.25,
          })

        /* this.tl
            .add(this.animBlobs(), '-=1.5') */
    }


    addBlobs() {    
        // size, speed, color, freq, density, strength, offset
        this.blob1 = new Blob(1.75, 0.3, 0.5, 1.5, 0.12, Math.PI * 1);    
        this.blob2 = new Blob(6.0, 0.15, 0.4, 2.0, 0.3, Math.PI * 2);   
        this.blob3 = new Blob(0.8, 0.5, 0.1, 2.0, 0.05, Math.PI * 0.5);    
    
        this.blob1.position.set(-8.5, 3.25, 2);
        this.blob2.position.set(-10, 5, -40);
        this.blob3.position.set(-1, -4, 4);
    
        this.blob1.rotation.set(-0.4, 0, 0.5);
        this.blob2.rotation.set(0.4, 1.0, -0.4);
        this.blob3.rotation.set(0, 0, 0);
    
        this.blobs = [this.blob2];
        
        this.scene.add(...this.blobs);
      }

      animBlobs() {
        // Move Threejs Blobs
        console.log('animblobs');
        const tl = gsap.timeline({
          defaults: {
            duration: 2,
            ease: 'power3.inOut'
          },
        });
        const uniformAlphas = [
          this.blobs[0].mesh.material.uniforms.uAlpha,
          this.blobs[1].mesh.material.uniforms.uAlpha,
          this.blobs[2].mesh.material.uniforms.uAlpha,
        ];
    
        tl
          .from(this.blobs[0].position, { z: -5 })
          .from(this.blobs[1].position, { z: -30 }, '-=1.75')
          .from(this.blobs[2].position, { z: 12 }, '-=1.75')
          .from(uniformAlphas, {
            value: 0,
            stagger: 0.2,
            ease: 'power3.inOut'
          }, 0);
    
        return tl;
      }

      update() {
        if(this.blob1) this.blob1.update()
        if(this.blob2) this.blob2.update()
        if(this.blob3) this.blob3.update()
      }
}


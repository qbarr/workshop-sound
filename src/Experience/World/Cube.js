import Experience from '../Experience.js'
import vertexShader from '../../shaders/vertex.glsl'
import fragmentShader from '../../shaders/fragment.glsl'
import * as THREE from 'three'

export default class Cube
{
    constructor()
    {
        this.audio = null
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.audio = this.experience.audio
        this.camera = this.experience.camera
        this.time = this.experience.time
        this.setMaterial()
        //this.setModel()
       /*   this.setInstancedGeometry({
            geometry: new THREE.PlaneGeometry(1, 1, 10, 10), 
            color: {r: 1, g: 0, b: 0},
            nbLines: 4, 
            nbColumns: 4,
            nbDepth: 4,
            offset: -30,
            gap: {x: 1, y: 1, z: 1}
        })  */
        this.setInstancedGeometry({
            geometry: new THREE.BoxGeometry(15,15, 15), 
            color: {r: 1, g: 1, b: 0},
            nbLines: 11, 
            nbDepth: 4,
            nbColumns: 8,
            gap: {x: 60, y: 40,  z: 60},
            offset: {x: 0, y:0, z: -170 } 

        })

        this.setInstancedGeometry({
            geometry: new THREE.PlaneGeometry(15,15), 
            color: {r: 0, g: 0, b: 1},
            nbLines: 3, 
            nbDepth: 1,
            nbColumns: 3,
            gap: {x: 160, y: 100,  z: 60},
            offset: {x: 0, y:0, z: 200 } 

        })
       // this.setModel()

       
       this.audio.on('beat', ()=> {
        this.updateValues()
     })

        this.setGui()
    }

    setInstancedGeometry({geometry,color, nbLines, nbColumns,nbDepth, gap, offset = 0}) {
        this.meshes =[]
        this.instancedGeometry = new THREE.InstancedBufferGeometry()  
        this.instancedGeometry.copy(geometry)

        const aOffsets = []
        const aPositions = []
        const aColors = []
        const aIsOns = []    
        

        for(let i=-nbLines /2; i< nbLines/2; i++) {
            for(let j=-nbDepth/2 ; j<nbDepth/2 ; j++) {
                for(let k=-nbColumns/2; k< nbColumns/2; k++) {
                    let x = i 
                    let y = k 
                    let z = j

                   // if(x > 2  & x&
                  //  if(x===0.5) i+=offset
                    aOffsets.push( x * gap.x, y * gap.y , z  * gap.z)
                    aColors.push(color.r,color.g,color.b)
                    aIsOns.push(Math.random() < 0.9 ? 1.0 : 0.0)
                }
            }
        }



        this.instancedGeometry.instanceCount = aOffsets.length /3

        this.instancedGeometry.setAttribute( 'aOffset', new THREE.InstancedBufferAttribute( new Float32Array( aOffsets ), 3) );
        this.instancedGeometry.setAttribute( 'aColor', new THREE.InstancedBufferAttribute( new Float32Array( aColors ), 3) );
        this.instancedGeometry.setAttribute( 'aIsOn', new THREE.InstancedBufferAttribute( new Float32Array( aIsOns ), 1) );

        this.mesh = new THREE.Mesh(this.instancedGeometry,this.material)

        this.mesh.frustumCulled = false
        this.mesh.position.set(offset.x, offset.y,offset.z)
        if(offset.z === 200) this.aIsOns = aIsOns
        this.scene.add(this.mesh) 
    }


    setMaterial() {
        this.uniforms = {
            uTime: { value: 0.0 }
        };

         this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
          //  wireframe: true
        });
    }

    setGui() {
        if(this.debug.active) {

            this.debugFolder = this.debug.ui.addFolder('plane')
            this.debugFolder.add(this.mesh.position, 'x', -10, 10)
            this.debugFolder.add(this.mesh.position, 'y', -10, 10)
            this.debugFolder.add(this.mesh.position, 'z', -10, 10)

            this.debugFolder.add(this.mesh.rotation, 'x', 0, 2* Math.PI)
            this.debugFolder.add(this.mesh.rotation, 'y', 0, 2* Math.PI)
            this.debugFolder.add(this.mesh.rotation, 'z', 0, 2* Math.PI)
        }
    }

    interval() {
        const aIsOns=[]
        for(let i=-this.nbLines/2; i<this.nbLines/2; i+=2) {
            for(let j=-this.nbColumns/2; j<this.nbColumns/2; j+=3) {
                aIsOns.push(Math.random() < 0.2 ? 1.0 : 0.0)
            }
        } 

        this.instancedGeometry.setAttribute( 'aIsOn', new THREE.InstancedBufferAttribute( new Float32Array( aIsOns ), 1) );
    }

    updateValues() {    



        const nbLines= 11
        const nbColumns = 8
        const nbDepth =4
        const newAons = []
        for(let i=-nbLines /2; i< nbLines/2; i++) {
            for(let j=-nbDepth/2 ; j<nbDepth/2 ; j++) {
                for(let k=-nbColumns/2; k< nbColumns/2; k++) {
                    let x = i 
                    let y = k 
                    let z = j
                     newAons.push(Math.random() < 0.7 ? 1.0 : 0.0)
                }
            }
        }
        
    /*     for(let i=2; i< nbLines/2; i++) {
            for(let j=-nbDepth/2; j<nbDepth/2; j++) {
                for(let k=-nbColumns/2; k< nbColumns/2; k++) {
                    let x = i 
                    let y = k 
                    let z = j

                   newAons.push(Math.random() < 0.9 ? 1.0 : 0.0)
                }
            }
        } */
        console.log(newAons.length);
        this.aIsOns = newAons
        this.instancedGeometry.setAttribute( 'aIsOn', new THREE.InstancedBufferAttribute( new Float32Array( this.aIsOns ), 1) );

    }

  
    update() {
        this.material.uniforms.uTime.value += .05
    }
}
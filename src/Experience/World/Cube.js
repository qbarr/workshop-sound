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
            color: {r: 0, g: 0, b: 1},
            nbLines: 11, 
            nbDepth: 4,
            nbColumns: 8,
            gap: {x: 60, y: 40,  z: 60},
            offset:5

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
        this.aIsOns = []    
        

        for(let i=-nbLines /2; i< nbLines/2; i++) {
            for(let j=-nbDepth/2 ; j<nbDepth/2 ; j++) {
                for(let k=-nbColumns/2; k< nbColumns/2; k++) {
                    let x = i 
                    let y = k 
                    let z = j

                   // if(x > 2  & x&
                  //  if(x===0.5) i+=offset
                    aOffsets.push( x * gap.x, y * gap.y , z  * gap.z)
                    aColors.push(1,0,0)
                    this.aIsOns.push(Math.random() < 0.9 ? 1.0 : 0.0)
                }
            }
        }
        
       /*  for(let i=2; i< nbLines/2; i++) {
            for(let j=-nbDepth/2; j<nbDepth/2; j++) {
                for(let k=-nbColumns/2; k< nbColumns/2; k++) {
                    let x = i 
                    let y = k 
                    let z = j

                  //  if(x===0.5) i+=offset
                    aOffsets.push( x * gap.x, y * gap.y , z  * gap.z)
                    aColors.push(0,0,1)
                    this.aIsOns.push(Math.random() < 0.9 ? 1.0 : 0.0)
                }
            }
        } */


        // for(let i=-nbLines/2; i< nbLines/2; i++) {
        //     for(let j=-nbDepth/2; j<nbDepth/2; j++) {
        //         for(let k=-nbColumns/2; k< nbColumns/2; k++) {
        //             let x = i 
        //             let y = k 
        //             let z = j

        //           //  if(x===0.5) i+=offset
        //             aOffsets.push( x * gap.x, y * gap.y , z  * gap.z)
        //             aColors.push(0,0,1)
        //             this.aIsOns.push(Math.random() < 0.9 ? 1.0 : 0.0)
        //         }
        //     }
        // }


        this.instancedGeometry.instanceCount = aOffsets.length /3
        
        this.instancedGeometry.setAttribute( 'aOffset', new THREE.InstancedBufferAttribute( new Float32Array( aOffsets ), 3) );
        this.instancedGeometry.setAttribute( 'aColor', new THREE.InstancedBufferAttribute( new Float32Array( aColors ), 3) );
        this.instancedGeometry.setAttribute( 'aIsOn', new THREE.InstancedBufferAttribute( new Float32Array( this.aIsOns ), 1) );

        this.mesh = new THREE.Mesh(this.instancedGeometry,this.material)
       // this.mesh.position.set(0,-5,9)
        this.mesh.frustumCulled = false
        this.mesh.position.z  = -170
       // this.mesh.rotateX(Math.PI * 0.5)
        this.scene.add(this.mesh) 
    }

  


    setModel() {
        this.meshes =[]
        this.nbLines = 4
        this.nbColumns = 4
        this.nbDepth = 4
        this.nbInstances =  this.nbColumns * this.nbLines
        this.instancedGeometry = new THREE.InstancedBufferGeometry()  
        this.instancedGeometry.copy(new THREE.BoxGeometry(1, 1))

        const randomActives= []
        const aOffsets = []
        const aPositions = []
        const aColors = []
        this.aIsOns = []
        const rotations = []

        this.nbLines*=2
        this.nbColumns*=2
        for(let i=-this.nbLines/2; i< this.nbLines/2; i++) {
            for(let j=-this.nbDepth/2; j< this.nbDepth/2; j++) {
                for(let k=-this.nbColumns/2; k< this.nbColumns/2; k++) {
                    let x = i 
                    let y = k 
                    let z = j

                    aOffsets.push( x, y , z );
                    aColors.push(0,0,1);
                    this.aIsOns.push(Math.random() < 0.9 ? 1.0 : 0.0)
                }
            }
        }

       this.instancedGeometry.instanceCount = this.nbColumns * this.nbDepth * this.nbLines

        /*  const dummyGeom = new THREE.BoxGeometry(10, 10, 10, 2, 2, 2)
            const matmat = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
            const meshmesh = new THREE.Mesh(dummyGeom, matmat);
            this.scene.add(meshmesh)


            for ( let i = 0; i < dummyGeom.attributes.position.array.length; i += 3) {
                const x = dummyGeom.attributes.position.array[i]
                const y = dummyGeom.attributes.position.array[i +1]
                const z = dummyGeom.attributes.position.array[i +2]
                aOffsets.push( x , y, z);
            } */
        

//        this.instancedGeometry.instanceCount =dummyGeom.attributes.position.array.length/3
        this.instancedGeometry.setAttribute( 'aOffset', new THREE.InstancedBufferAttribute( new Float32Array( aOffsets ), 3) );
        this.instancedGeometry.setAttribute( 'aColor', new THREE.InstancedBufferAttribute( new Float32Array( aColors ), 3) );
        this.instancedGeometry.setAttribute( 'aIsOn', new THREE.InstancedBufferAttribute( new Float32Array( this.aIsOns ), 1) );

        this.mesh = new THREE.Mesh(this.instancedGeometry,this.material)
        this.mesh.frustumCulled = false
        // this.mesh.position.set(0,-5,9)
        // this.mesh.rotateX(Math.PI * 0.5)
        this.scene.add(this.mesh) 
    }

    setMaterial() {
        this.uniforms = {
            uTime: { value: 0.0 },
            uResolution: { value: new THREE.Vector2() },
            uMouse: { value: new THREE.Vector2() },
        //    uTexture: { value: this.resources.items.texture }
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
                     newAons.push(Math.random() < 0.9 ? 1.0 : 0.0)
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

        this.aIsOns = newAons
        this.instancedGeometry.setAttribute( 'aIsOn', new THREE.InstancedBufferAttribute( new Float32Array( this.aIsOns ), 1) );

    }

  
    update() {

    }
}
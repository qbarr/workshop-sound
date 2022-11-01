import Experience from '../Experience.js'
import vertexShader from '../../shaders/vertex.glsl'
import fragmentShader from '../../shaders/fragment.glsl'
import * as THREE from 'three'

export default class InstancedGeometries
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
        this.setCubeMaterial()
    
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
            nbLines: 2, 
            nbDepth: 1,
            nbColumns: 2,
            gap: {x: 160, y: 100,  z: 60},
            offset: {x: 82, y:50, z: 200 } 

        })

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
        const aColors = []
        const aIsOns = []    
        const aGroups = []    
        

        for(let i=-nbLines /2; i< nbLines/2; i++) {
            for(let j=-nbDepth/2 ; j<nbDepth/2 ; j++) {
                for(let k=-nbColumns/2; k< nbColumns/2; k++) {
                    let x = i 
                    let y = k 
                    let z = j

                    aGroups.push(Math.floor(Math.random() *4))
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
        this.instancedGeometry.setAttribute( 'aGroup', new THREE.InstancedBufferAttribute( new Float32Array(  aGroups ), 1) );

        this.mesh = new THREE.Mesh(this.instancedGeometry,this.cubeMaterial)
        this.mesh.frustumCulled = false
        this.mesh.position.set(offset.x, offset.y,offset.z)

        this.scene.add(this.mesh) 
    }


    setCubeMaterial() {
        this.uniforms = {
            uTime: { value: 0.0 },
            uGroup: {value: 0.0}
        };

         this.cubeMaterial = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
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

    updateValues() {    
        this.cubeMaterial.uniforms.uGroup.value = Math.floor(Math.random() *4)
    }

  
    update() {
        this.cubeMaterial.uniforms.uTime.value += .05
    }
}
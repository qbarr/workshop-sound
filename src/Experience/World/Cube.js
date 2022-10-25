import Experience from '../Experience.js'
import vertexShader from '../../shaders/vertex.glsl'
import fragmentShader from '../../shaders/fragment.glsl'
import * as THREE from 'three'

export default class Cube
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.setMaterial()
        this.setModel()
        this.setGui()
        setInterval(() => this.interval(), 1000);
    }


    setModel() {
        this.meshes =[]
        this.nbLines = 15
        this.nbColumns = 20
        this.nbInstances =  this.nbColumns * this.nbLines
        this.instancedGeometry = new THREE.InstancedBufferGeometry()  
        this.instancedGeometry.copy(new THREE.BoxGeometry(1, 1))

        this.instancedGeometry.instanceCount = this.nbInstances
        const randomActives= []
        const aOffsets = []
        const aPositions = []
        const aColors = []
        const aIsOns = []
        const rotations = []

    
        for(let i=-this.nbLines/2; i<this.nbLines/2; i+=2) {
            for(let j=-this.nbColumns/2; j<this.nbColumns/2; j+=3) {
                randomActives.push(Math.random() < 0.4 ? 1.0 : 0.0)
               // console.log(i/this.nbLines, j/this. nbColumns);
              //  positions.push(i / this.nbLines, 0 , j/this.nbColumns)
                aOffsets.push( i , j, Math.random());
              //  aColors.push( Math.random(), Math.random(), Math.random());
                aColors.push(0,0,1);

                aIsOns.push(Math.random() < 0.9 ? 1.0 : 0.0)
               // rotations.push(i / this.nbLines, 0, j / this.nbColumns)
            }
        }

        this.instancedGeometry.instanceCount = this.nbInstances
        this.instancedGeometry.setAttribute( 'aOffset', new THREE.InstancedBufferAttribute( new Float32Array( aOffsets ), 3) );
        this.instancedGeometry.setAttribute( 'aColor', new THREE.InstancedBufferAttribute( new Float32Array( aColors ), 3) );
        this.instancedGeometry.setAttribute( 'aIsOn', new THREE.InstancedBufferAttribute( new Float32Array( aIsOns ), 1) );

        this.mesh = new THREE.Mesh(this.instancedGeometry,this.material)
        this.mesh.position.set(0,-5,9)
        this.mesh.rotateX(Math.PI * 0.5)
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

    update()
    {
        this.uniforms.uTime.value += 0.05;
       

    }
    
}
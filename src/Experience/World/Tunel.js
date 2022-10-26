import Experience from "../Experience"
import * as THREE from 'three'
import gsap from 'gsap'
import faceShaderVert from '../../shaders/FaceShader/faceShader.vert'
import faceShaderFrag from '../../shaders/FaceShader/faceShader.frag'

export default class Tunel {


    constructor() {
        this.experience = new Experience()
        this.audio = this.experience.audio
        this.camera = this.experience.camera
        this.scene = this.experience.scene
        this.tunel = null
        this.faces = []
        this.resources = this.experience.resources

        this.doorIsOpen = false
        this.setGltf()
        this.duplicateTunel()
        this.audio.on('beat', ()=> {
            this.updateValues()
        })


    }

    setTransforms(mesh) {
        mesh.rotation.y = -Math.PI * 0.5
        mesh.scale.set(20,20,20)
        mesh.position.set(0,0, 80)
    }

    setWireframe(mesh) {
        const geometry = new THREE.WireframeGeometry( mesh.geometry );
        const material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 30,side:THREE.DoubleSide  } );
        const edges = new THREE.LineSegments( geometry, material );

        return edges
    }

    setGltf() {

        this.resources.items.tunelModel.scene.traverse((child) => {
          if(child.type == 'Mesh' && child.name.toLowerCase() ===  'tunel') {
  
            
            this.setTransforms(child)
            const edges = this.setWireframe(child)

            this.childMaterial = child.material = new THREE.ShaderMaterial({
                  vertexShader: faceShaderVert,
                  fragmentShader: faceShaderFrag,
                  uniforms: {
                      uTime: {value: 0},
                      uGroup: {value: 0},
                  },
                  side: THREE.DoubleSide
              })
  
              // child.material=  new THREE.MeshBasicMaterial({
              //     vertexColors: true
              // })
  
  
              const positionAttribute = child.geometry.getAttribute( 'position' );
          
              const colors = [];
              const aIsOns = []
              const aGroups = []
              const color = new THREE.Color();
                  
              for ( let i = 0; i < positionAttribute.count; i += 3 ) {
                      const rand = Math.random() > 0.5 ? 1 : 0
                      color.set( 0x000000 );
                      
                      // define the same color for each vertex of a triangle
                      
                      colors.push( color.r, color.g, color.b );
                      colors.push( color.r, color.g, color.b );
                      colors.push( color.r, color.g, color.b );
                  
              }
              const arrayIndex = child.geometry.getIndex().array
  
  
              for(let i = 0; i < arrayIndex.length; i+=6) {
                  const randIsOn = Math.random() > 0.5 ? 1 : 0
                  const randGroup = Math.floor(Math.random()*4)
                                                 
                  aIsOns[arrayIndex[i]*3 + 0] = randIsOn
                  aIsOns[arrayIndex[i]*3 + 1] = randIsOn
                  aIsOns[arrayIndex[i]*3 + 2] = randIsOn
                  
                  aIsOns[arrayIndex[i+1]*3 + 0] = randIsOn 
                  aIsOns[arrayIndex[i+1]*3 + 1] = randIsOn 
                  aIsOns[arrayIndex[i+1]*3 + 2] = randIsOn
      
                  aIsOns[arrayIndex[i+2]*3 + 0] = randIsOn 
                  aIsOns[arrayIndex[i+2]*3 + 1] = randIsOn
                  aIsOns[arrayIndex[i+2]*3 + 2] = randIsOn
      
      
      
                  aIsOns[arrayIndex[i+3]*3 + 0] = randIsOn
                  aIsOns[arrayIndex[i+3]*3 + 1] = randIsOn
                  aIsOns[arrayIndex[i+3]*3 + 2] = randIsOn
                  
                  aIsOns[arrayIndex[i+4]*3 + 0] = randIsOn
                  aIsOns[arrayIndex[i+4]*3 + 1] = randIsOn
                  aIsOns[arrayIndex[i+4]*3 + 2] = randIsOn
      
                  aIsOns[arrayIndex[i+5]*3 + 0] = randIsOn
                  aIsOns[arrayIndex[i+5]*3 + 1] = randIsOn
                  aIsOns[arrayIndex[i+5]*3 + 2] = randIsOn
  
  
  
  
  
  
  
                  aGroups[arrayIndex[i]*3 + 0] = randGroup
                  aGroups[arrayIndex[i]*3 + 1] = randGroup
                  aGroups[arrayIndex[i]*3 + 2] = randGroup
                  
                  aGroups[arrayIndex[i+1]*3 + 0] = randGroup 
                  aGroups[arrayIndex[i+1]*3 + 1] = randGroup 
                  aGroups[arrayIndex[i+1]*3 + 2] = randGroup
      
                  aGroups[arrayIndex[i+2]*3 + 0] = randGroup 
                  aGroups[arrayIndex[i+2]*3 + 1] = randGroup
                  aGroups[arrayIndex[i+2]*3 + 2] = randGroup
      
      
      
                  aGroups[arrayIndex[i+3]*3 + 0] = randGroup
                  aGroups[arrayIndex[i+3]*3 + 1] = randGroup
                  aGroups[arrayIndex[i+3]*3 + 2] = randGroup
                  
                  aGroups[arrayIndex[i+4]*3 + 0] = randGroup
                  aGroups[arrayIndex[i+4]*3 + 1] = randGroup
                  aGroups[arrayIndex[i+4]*3 + 2] = randGroup
      
                  aGroups[arrayIndex[i+5]*3 + 0] = randGroup
                  aGroups[arrayIndex[i+5]*3 + 1] = randGroup
                  aGroups[arrayIndex[i+5]*3 + 2] = randGroup
              }
  
              child.geometry.setAttribute( 'aColor', new THREE.Float32BufferAttribute( colors, 3 ) );
              child.geometry.setAttribute( 'aIsOn', new THREE.Float32BufferAttribute( aIsOns, 3 ) );
              child.geometry.setAttribute( 'aGroup', new THREE.Float32BufferAttribute( aGroups, 3 ) );
          
              child.add(edges)
              this.tunel = child
  
          } else if (child.name.toLowerCase() === 'top' || child.name.toLowerCase() === 'bottom' || child.name.toLowerCase() === 'left' || child.name.toLowerCase() === 'right') {
              const geometry = new THREE.WireframeGeometry( child.geometry );
              const material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 30, side:THREE.DoubleSide  } );
              const edges = new THREE.LineSegments( geometry, material );
              child.rotation.y = -Math.PI * 0.5
              child.scale.set(20,20,20)
              child.position.set(0,0, 80)
              child.add(edges)
              child.material = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide})
              this.faces.push(child)
  
          } else if(child.name.toLowerCase() === 'ecran') {
              this.ecran = child
              child.material = new THREE.MeshBasicMaterial({color: 0x00000, side: THREE.DoubleSide})
              child.rotation.y = -Math.PI * 0.5
              child.scale.set(900,900,900)
              child.position.set(0,0, 80)
          }
  
  
      
        })
        
        this.scene.add(this.tunel)
        this.faces.forEach(face => {
          this.scene.add(face)
        })
  
        this.scene.add(this.ecran)
        
      }
      duplicateTunel() {
        this.tunel2 = this.tunel.clone()
        this.ecran2 = this.ecran.clone()
        this.faces2 = []
        this.faces.forEach(face => {
            this.faces2.push(face.clone())
        })

        this.group = new THREE.Group()
        this.group.add(this.tunel2)
        this.group.add(this.ecran2)
        this.group.position.set(0,0, -350)
        this.group.rotation.y = Math.PI
        this.scene.add(this.group)
      }

      isCloseToDoor() {

        if(this.doorIsOpen) return

        const offset = 25
        const distance = 40
        console.log('hello');
        if(Math.abs(this.faces[0].position.z - this.camera.instance.position.z) < distance) {
            console.log('hello');
            for(let i=0; i<this.faces.length; i++) {
                const pos = this.faces[i].position

                if(this.faces[i].name === 'bottom') {
                    console.log(pos);
                    gsap.to(this.faces[i].position, { duration: 5, y: pos.y - offset})
                }

                if(this.faces[i].name === 'top') {
                    gsap.to(this.faces[i].position, { duration: 10, y: pos.y + offset });
                }

                if(this.faces[i].name === 'left') {
                    gsap.to(this.faces[i].position, { duration: 10, x: pos.y -offset });
                }

                if(this.faces[i].name === 'right') {
                    gsap.to(this.faces[i].position, { duration: 10, x: pos.y +offset  });
                }
            }
            this.doorIsOpen = true

        } 
    }

    updateValues() {
        this.tunel.material.uniforms.uGroup.value =  Math.floor(Math.random() * 4)

    }

    update()
    {
        this.isCloseToDoor()
     //   this.childMaterial.uniforms.uTime.value += 0.05;
    }
}
import Experience from "../Experience"
import * as THREE from 'three'
import gsap from 'gsap'
import faceShaderVert from '../../shaders/FaceShader/faceShader.vert'
import faceShaderFrag from '../../shaders/FaceShader/faceShader.frag'
import ecranVert from '../../shaders/EcranShader/ecranVert.vert'
import ecranFrag from '../../shaders/EcranShader/ecranFrag.frag'

export default class Tunel {


    constructor() {
        this.experience = new Experience()
        this.audio = this.experience.audio
        this.camera = this.experience.camera
        this.scene = this.experience.scene
        this.tunel = null
        this.doors = []
        this.backDoor = []
        this.frontDoor = []
        this.resources = this.experience.resources
        this.ecranMaterial = new THREE.ShaderMaterial({
            vertexShader: ecranVert,
            fragmentShader: ecranFrag,
            uniforms:  {
                uTime: { value: 0 },
            },
            side:THREE.DoubleSide
        })
        this.doorsOpens = []
        this.setGltf()
        this.duplicateTunel()
        this.audio.on('beat', ()=> {
            this.updateValues()
        })
        this.shiftDoor()
        
        this.endGame = false
    }

    isEndGame() {
        if(this.endGame) return
        if(this.backDoor[0].position.z - 550 > this.camera.instance.position.z) {
            this.endGame = true
            this.audio.stopAudio()
        }

    }

    shiftDoor() {
        const offset = 0.08
        for(let i=0; i< this.backDoor.length; i++) {
            switch(this.backDoor[i].name) {
                case 'right':
                    this.backDoor[i].position.x += offset
                    break;
                case 'left':
                    this.backDoor[i].position.x -= offset
                    break;
                case 'top':
                    this.backDoor[i].position.y += offset
                    break;
                case 'bottom':
                    this.backDoor[i].position.y -= offset

                    break;
            }
        }

        console.log(this.backDoor[0].position);
       
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
  
              const positionAttribute = child.geometry.getAttribute( 'position' );
          
              const colors = [];
              const aIsOns = []
              const aGroups = []
                  
              for ( let i = 0; i < positionAttribute.count; i ++ ) {
                      colors.push(0,0,1 );
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
  
          } else if (child.name.toLowerCase().startsWith('top') || child.name.toLowerCase().startsWith('bottom') || child.name.toLowerCase().startsWith('left')  || child.name.toLowerCase().startsWith('right')) {
              const geometry = new THREE.WireframeGeometry( child.geometry );
              const material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 30, side:THREE.DoubleSide  } );
              const edges = new THREE.LineSegments( geometry, material );
              child.rotation.y = -Math.PI * 0.5
              child.scale.set(20,20,20)
              child.position.set(0,0, 80)
              child.add(edges)
              child.material = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide})

              this.backDoor.push(child)
  
          } else if(child.name.toLowerCase() === 'ecran') {
              this.ecran = child
              child.material = new THREE.MeshBasicMaterial({color: 0x00000, side: THREE.DoubleSide})
              child.rotation.y = -Math.PI * 0.5
              child.scale.set(900,900,900)
              child.material = this.ecranMaterial

              const colors =[]
              for(let i=0; i< child.geometry.attributes.position.array.length; i+=3) {
                    colors.push(0,0,1)
              }

              child.geometry.setAttribute( 'aColor', new THREE.Float32BufferAttribute( colors, 3 ) );

              child.position.set(0,0, 80)
          }
  
  
      
        })
        
        this.scene.add(this.tunel)
        this.doors = this.frontDoor.concat(this.backDoor)

        this.frontDoor.forEach(face => {
          this.scene.add(face)
        })
  
        this.backDoor.forEach(face => {
            this.scene.add(face)
        })
        
        this.scene.add(this.ecran)
        
      }
      duplicateTunel() {
        const newMaterialTunel = new THREE.LineBasicMaterial( { color: 0x592693, linewidth: 30, side:THREE.DoubleSide  } );
        this.tunel2 = this.tunel.clone()
        this.tunel2.children[0].material = newMaterialTunel

        const tunelColors =[]
        for(let i=0; i< this.tunel2.geometry.getAttribute('position').count; i++) {
            tunelColors.push(89/255,38/255,147/255)

        }
        
        this.tunel2.geometry = this.tunel.geometry.clone()
        this.tunel2.geometry.setAttribute( 'aColor', new THREE.Float32BufferAttribute( tunelColors, 3 ) );

        this.ecran2 = this.ecran.clone()
        this.ecran2.geometry = this.ecran.geometry.clone()

        const ecranColors =[]
        for(let i=0; i< this.ecran2.geometry.getAttribute('position').count; i++) {
            ecranColors.push(1,1,0)
        }
        
        this.ecran2.geometry.setAttribute( 'aColor', new THREE.Float32BufferAttribute( ecranColors, 3 ) );


        this.backDoor2 = []
        this.backDoor.forEach((door,index) => {
            this.backDoor2.push(door.clone())
            this.backDoor2[index].children[0].material =new THREE.LineBasicMaterial( { color: 0xffff00, linewidth: 30, side:THREE.DoubleSide  } );

        })

    
        this.group = new THREE.Group()
        this.group.add(this.tunel2)
        this.group.add(this.ecran2)
        this.backDoor2.forEach(door => {
            this.group.add(door)
        })
        this.group.position.set(0,0, -340)
        this.group.rotation.y = Math.PI
        this.scene.add(this.group)
      }

      isCloseToDoor() {

        this.moveFaces(this.backDoor,25,40)
         this.moveFaces(this.backDoor2,25,40)
       
      }

    moveFaces(door, offset, distance) {
        if(this.doorsOpens.includes(door)) return
        const newDoors  = new THREE.Vector3()

        //door[0].getWorldPosition(newDoors)
        let max = door[0].position
        if(door === this.backDoor) max = door[0].position.z 
        if(door === this.backDoor2) max = door[0].position.z -340
        

        if( (Math.abs(max - this.camera.instance.position.z) < distance)) {


            for(let i=0; i<door.length; i++) {
                const pos = door[i].position

                if(door[i].name.startsWith('bottom')) {

                    gsap.to(door[i].position, { duration: 5, y: pos.y - offset})
                }

                if(door[i].name.startsWith('top')) {
                    gsap.to(door[i].position, { duration: 10, y: pos.y + offset });
                }

                if(door[i].name.startsWith('left')) {
                    gsap.to(door[i].position, { duration: 10, x: pos.y -offset });
                }

                if(door[i].name.startsWith('right')) {
                    gsap.to(door[i].position, { duration: 10, x: pos.y +offset  });
                }
            }
            this.doorsOpens.push(door)
        } 
    }


    

    updateValues() {
        this.tunel.material.uniforms.uGroup.value =  Math.floor(Math.random() * 4)
  }

    update()
    {
        this.ecran.material.uniforms.uTime.value += 0.05
        this.isCloseToDoor()
        this.isEndGame()
     //   this.childMaterial.uniforms.uTime.value += 0.05;
    }
}
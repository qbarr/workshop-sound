import * as THREE from 'three'
import Experience from './Experience.js'
export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug
        this.audio = this.experience.audio
        this.start = false
        this.newMouse = new THREE.Vector2()
        this.raycaster = new THREE.Raycaster()

        this.setInstance()
        this.setGUI()
        
        this.audio.on('beat',()  => this.startCamera())
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 2000)
        this.instance.position.set(0, 0, 600)
        this.scene.add(this.instance)
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    setGUI() {
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('camera')

            this.debugFolder.add(this.instance.position, 'x', -100, 100)
            this.debugFolder.add(this.instance.position, 'y', -100, 100)
            this.debugFolder.add(this.instance.position, 'z', -100, 100)
        }
    }

    startCamera() {
        this.start = true
    }
    

    update()
    {        
        this.raycaster.setFromCamera(this.newMouse, this.instance );
        if(!this.start) return
        this.instance.position.z -= 0.9
    }

}
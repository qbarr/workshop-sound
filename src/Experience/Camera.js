import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        this.setInstance()
        this.setControls()
        this.setGUI()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 2000)
        this.instance.position.set(0, 0, 40)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
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

    update()
    {
        this.controls.update()
    }
}
import Experience from '../Experience.js'
import InstancedGeometries from './InstancedGeometries.js'
import Tunel from './Tunel.js'


export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.renderer = this.experience.renderer

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.cube = new  InstancedGeometries()
            this.tunel = new Tunel()
            this.renderer.setSelectedObjects()
        })
        
    }

    update()
    {
        if(this.cube) this.cube.update()
        if(this.tunel) this.tunel.update()
    }
}
import Experience from '../Experience.js'
import Cube from './Cube.js'
import Environment from './Environment.js'


export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.renderer = this.experience.renderer
        console.log(this.renderer)
        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.environment = new Environment()
            this.cube = new  Cube()
            this.renderer.setSelectedObjects()
        })
        
    }

    update()
    {
        if(this.cube) this.cube.update()
    }
}
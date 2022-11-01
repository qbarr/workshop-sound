import * as THREE from 'three'
import Experience from './Experience.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { SobelOperatorShader } from '../shaders/SobelShader.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
       //this.raycaster = new THREE.Raycaster()
        this.canvas = this.experience.canvas
       // this.canvas.addEventListener( 'pointermove', this.onPointerMove )
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.setInstancePostProcessing()
        
        this.setGui()

    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        //this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    setInstancePostProcessing() {

        this.settings= {
            bloomPass: {
                bloomStrength: 1.5,
                bloomRadius: 1.15,
                bloomThreshold: 0
            },
            outlinePass: {
                edgeStrength: 3.0,
                edgeGlow: 0.0,
                edgeThickness: 1.0,
                pulsePeriod: 0,
                rotate: false,
                usePatternTexture: false
            }
        }


        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.setClearColor('#000')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))




    
        this.renderScene = new RenderPass(this.scene, this.camera.instance)
    
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(this.sizes.width, this.sizes.height),
            1.5,
            0.4,
            0.85
        )
        this.bloomPass.threshold = this.settings.bloomThreshold
        this.bloomPass.strength = 1.5
        this.bloomPass.radius = this.settings.bloomRadius

        this.sobelPass = new ShaderPass(SobelOperatorShader)
        this.sobelPass.uniforms[ 'resolution' ].value.x = window.innerWidth * window.devicePixelRatio;
        this.sobelPass.uniforms[ 'resolution' ].value.y = window.innerHeight * window.devicePixelRatio    
        this.outlinePass = new OutlinePass( new THREE.Vector2( this.sizes.width, this.sizes.height ), this.scene, this.camera.instance)
        this.composer = new EffectComposer(this.instance)
        this.composer.addPass(this.renderScene)
        //this.composer.addPass(this.sobelPass)

        //this.composer.addPass(this.outlinePass)
        this.composer.addPass(this.bloomPass)

    }

    setGui() {
        if(!this.debug.ui) return
        const debugFolder = this.debug.ui.addFolder('PostProcessing')    
        const bloomPassFolder = debugFolder.addFolder('Bloompass')    

        bloomPassFolder.add(this.settings.bloomPass, 'bloomThreshold', 0.0, 1.0).onChange(value => {
            this.bloomPass.threshold = Number(value)
        })
    
        bloomPassFolder.add(this.settings.bloomPass, 'bloomStrength', 0.0, 4.0).onChange(value => {
            this.bloomPass.strength = Number(value)
        })
    
        bloomPassFolder.add(this.settings.bloomPass, 'bloomRadius', 0.0, 3.0).step(0.01).onChange(value => {
            this.bloomPass.radius = Number(value)
        })

        const outlinePassFolder = debugFolder.addFolder('OutlinePass')    
        
        outlinePassFolder.add( this.settings.outlinePass, 'edgeStrength', 0.01, 10 ).onChange(  value => {

            this.outlinePass.edgeStrength = Number( value );

        } );

        outlinePassFolder.add( this.settings.outlinePass, 'edgeGlow', 0.0, 1 ).onChange(  value => {

            this.outlinePass.edgeGlow = Number( value );

        } );

        outlinePassFolder.add( this.settings.outlinePass, 'edgeThickness', 1, 4 ).onChange( value => {

            this.outlinePass.edgeThickness = Number( value );

        } );

        outlinePassFolder.add( this.settings.outlinePass, 'pulsePeriod', 0.0, 5 ).onChange(  value => {

            this.outlinePass.pulsePeriod = Number( value );

        } );

        outlinePassFolder.add( this.settings.outlinePass, 'rotate' )

        outlinePassFolder.add( this.settings.outlinePass,'usePatternTexture' ).onChange(value  => {

            this.outlinePass.usePatternTexture = value;

        } )

    }
    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update()
    {
        
        this.composer.render()
       // this.instance.render(this.scene, this.camera.instance)
    }


    setSelectedObjects(){
        this.selectedObjects = []
        this.scene.children.forEach(object => {
            if(object.type === 'Mesh') this.selectedObjects.push(object)
        })
        this.outlinePass.selectedObjects = this.selectedObjects
    }

    setSobelPass() {
        //this.sobelPass.
    }
}
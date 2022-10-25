
import * as THREE from 'three'

import vertex from '../../shaders/CustomPhysicalMaterial/phy.vert'
import fragment from '../../shaders/CustomPhysicalMaterial/phy.frag'

export default class CustomPhysicalMaterial extends THREE.MeshPhysicalMaterial {

	constructor( opts = {} ) {
		super()

		let uniformsPhysical = {}
		Object.assign( uniformsPhysical, THREE.UniformsUtils.clone( THREE.ShaderLib.physical.uniforms ))
		if( opts.uniforms ) {
			Object.assign( uniformsPhysical, opts.uniforms )
		}

		this.onBeforeCompile = (shader) => {
			shader.uniforms = uniformsPhysical
			
			for( let uniformId in opts.uniforms ) {
				this[ uniformId ] = opts.uniforms[ uniformId ].value
			}

			shader.vertexShader = vertex
			shader.fragmentShader = fragment
		}
	}

}
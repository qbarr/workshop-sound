import Audio from './Audio'
import EventEmitter from './EventEmitter'

export default class AudioManager extends EventEmitter {
    constructor(){
        super()
        this.audio = null
        document.addEventListener('click', () => this.startAudio()) 
    }
    

    startAudio(){
        if(this.audio) return
        this.audio = new Audio()
        this.audio.start( {
            onBeat: ()  => this.onBeat(),
            live: false,
            src: '/sounds/sound.mp3',
        })

    }

    getDatas() {
        if(this.audio) return this.audio.values
        else return null
    }

    onBeat() {
        this.trigger('beat')
        
     //   console.log(this.audio.values);
    }

    update(){
        if(this.audio)this.audio.update()
    }

}
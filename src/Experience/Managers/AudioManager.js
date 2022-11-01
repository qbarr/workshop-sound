import gsap from 'gsap'
import Audio from '../Utils/Audio'
import EventEmitter from '../Utils/EventEmitter'

export default class AudioManager extends EventEmitter {
    constructor(){
        super()
        this.audio = null
        document.getElementById('start-button').addEventListener('click', () => this.startAudio()) 
    }
    
    startAudio(){
        gsap.to('#start-button', {opacity: 0, duration: 1})
        if(this.audio) return
        this.audio = new Audio()
        this.audio.start( {
            onBeat: ()  => this.onBeat(),
            live: false,
            src: '/sounds/sound.mp3',
        })

    }

    stopAudio() {
        gsap.to(this.audio.audio, {volume:0, duration: 3.5})
    }

    getDatas() {
        if(this.audio) return this.audio.values
        else return null
    }

    onBeat() {
        this.trigger('beat')
    }

    update(){
       if(this.audio)this.audio.update()
    }

}
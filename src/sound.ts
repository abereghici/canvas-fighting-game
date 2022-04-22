type Options = {
  loop?: boolean
  volume?: number
  restartOnPlay?: boolean
}

let timerId: number | undefined

export default class Sound {
  sound: HTMLAudioElement

  private restartOnPlay: boolean

  constructor(src: string, options?: Options) {
    const {
      loop = false,
      volume = 1,
      restartOnPlay = false,
    } = {
      ...options,
    }

    this.restartOnPlay = restartOnPlay

    this.sound = new Audio(src)
    this.sound.loop = loop
    this.sound.volume = volume
  }

  play() {
    if (this.restartOnPlay) {
      this.stop()
      this.sound.currentTime = 0
    }

    this.sound
      .play()
      .then(() => {
        clearTimeout(timerId)
      })
      .catch(() => {
        timerId = setTimeout(() => {
          this.play()
        }, 1000)
      })
  }

  stop() {
    this.sound.pause()
  }
}

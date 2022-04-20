const DURATION = 1000

export default class Timer {
  private timer: number
  private timerId: number | undefined
  private onTickCallback: (current: number) => void = () => {}
  private onFinishCallback: (() => void) | undefined

  constructor(timer: number) {
    if (timer <= 0) {
      throw new Error('Timer must be greater than 0')
    }
    this.timer = timer
  }

  private decrease() {
    if (this.timer > 0) {
      this.timerId = setTimeout(() => this.decrease(), DURATION)
      this.timer--
      this.onTickCallback?.(this.timer)
    } else {
      this.stop()
      this.onFinishCallback?.()
    }
  }

  onTick(callback: (current: number) => void) {
    this.onTickCallback = callback
    return this
  }

  onFinish(callback: () => void) {
    this.onFinishCallback = callback
    return this
  }

  setTimer(timer: number) {
    this.timer = timer
    return this
  }

  start() {
    if (this.timer > 0) {
      this.decrease()
    }
    return this
  }

  stop() {
    clearTimeout(this.timerId)
    return this
  }
}

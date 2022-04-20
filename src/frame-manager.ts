type ConstructorProps = {
  max: number
  current?: number
  hold?: number
  elapsed?: number
}

export default class FrameManager {
  current: number
  max: number
  elapsed: number
  hold: number

  constructor(props?: ConstructorProps) {
    const {max = 1, current = 0, hold = 5, elapsed = 0} = {...props}

    this.max = max
    this.current = current
    this.hold = hold
    this.elapsed = elapsed
  }

  animate() {
    this.elapsed++

    if (this.elapsed % this.hold === 0) {
      if (this.current < this.max - 1) {
        this.current += 1
      } else {
        this.current = 0
      }
    }
  }
}

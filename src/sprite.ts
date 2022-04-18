import {context} from './canvas'
import {type Point} from './types'

export default class Sprite {
  position: Point
  width: number
  height: number
  image: HTMLImageElement
  scale: number
  frameCurrent: number
  framesMax: number
  framesElapsed: number
  framesHold: number
  offset: Point

  constructor({
    position,
    imageSrc,
    scale = 1,
    offset = {x: 0, y: 0},
    framesMax = 1,
    framesCurrent = 0,
    framesElapsed = 0,
    framesHold = 0,
  }: {
    position: Point
    imageSrc: string
    offset?: Point
    scale?: number
    framesCurrent?: number
    framesMax?: number
    framesElapsed?: number
    framesHold?: number
  }) {
    this.position = position
    this.width = 50
    this.height = 150
    this.scale = scale
    this.framesMax = framesMax
    this.frameCurrent = framesCurrent
    this.framesElapsed = framesElapsed
    this.framesHold = framesHold
    this.image = new Image()
    this.image.src = imageSrc
    this.offset = offset
  }

  draw() {
    context.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale,
    )
  }

  animateFrames() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.frameCurrent < this.framesMax - 1) {
        this.frameCurrent += 1
      } else {
        this.frameCurrent = 0
      }
    }
  }

  update() {
    this.draw()
    this.animateFrames()
  }
}

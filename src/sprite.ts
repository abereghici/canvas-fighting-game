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

  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
  }: {
    position: Point
    imageSrc: string
    scale?: number
    framesMax?: number
  }) {
    this.position = position
    this.width = 50
    this.height = 150
    this.scale = scale
    this.framesMax = framesMax
    this.frameCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
    this.image = new Image()
    this.image.src = imageSrc
  }

  draw() {
    context.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale,
    )
  }

  update() {
    this.draw()

    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.frameCurrent < this.framesMax - 1) {
        this.frameCurrent += 1
      } else {
        this.frameCurrent = 0
      }
    }
  }
}

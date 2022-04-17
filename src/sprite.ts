import {context} from './canvas'
import {type Point} from './types'

export default class Sprite {
  position: Point
  width: number
  height: number
  image: HTMLImageElement

  constructor({position, imageSrc}: {position: Point; imageSrc?: string}) {
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    if (imageSrc) {
      this.image.src = imageSrc
    }
  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y)
  }

  update() {
    this.draw()
  }
}

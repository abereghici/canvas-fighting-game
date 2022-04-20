export type ConstructorProps = {
  imageSrc: string
  maxFrames: number
}

export default class SpriteSheet {
  maxFrames: number
  image: HTMLImageElement

  constructor({imageSrc, maxFrames}: ConstructorProps) {
    this.image = new Image()
    this.image.src = imageSrc
    this.maxFrames = maxFrames
  }
}

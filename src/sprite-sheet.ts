export type ConstructorProps = {
  maxFrames: number
}

export default class SpriteSheet {
  maxFrames: number
  image: HTMLImageElement

  constructor({maxFrames}: ConstructorProps) {
    this.image = new Image()
    this.maxFrames = maxFrames
  }
}

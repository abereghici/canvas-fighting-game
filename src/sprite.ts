import Box, {type ConstructorProps as BoxConstructorProps} from './box'
import FrameManager from './frame-manager'

export type ConstructorProps = BoxConstructorProps & {
  imageSrc?: string
  scale?: number
  frameManager?: FrameManager
}

export default class Sprite extends Box {
  image: HTMLImageElement
  frameManager: FrameManager = new FrameManager()
  scale: number = 1

  constructor(props: ConstructorProps) {
    super(props)

    const {imageSrc, scale, frameManager} = props

    if (scale) {
      this.scale = scale
    }

    if (frameManager) {
      this.frameManager = frameManager
    }

    this.image = new Image()
    if (imageSrc) {
      this.image.src = imageSrc
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      this.frameManager.current * (this.image.width / this.frameManager.max),
      0,
      this.image.width / this.frameManager.max,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.frameManager.max) * this.scale,
      this.image.height * this.scale,
    )
  }

  animateFrames() {
    this.frameManager.animate()
  }

  update(_: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.draw(context)
    this.animateFrames()
  }
}

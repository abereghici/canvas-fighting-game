import {GRAVITY, GROUND_HEIGHT} from './config'
import {Point} from './types'
import Sprite from './sprite'
import {canvas, context} from './canvas'

type SpriteOption = {
  imageSrc: string
  framesMax: number
  image?: HTMLImageElement
}

type SpriteOptions = {
  idle: SpriteOption
  run: SpriteOption
  jump: SpriteOption
  fall: SpriteOption
  attack1: SpriteOption
}
type AttackBox = {
  position: Point
  offset: Point
  width: number
  height: number
}
export default class Fighter extends Sprite {
  velocity: Point
  lastKey: string
  attackBox: AttackBox
  isAttacking: boolean
  health: number
  sprites: SpriteOptions

  constructor({
    position,
    velocity,
    offset,
    imageSrc,
    scale = 1,
    framesMax = 1,
    framesCurrent = 0,
    framesElapsed = 0,
    framesHold = 5,
    sprites,
    attackBox = {offset: {x: 0, y: 0}, width: 0, height: 0},
  }: {
    position: Point
    velocity: Point
    offset: Point
    imageSrc: string
    scale?: number
    framesCurrent?: number
    framesMax?: number
    framesElapsed?: number
    framesHold?: number
    sprites: SpriteOptions
    attackBox?: {
      offset: Point
      width: number
      height: number
    }
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      framesCurrent,
      framesElapsed,
      framesHold,
      offset,
    })

    this.velocity = velocity
    this.lastKey = ''
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: attackBox.width,
      height: attackBox.height,
      offset: attackBox.offset,
    }
    this.isAttacking = false
    this.health = 100
    this.sprites = sprites

    for (const sprite in this.sprites) {
      const currentSprite = this.sprites[sprite as keyof SpriteOptions]
      const img = new Image()
      img.src = currentSprite.imageSrc
      currentSprite.image = img
      this.framesMax = currentSprite.framesMax
    }
  }

  update() {
    this.draw()
    this.animateFrames()

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y

    // attack box : for debug only
    // context.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height,
    // )

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // gravity function
    if (
      this.position.y + this.height + this.velocity.y >=
      canvas.height - GROUND_HEIGHT
    ) {
      this.velocity.y = 0
      this.position.y = 330
    } else {
      this.velocity.y += GRAVITY
    }
  }

  attack() {
    this.switchSprite('attack1')
    this.isAttacking = true
  }

  switchSprite(sprite: keyof SpriteOptions) {
    if (
      this.image === this.sprites.attack1.image &&
      this.frameCurrent < this.sprites.attack1.framesMax - 1
    ) {
      return
    }

    switch (sprite) {
      case 'run':
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image!
          this.framesMax = this.sprites.run.framesMax
          this.frameCurrent = 0
        }
        break
      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image!
          this.framesMax = this.sprites.jump.framesMax
          this.frameCurrent = 0
        }
        break
      case 'fall':
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image!
          this.framesMax = this.sprites.fall.framesMax
          this.frameCurrent = 0
        }
        break
      case 'attack1':
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image!
          this.framesMax = this.sprites.attack1.framesMax
          this.frameCurrent = 0
        }
        break
      default:
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image!
          this.framesMax = this.sprites.idle.framesMax
          this.frameCurrent = 0
        }
        break
    }
  }
}

import {GRAVITY, GROUND_HEIGHT} from './config'
import {Point} from './types'
import Sprite from './sprite'
import {canvas, context} from './canvas'

export default class Fighter extends Sprite {
  velocity: Point
  lastKey: string
  color: string
  attackBox: {
    position: Point
    offset: Point
    width: number
    height: number
  }
  isAttacking: boolean
  health: number

  constructor({
    position,
    velocity,
    color,
    offset,
  }: {
    position: Point
    velocity: Point
    offset: Point
    color: string
  }) {
    super({
      position,
    })

    this.velocity = velocity
    this.lastKey = ''
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 100,
      height: 50,
      offset,
    }
    this.color = color
    this.isAttacking = false
    this.health = 100
  }

  draw() {
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y
    context.fillStyle = this.color
    context.fillRect(this.position.x, this.position.y, this.width, this.height)

    // attack box

    if (this.isAttacking) {
      context.fillStyle = 'green'
      context.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height,
      )
    }
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (
      this.position.y + this.height + this.velocity.y >=
      canvas.height - GROUND_HEIGHT
    ) {
      this.velocity.y = 0
    } else {
      this.velocity.y += GRAVITY
    }
  }

  attack() {
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false
    }, 100)
  }
}

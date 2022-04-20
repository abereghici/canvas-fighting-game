import Box from './box'
import Sprite from './sprite'
import FrameManager from './frame-manager'
import FighterSpriteSheets, {type FightActions} from './fighter-sprite-sheets'
import {Point} from './types'
import GameSettings from './game-settings'
import KeyboardManager from './keyboard-manager'

type ConstructorProps = {
  position: Point
  velocity: Point
  offset: Point
  scale: number
  keyboardManager: KeyboardManager
  frameManager: FrameManager
  sprites: FighterSpriteSheets
  attackBox: Box
  onAttack?: () => void
}

export default class Fighter extends Sprite {
  private velocity: Point
  private attackBox: Box
  private sprites: FighterSpriteSheets
  private keyboardManager: KeyboardManager
  private health: number = 100
  private isDead: boolean = false
  private isAttacking: boolean = false
  private canJump: boolean = true

  constructor(props: ConstructorProps) {
    super({
      ...props,
      width: 50,
      height: 150,
    })

    const {sprites, attackBox, velocity, keyboardManager} = props
    this.keyboardManager = keyboardManager

    this.velocity = velocity

    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: attackBox.width,
      height: attackBox.height,
      offset: attackBox.offset,
    }
    this.sprites = sprites

    this.keyboardManager.onJump = () => this.jump()
    this.keyboardManager.onAttack = () => this.startAttack()
  }

  update(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.draw(context)

    if (!this.isDead) {
      this.animateFrames()
    }

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
      canvas.height - GameSettings.groundHeight
    ) {
      this.velocity.y = 0
      this.position.y = GameSettings.playerInitialFallPosition
      this.canJump = true
    } else {
      this.velocity.y += GameSettings.gravity
      this.canJump = false
    }

    this.velocity.x = 0

    if (this.shouldMoveLeft()) {
      this.moveLeft()
    } else if (this.shouldMoveRight()) {
      this.moveRight()
    } else {
      this.setIdle()
    }

    if (this.velocity.y < 0) {
      this.switchSprite('Jump')
    } else if (this.velocity.y > 0) {
      this.switchSprite('Fall')
    }
  }

  getHealth() {
    return this.health
  }

  setIdle() {
    this.velocity.x = 0
    this.switchSprite('Idle')
  }

  shouldMoveLeft = () => {
    if (this.isDead) {
      return false
    }

    return (
      this.keyboardManager.getKey('MoveLeft')?.pressed &&
      this.keyboardManager.lastKey === 'MoveLeft'
    )
  }

  moveLeft() {
    if (this.isDead) {
      return
    }

    const newPosition = this.position.x - GameSettings.playerRunSpeed

    if (newPosition < 0) {
      return
    }

    this.velocity.x = -GameSettings.playerRunSpeed
    this.switchSprite('Run')
  }

  shouldMoveRight = () => {
    if (this.isDead) {
      return false
    }

    return (
      this.keyboardManager.getKey('MoveRight')?.pressed &&
      this.keyboardManager.lastKey === 'MoveRight'
    )
  }

  moveRight() {
    const newPosition =
      this.position.x + GameSettings.playerRunSpeed + this.width
    if (newPosition > GameSettings.screenWidth) {
      return
    }

    this.velocity.x = GameSettings.playerRunSpeed
    this.switchSprite('Run')
  }

  startAttack() {
    if (!this.isDead) {
      this.switchSprite('Attack1')
      this.isAttacking = true
    }
  }

  finishAttack() {
    this.isAttacking = false
  }

  isAttackInProgress() {
    return (
      this.isAttacking &&
      this.frameManager.current === this.sprites.attackFrameNumber
    )
  }

  jump() {
    if (!this.isDead && this.canJump) {
      this.velocity.y -= GameSettings.playerJumpHeight
    }
  }

  takeHit() {
    this.health -= GameSettings.playerDamage

    if (this.health <= 0) {
      this.switchSprite('Death')
    } else {
      this.switchSprite('TakeHit')
    }
  }

  switchSprite(action: FightActions) {
    let sprite = this.sprites.get(action)

    const deadSprite = this.sprites.get('Death')
    if (this.image === deadSprite?.image) {
      if (this.frameManager.current === deadSprite.maxFrames - 1) {
        this.isDead = true
      }
      return
    }

    // overriding all other animations with the attack animation
    const attackSprite = this.sprites.get('Attack1')
    if (
      this.image === attackSprite?.image &&
      this.frameManager.current < attackSprite.maxFrames - 1
    ) {
      return
    }

    // overriding all other animations with the take hit animation
    const takeHitSprite = this.sprites.get('TakeHit')
    if (
      this.image === takeHitSprite?.image &&
      this.frameManager.current < takeHitSprite.maxFrames - 1
    ) {
      return
    }

    if (sprite && this.image != sprite.image) {
      this.image = sprite.image
      this.frameManager.max = sprite.maxFrames
      this.frameManager.current = 0
    }
  }
}

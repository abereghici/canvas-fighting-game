import Fighter from './fighter'
import Game from './game'
import GameSettings from './game-settings'
import Sprite from './sprite'

export default class GameBuilder {
  canvas: HTMLCanvasElement | undefined
  context: CanvasRenderingContext2D | undefined
  player: Fighter | undefined
  enemy: Fighter | undefined
  background: Sprite | undefined
  shop: Sprite | undefined

  setCanvas(canvas: HTMLCanvasElement | null) {
    if (!canvas) {
      throw new Error('Canvas is not defined')
    }

    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('Canvas context is not defined')
    }

    canvas.width = GameSettings.screenWidth
    canvas.height = GameSettings.screenHeight

    context.fillRect(0, 0, canvas.width, canvas.height)

    this.canvas = canvas
    this.context = context

    return this
  }

  setPlayer(player: Fighter) {
    this.player = player
    return this
  }

  setEnemy(enemy: Fighter) {
    this.enemy = enemy
    return this
  }

  setBackground(background: Sprite) {
    this.background = background
    return this
  }

  setShop(shop: Sprite) {
    this.shop = shop
    return this
  }

  build() {
    if (!this.canvas) {
      throw new Error('Canvas is not defined')
    }

    if (!this.context) {
      throw new Error('Canvas context is not defined')
    }

    if (!this.player) {
      throw new Error('Player is not defined')
    }

    if (!this.enemy) {
      throw new Error('Enemy is not defined')
    }

    if (!this.background) {
      throw new Error('Background is not defined')
    }

    if (!this.shop) {
      throw new Error('Shop is not defined')
    }

    return new Game({
      canvas: this.canvas,
      context: this.context,
      player: this.player,
      enemy: this.enemy,
      background: this.background,
      shop: this.shop,
    })
  }
}

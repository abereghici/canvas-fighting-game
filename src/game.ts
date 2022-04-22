import Fighter from './fighter'
import GameSettings from './game-settings'
import Sprite from './sprite'
import Timer from './timer'
import Sound from './sound'
import Collision from './collision'

type ConstructorProps = {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  player: Fighter
  enemy: Fighter
  background: Sprite
  shop: Sprite
}

export default class Game {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  timer: Timer
  background: Sprite
  shop: Sprite
  player: Fighter
  enemy: Fighter

  private backgroundSound = new Sound('./assets/background-sound.wav', {
    loop: true,
    volume: 0.3,
  })

  constructor({
    canvas,
    context,
    player,
    enemy,
    background,
    shop,
  }: ConstructorProps) {
    this.canvas = canvas
    this.context = context
    this.background = background
    this.shop = shop
    this.player = player
    this.enemy = enemy

    this.timer = new Timer(GameSettings.gameDuration)
      .onTick(
        timer => (document.querySelector('#timer')!.innerHTML = `${timer}`),
      )
      .onFinish(() => this.determineWinner())
  }

  determineWinner() {
    const gameStatus = document.querySelector('#gameStatus') as HTMLDivElement
    gameStatus.style.display = 'flex'

    if (this.player.getHealth() === this.enemy.getHealth()) {
      gameStatus.innerHTML = 'Tie'
    } else if (this.player.getHealth() > this.enemy.getHealth()) {
      gameStatus.innerHTML = 'Player 1 Wins'
    } else {
      gameStatus.innerHTML = 'Player 2 Wins'
    }
  }

  start() {
    this.timer.start()
    this.animate()
    this.backgroundSound.play()
  }

  animate() {
    window.requestAnimationFrame(() => {
      this.animate()
    })

    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.background.update(this.canvas, this.context)

    this.shop.update(this.canvas, this.context)

    this.context.fillStyle = 'rgba(255,255,255,0.15)'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.player.update(this.canvas, this.context)
    this.enemy.update(this.canvas, this.context)

    if (this.timer.isFinished()) {
      return
    }

    if (
      this.hasFightersCollided(this.player, this.enemy) &&
      this.player.isAttackInProgress()
    ) {
      this.player.finishAttack()
      this.enemy.takeHit()
      this.updateHealth(this.enemy.getHealth(), '#enemyHealth')
    }

    // if player misses
    if (this.player.isAttackInProgress()) {
      this.player.finishAttack()
    }

    if (
      this.hasFightersCollided(this.enemy, this.player) &&
      this.enemy.isAttackInProgress()
    ) {
      this.enemy.finishAttack()
      this.player.takeHit()
      this.updateHealth(this.player.getHealth(), '#playerHealth')
    }

    // if enemy misses
    if (this.enemy.isAttackInProgress()) {
      this.enemy.finishAttack()
    }

    // end game based on health
    if (this.enemy.getHealth() <= 0 || this.player.getHealth() <= 0) {
      this.determineWinner()
      this.timer.stop()
    }
  }

  hasFightersCollided = (fighter1: Fighter, fighter2: Fighter) => {
    return Collision.detect({
      fighter1,
      fighter2,
    })
  }

  updateHealth = (health: number, selector: string) => {
    const enemyHealth = document.querySelector(selector) as HTMLDivElement
    enemyHealth.style.width = `${health}%`
  }
}

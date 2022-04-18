import './style.css'

import {canvas, context} from './canvas'
import Sprite from './sprite'
import Fighter from './fighter'
import {decreaseTimer, determineWinner, rectangularCollision} from './utils'

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/background.png',
})

const shop = new Sprite({
  position: {
    x: 600,
    y: 128,
  },
  imageSrc: './img/shop.png',
  scale: 2.75,
  framesMax: 6,
  framesHold: 5,
})

const player = new Fighter({
  imageSrc: './img/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 215,
    y: 157,
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 150,
    height: 50,
  },
  sprites: {
    idle: {
      imageSrc: './img/samuraiMack/Idle.png',
      framesMax: 8,
    },
    run: {
      imageSrc: './img/samuraiMack/Run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: './img/samuraiMack/Jump.png',
      framesMax: 2,
    },
    fall: {
      imageSrc: './img/samuraiMack/Fall.png',
      framesMax: 2,
    },
    attack1: {
      imageSrc: './img/samuraiMack/Attack1.png',
      framesMax: 6,
    },
    takeHit: {
      imageSrc: './img/samuraiMack/Take Hit.png',
      framesMax: 4,
    },
    death: {
      imageSrc: './img/samuraiMack/Death.png',
      framesMax: 6,
    },
  },
})

const enemy = new Fighter({
  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 215,
    y: 170,
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50,
    },
    width: 170,
    height: 50,
  },
  sprites: {
    idle: {
      imageSrc: './img/kenji/Idle.png',
      framesMax: 4,
    },
    run: {
      imageSrc: './img/kenji/Run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: './img/kenji/Jump.png',
      framesMax: 2,
    },
    fall: {
      imageSrc: './img/kenji/Fall.png',
      framesMax: 2,
    },
    attack1: {
      imageSrc: './img/kenji/Attack1.png',
      framesMax: 4,
    },
    takeHit: {
      imageSrc: './img/kenji/Take hit.png',
      framesMax: 3,
    },
    death: {
      imageSrc: './img/kenji/Death.png',
      framesMax: 7,
    },
  },
})

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
}

function animate() {
  window.requestAnimationFrame(animate)
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  shop.update()
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
    enemy.switchSprite('run')
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
    enemy.switchSprite('run')
  } else {
    enemy.switchSprite('idle')
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
  }

  // detect collision & enemy gets hit

  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking &&
    player.frameCurrent === 4
  ) {
    enemy.takeHit()
    player.isAttacking = false

    const enemyHealth = document.querySelector('#enemyHealth') as HTMLDivElement
    enemyHealth.style.width = `${enemy.health}%`
  }

  // if player misses
  if (player.isAttacking && player.frameCurrent === 5) {
    player.isAttacking = false
  }

  if (
    rectangularCollision({
      rectangle2: player,
      rectangle1: enemy,
    }) &&
    enemy.isAttacking &&
    enemy.frameCurrent === 2
  ) {
    player.takeHit()
    enemy.isAttacking = false
    const playerHealth = document.querySelector(
      '#playerHealth',
    ) as HTMLDivElement
    playerHealth.style.width = `${player.health}%`
  }

  // if enemy misses
  if (enemy.isAttacking && enemy.frameCurrent === 2) {
    enemy.isAttacking = false
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({player, enemy})
  }
}

decreaseTimer({player, enemy})

animate()

window.addEventListener('keydown', event => {
  if (!player.dead) {
    switch (event.key) {
      case 'd': {
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      }
      case 'a': {
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      }
      case 'w': {
        keys.w.pressed = true
        player.velocity.y = -15
        break
      }
      case ' ': {
        player.attack()
        break
      }

      default:
        break
    }
  }
  if (!enemy.dead) {
    switch (event.key) {
      case 'ArrowLeft': {
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
      }
      case 'ArrowRight': {
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
      }
      case 'ArrowUp': {
        keys.ArrowUp.pressed = true
        enemy.velocity.y = -15
        break
      }
      case 'ArrowDown': {
        enemy.attack()
        break
      }
      default:
        break
    }
  }
})

window.addEventListener('keyup', event => {
  switch (event.key) {
    case 'd': {
      keys.d.pressed = false
      break
    }
    case 'a': {
      keys.a.pressed = false
      break
    }

    case 'w': {
      keys.w.pressed = false
      break
    }

    case 'ArrowLeft': {
      keys.ArrowLeft.pressed = false
      break
    }
    case 'ArrowRight': {
      keys.ArrowRight.pressed = false
      break
    }

    case 'ArrowUp': {
      keys.ArrowUp.pressed = false
      break
    }

    default:
      break
  }
})

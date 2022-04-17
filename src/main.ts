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

const player = new Fighter({
  color: 'red',
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
})

const enemy = new Fighter({
  color: 'blue',
  position: {
    x: canvas.getBoundingClientRect().width - player.width,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: 0,
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

decreaseTimer({player, enemy})

function animate() {
  window.requestAnimationFrame(animate)
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
  }

  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
  }

  // detect collision

  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false

    const enemyHealth = document.querySelector('#enemyHealth') as HTMLDivElement
    enemy.health -= 20
    enemyHealth.style.width = `${enemy.health}%`
  }

  if (
    rectangularCollision({
      rectangle2: player,
      rectangle1: enemy,
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false
    const playerHealth = document.querySelector(
      '#playerHealth',
    ) as HTMLDivElement
    player.health -= 20
    playerHealth.style.width = `${player.health}%`
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({player, enemy})
  }
}

animate()

window.addEventListener('keydown', event => {
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

    case 'Shift': {
      enemy.attack()
      break
    }

    default:
      break
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

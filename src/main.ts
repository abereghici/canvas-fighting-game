import './style.css'

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
const context = canvas.getContext('2d')!

canvas.width = 1024
canvas.height = 576

const gravity = 0.5

context.fillRect(0, 0, canvas.width, canvas.height)

type Point = {x: number; y: number}
class Sprite {
  position: Point
  velocity: Point
  height: number
  lastKey: string

  constructor({position, velocity}: {position: Point; velocity: Point}) {
    this.position = position
    this.velocity = velocity
    this.height = 150
    this.lastKey = ''
  }

  draw() {
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y, 50, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
    } else {
      this.velocity.y += gravity
    }
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
})

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
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

function animate() {
  window.requestAnimationFrame(animate)
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)
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
}

animate()

window.addEventListener('keydown', event => {
  console.log(event.key)
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

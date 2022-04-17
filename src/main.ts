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
  width: number
  height: number
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
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 150
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

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
    } else {
      this.velocity.y += gravity
    }
  }

  attack() {
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false
    }, 100)
  }
}

const player = new Sprite({
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

const enemy = new Sprite({
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

function rectangularCollision({
  rectangle1,
  rectangle2,
}: {
  rectangle1: Sprite
  rectangle2: Sprite
}) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
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

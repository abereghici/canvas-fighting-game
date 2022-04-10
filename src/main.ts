import './style.css'

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
const context = canvas.getContext('2d')!

canvas.width = 1024
canvas.height = 576

const gravity = 0.2

context.fillRect(0, 0, canvas.width, canvas.height)

type Point = {x: number; y: number}
class Sprite {
  position: Point
  velocity: Point
  height: number

  constructor({position, velocity}: {position: Point; velocity: Point}) {
    this.position = position
    this.velocity = velocity
    this.height = 150
  }

  draw() {
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y, 50, this.height)
  }

  update() {
    this.draw()
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

function animate() {
  window.requestAnimationFrame(animate)
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()
}

animate()

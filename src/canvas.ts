import {CANVAS_WIDTH, CANVAS_HEIGHT} from './config'

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
const context = canvas.getContext('2d')!

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

context.fillRect(0, 0, canvas.width, canvas.height)

export {canvas, context}

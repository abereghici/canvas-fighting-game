import {Point} from './types'

export type ConstructorProps = {
  width?: number
  height?: number
  position?: Point
  offset?: Point
}

export default class Box {
  position: Point
  offset: Point
  width: number
  height: number

  constructor({width, height, position, offset}: ConstructorProps) {
    this.position = {x: 0, y: 0, ...position}
    this.offset = {x: 0, y: 0, ...offset}
    this.width = width ?? 0
    this.height = height ?? 0
  }
}

import Box from '../box'
import Fighter from '../fighter'
import FighterSpriteSheets from '../fighter-sprite-sheets'
import FrameManager from '../frame-manager'
import KeyboardManager from '../keyboard-manager'
import {Direction} from '../types'

export const createSamuraiKenji = (direction: Direction) =>
  new Fighter({
    scale: 2.5,
    position: direction === 'Right' ? {x: 400, y: 100} : {x: 0, y: 0},
    velocity: {x: 0, y: 0},
    offset: {x: 215, y: 170},
    frameManager: new FrameManager({max: 4}),
    attackBox: new Box({
      position: {x: 0, y: 0},
      offset: {x: 50, y: 50},
      width: 150,
      height: 50,
    }),
    sprites: new FighterSpriteSheets(
      './assets/characters/samuraiKenji',
      2,
      direction,
    )
      .add('Idle', {
        maxFrames: 4,
      })
      .add('Run', {
        maxFrames: 8,
      })
      .add('Jump', {
        maxFrames: 2,
      })
      .add('Fall', {
        maxFrames: 2,
      })
      .add('Attack1', {
        maxFrames: 4,
      })
      .add('TakeHit', {
        maxFrames: 3,
      })
      .add('Death', {
        maxFrames: 7,
      }),
    keyboardManager:
      direction === 'Right'
        ? new KeyboardManager()
            .addKey('ArrowUp', 'Jump')
            .addKey('ArrowLeft', 'MoveLeft')
            .addKey('ArrowRight', 'MoveRight')
            .addKey('ArrowDown', 'Attack')
        : new KeyboardManager()
            .addKey('w', 'Jump')
            .addKey('a', 'MoveLeft')
            .addKey('d', 'MoveRight')
            .addKey(' ', 'Attack'),
  })
{
}

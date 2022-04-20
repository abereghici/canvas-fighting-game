import Box from '../box'
import Fighter from '../fighter'
import FighterSpriteSheets from '../fighter-sprite-sheets'
import FrameManager from '../frame-manager'
import KeyboardManager from '../keyboard-manager'

const samuraiMack = new Fighter({
  scale: 2.5,
  position: {x: 400, y: 100},
  velocity: {x: 0, y: 0},
  offset: {x: 215, y: 170},
  frameManager: new FrameManager({max: 4}),
  attackBox: new Box({
    position: {x: 0, y: 0},
    offset: {x: -170, y: 50},
    width: 170,
    height: 50,
  }),
  sprites: new FighterSpriteSheets('./assets/characters/samuraiKenji', 2)
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
  keyboardManager: new KeyboardManager()
    .addKey('ArrowUp', 'Jump')
    .addKey('ArrowLeft', 'MoveLeft')
    .addKey('ArrowRight', 'MoveRight')
    .addKey('ArrowDown', 'Attack'),
})

export default samuraiMack

import Box from '../box'
import Fighter from '../fighter'
import FighterSpriteSheets from '../fighter-sprite-sheets'
import FrameManager from '../frame-manager'
import KeyboardManager from '../keyboard-manager'

const samuraiMack = new Fighter({
  scale: 2.5,
  position: {x: 0, y: 0},
  velocity: {x: 0, y: 0},
  offset: {x: 215, y: 157},
  frameManager: new FrameManager({max: 8}),
  attackBox: new Box({
    position: {x: 0, y: 0},
    offset: {x: 100, y: 50},
    width: 150,
    height: 50,
  }),
  sprites: new FighterSpriteSheets('./assets/characters/samuraiMack', 3)
    .add('Idle', {
      maxFrames: 8,
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
      maxFrames: 6,
    })
    .add('TakeHit', {
      maxFrames: 4,
    })
    .add('Death', {
      maxFrames: 6,
    }),
  keyboardManager: new KeyboardManager()
    .addKey('w', 'Jump')
    .addKey('a', 'MoveLeft')
    .addKey('d', 'MoveRight')
    .addKey(' ', 'Attack'),
})

export default samuraiMack

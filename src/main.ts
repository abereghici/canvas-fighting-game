import './style.css'

import samuraiKenji from './fighters/samurai-kenji'
import samuraiMack from './fighters/samurai-mack'
import FrameManager from './frame-manager'
import GameBuilder from './game-builder'
import Sprite from './sprite'

new GameBuilder()
  .setCanvas(document.querySelector<HTMLCanvasElement>('canvas'))
  .setBackground(
    new Sprite({
      position: {x: 0, y: 0},
      imageSrc: './assets/background.png',
    }),
  )
  .setShop(
    new Sprite({
      position: {x: 600, y: 128},
      scale: 2.75,
      imageSrc: './assets/shop.png',
      frameManager: new FrameManager({max: 6, hold: 5}),
    }),
  )
  .setPlayer(samuraiMack)
  .setEnemy(samuraiKenji)
  .build()
  .start()

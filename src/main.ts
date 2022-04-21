import './style.css'

import {createSamuraiKenji} from './fighters/samurai-kenji'
import {createSamuraiMack} from './fighters/samurai-mack'
import {createWizardAlatar} from './fighters/wizard-alatar'
import {createWizardAlbus} from './fighters/wizard-albus'
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
  .setPlayer(createWizardAlbus('Left'))
  .setEnemy(createWizardAlatar('Right'))
  .build()
  .start()

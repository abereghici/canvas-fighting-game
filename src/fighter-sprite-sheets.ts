import SpriteSheet, {
  type ConstructorProps as SpriteSheetConstructorProps,
} from './sprite-sheet'
import {Direction} from './types'

export type FightActions =
  | 'Idle'
  | 'Run'
  | 'Jump'
  | 'Fall'
  | 'Attack1'
  | 'TakeHit'
  | 'Death'

export default class FighterSpriteSheets {
  private sheets: Map<FightActions, SpriteSheet> = new Map()
  private imagesPath: string = ''
  direction: Direction
  attackFrameNumber: number

  constructor(
    imagesPath: string,
    attackFrameNumber: number,
    direction: Direction,
  ) {
    this.imagesPath = imagesPath
    this.attackFrameNumber = attackFrameNumber
    this.direction = direction
  }

  add(action: FightActions, sheet: Partial<SpriteSheetConstructorProps>) {
    let spriteSheet = new SpriteSheet({
      maxFrames: sheet.maxFrames ?? 1,
    })

    this.sheets.set(action, spriteSheet)
    return this
  }

  get(action: FightActions): SpriteSheet | undefined {
    const sheet = this.sheets.get(action)
    if (sheet) {
      sheet.image.src = `${this.imagesPath}/${this.direction}/${action}.png`
    }
    return sheet
  }
}

import SpriteSheet, {
  type ConstructorProps as SpriteSheetConstructorProps,
} from './sprite-sheet'

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
  attackFrameNumber: number

  constructor(imagesPath: string, attackFrameNumber: number) {
    this.imagesPath = imagesPath
    this.attackFrameNumber = attackFrameNumber
  }

  add(action: FightActions, sheet: Partial<SpriteSheetConstructorProps>) {
    let spriteSheet = new SpriteSheet({
      maxFrames: sheet.maxFrames ?? 1,
      imageSrc: sheet.imageSrc ?? `${this.imagesPath}/${action}.png`,
    })

    this.sheets.set(action, spriteSheet)
    return this
  }

  get(action: FightActions): SpriteSheet | undefined {
    return this.sheets.get(action)
  }
}

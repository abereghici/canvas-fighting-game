type KeyName = string
type KeyAction = 'MoveLeft' | 'MoveRight' | 'Jump' | 'Attack'
type KeyState = {pressed: boolean; keyAction: KeyAction}

export default class KeyboardManager {
  private keys: Map<KeyName, KeyState> = new Map()
  lastKey: KeyAction | null = null

  onJump: (() => void) | null = null
  onAttack: (() => void) | null = null

  constructor() {
    window.addEventListener('keydown', e => {
      const keyState = this.keys.get(e.key)
      if (keyState) {
        keyState.pressed = true
        this.lastKey = keyState.keyAction

        if (this.lastKey === 'Jump') {
          this.onJump?.()
        }
        if (this.lastKey === 'Attack') {
          this.onAttack?.()
        }
      }
    })
    window.addEventListener('keyup', e => {
      const keyState = this.keys.get(e.key)
      if (keyState) {
        keyState.pressed = false
      }
    })
  }

  getKey(key: KeyAction): KeyState | undefined {
    return [...this.keys.values()].find(keyState => keyState.keyAction === key)
  }

  addKey = (keyName: KeyName, keyAction: KeyAction) => {
    this.keys.set(keyName, {pressed: false, keyAction})
    return this
  }
}

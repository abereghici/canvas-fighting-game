import {GAME_DURATION} from './config'
import Fighter from './fighter'

export function rectangularCollision({
  rectangle1,
  rectangle2,
}: {
  rectangle1: Fighter
  rectangle2: Fighter
}) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

let timer = GAME_DURATION
let timerId: number | undefined

export function determineWinner({
  player,
  enemy,
}: {
  player: Fighter
  enemy: Fighter
}) {
  clearTimeout(timerId)
  const gameStatus = document.querySelector('#gameStatus') as HTMLDivElement
  gameStatus.style.display = 'flex'

  if (player.health === enemy.health) {
    gameStatus.innerHTML = 'Tie'
  } else if (player.health > enemy.health) {
    gameStatus.innerHTML = 'Player 1 Wins'
  } else {
    gameStatus.innerHTML = 'Player 2 Wins'
  }
}

export function decreaseTimer({
  player,
  enemy,
}: {
  player: Fighter
  enemy: Fighter
}) {
  if (timer > 0) {
    timerId = setTimeout(() => decreaseTimer({player, enemy}), 1000)
    timer--
    document.querySelector('#timer')!.innerHTML = `${timer}`
  }

  if (timer === 0) {
    determineWinner({player, enemy})
  }
}

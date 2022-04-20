import Fighter from './fighter'

export function detect({
  fighter1,
  fighter2,
}: {
  fighter1: Fighter
  fighter2: Fighter
}) {
  return (
    fighter1.attackBox.position.x + fighter1.attackBox.width >=
      fighter2.position.x &&
    fighter1.attackBox.position.x <= fighter2.position.x + fighter2.width &&
    fighter1.attackBox.position.y + fighter1.attackBox.height >=
      fighter2.position.y &&
    fighter1.attackBox.position.y <= fighter2.position.y + fighter2.height
  )
}

export default {
  detect,
}

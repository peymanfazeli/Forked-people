import type { Character } from '../types'
import stevejobs from './stevejobs.json'
import nikolatesla from './nikolatesla.json'
import billgates from './billgates.json'
import alberteinstine from './alberteinstine.json'

export const characters: Character[] = [
  stevejobs as Character,
  nikolatesla as Character,
  billgates as Character,
  alberteinstine as Character,
]

export function getCharacter(id: string): Character | undefined {
  return characters.find(c => c.id === id)
}

export function getRandomCharacter(excludeId?: string): Character {
  const pool = excludeId
    ? characters.filter(c => c.id !== excludeId)
    : characters
  return pool[Math.floor(Math.random() * pool.length)]
}

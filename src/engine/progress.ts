import type { Character, GameEvent } from '../types'

function eventById(character: Character): (id: number | null) => GameEvent | undefined {
  const byId = new Map<number, GameEvent>()
  for (const event of character.events) {
    byId.set(event.id, event)
  }
  return id => (id === null ? undefined : byId.get(id))
}

export function computePathLengths(character: Character): Map<number, number> {
  const byId = eventById(character)
  const lengths = new Map<number, number>()
  const visiting = new Set<number>()

  function length(id: number | null): number {
    if (id === null) return 0
    const cached = lengths.get(id)
    if (cached !== undefined) return cached
    if (visiting.has(id)) return 0

    const event = byId(id)
    if (!event) return 0

    visiting.add(id)
    const result = 1 + Math.max(length(event.yes.nextEvent), length(event.no.nextEvent))
    visiting.delete(id)
    lengths.set(id, result)
    return result
  }

  for (const event of character.events) {
    length(event.id)
  }

  return lengths
}

export function countGuaranteedRun(character: Character, fromEventId: number | null): number {
  if (fromEventId === null) return 0

  const byId = eventById(character)
  let id: number | null = fromEventId
  let count = 0

  while (id !== null) {
    const event = byId(id)
    if (!event) break

    count += 1

    if (event.yes.nextEvent === null || event.yes.nextEvent !== event.no.nextEvent) {
      break
    }
    id = event.yes.nextEvent
  }

  return count
}

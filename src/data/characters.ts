import type { Character, Choice, GameEvent } from '../types'
import type { Language } from '../i18n/ui'
import stevejobs from './stevejobs.json'
import nikolatesla from './nikolatesla.json'
import billgates from './billgates.json'
import alberteinstine from './alberteinstine.json'
import faStevejobs from './fa/stevejobs.json'
import faNikolatesla from './fa/nikolatesla.json'
import faBillgates from './fa/billgates.json'
import faAlbertEinstein from './fa/alberteinstine.json'

export const characters: Character[] = [
  stevejobs as Character,
  nikolatesla as Character,
  billgates as Character,
  alberteinstine as Character,
]

interface LocalizedChoice {
  consequence: string
  historicalConsequence?: string
}

interface LocalizedEvent {
  id: number
  chapter: string
  title: string
  playerFact: string
  historicalFact: string
  question: string
  yes: LocalizedChoice
  no: LocalizedChoice
}

interface LocalizedCharacter {
  id: string
  name: string
  description: string
  ending: { title: string }
  events: LocalizedEvent[]
}

const faCharacters: Record<string, LocalizedCharacter> = {
  'steve-jobs': faStevejobs as LocalizedCharacter,
  'nikola-tesla': faNikolatesla as LocalizedCharacter,
  'bill-gates': faBillgates as LocalizedCharacter,
  'albert-einstein': faAlbertEinstein as LocalizedCharacter,
}

function pickText(source: string | undefined, fallback: string): string {
  return source && source.trim() !== '' ? source : fallback
}

function localizeChoice(
  choice: Choice,
  overlay: LocalizedChoice | undefined
): Choice {
  if (!overlay) return choice
  return {
    ...choice,
    consequence: pickText(overlay.consequence, choice.consequence),
    historicalConsequence: overlay.historicalConsequence
      ? pickText(overlay.historicalConsequence, choice.historicalConsequence ?? choice.consequence)
      : choice.historicalConsequence,
  }
}

function localizeEvent(event: GameEvent, overlay: LocalizedEvent | undefined): GameEvent {
  if (!overlay) return event
  return {
    ...event,
    chapter: pickText(overlay.chapter, event.chapter),
    title: pickText(overlay.title, event.title),
    playerFact: pickText(overlay.playerFact, event.playerFact),
    historicalFact: pickText(overlay.historicalFact, event.historicalFact),
    question: pickText(overlay.question, event.question),
    yes: localizeChoice(event.yes, overlay.yes),
    no: localizeChoice(event.no, overlay.no),
  }
}

export function localizeCharacter(character: Character, lang: Language): Character {
  if (lang !== 'fa') return character

  const overlay = faCharacters[character.id]
  if (!overlay) return character

  const eventOverlays = new Map(overlay.events.map(e => [e.id, e]))

  return {
    ...character,
    name: pickText(overlay.name, character.name),
    description: pickText(overlay.description, character.description),
    ending: {
      ...character.ending,
      title: pickText(overlay.ending.title, character.ending.title),
    },
    events: character.events.map(event => localizeEvent(event, eventOverlays.get(event.id))),
  }
}

export function getCharacter(id: string, lang: Language = 'en'): Character | undefined {
  const character = characters.find(c => c.id === id)
  return character ? localizeCharacter(character, lang) : undefined
}

export function getRandomCharacter(excludeId?: string, lang: Language = 'en'): Character {
  const pool = excludeId
    ? characters.filter(c => c.id !== excludeId)
    : characters
  const character = pool[Math.floor(Math.random() * pool.length)]
  return localizeCharacter(character, lang)
}

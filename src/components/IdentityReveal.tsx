import { useEffect, useState } from 'react'
import type { Character } from '../types'
import { audio } from '../engine/audio'

interface Props {
  character: Character
  onComplete: () => void
}

export default function IdentityReveal({ character, onComplete }: Props) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    audio.play('reveal')
    const t1 = setTimeout(() => setStep(1), 600)
    const t2 = setTimeout(() => setStep(2), 1400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="screen reveal-screen">
      <div className="reveal-content glass">
        {step >= 0 && (
          <p className="reveal-line reveal-line-1">
            Your journey is complete.
          </p>
        )}
        {step >= 1 && (
          <p className="reveal-line reveal-line-2">
            You were living the life of...
          </p>
        )}
        {step >= 2 && (
          <div className="reveal-identity">
            <h1 className="reveal-name">{character.name}</h1>
            <p className="reveal-years">
              {character.birthYear}&ndash;{character.deathYear ?? 'Present'}
            </p>
            <button className="btn btn-primary" onClick={onComplete}>
              See Your Results
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

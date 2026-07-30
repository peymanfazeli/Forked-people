import type { Character } from '../types'

interface Props {
  character: Character
  onStart: () => void
}

export default function GameIntro({ character, onStart }: Props) {
  return (
    <div className="screen intro-screen">
      <div className="intro-content glass">
        <p className="intro-label">Your journey begins...</p>
        <p className="intro-description">{character.description}</p>
        <p className="intro-hint">
          At each moment, choose what <em>you</em> would do.
        </p>
        <button className="btn btn-primary" onClick={onStart}>
          Begin
        </button>
      </div>
    </div>
  )
}

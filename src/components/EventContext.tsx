interface Props {
  year: number
  playerFact: string
}

export default function EventContext({ year, playerFact }: Props) {
  return (
    <div className="event-context">
      <span className="event-year">{year}</span>
      <p className="event-fact">{playerFact}</p>
    </div>
  )
}

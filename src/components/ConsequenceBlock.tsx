interface Props {
  consequence: string
  onContinue: () => void
}

export default function ConsequenceBlock({ consequence, onContinue }: Props) {
  return (
    <div className="consequence-block">
      <p className="consequence-text">{consequence}</p>
      <button className="btn btn-continue" onClick={onContinue}>
        Continue
      </button>
    </div>
  )
}

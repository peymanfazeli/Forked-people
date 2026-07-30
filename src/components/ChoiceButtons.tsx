interface Props {
  onChoice: (choice: 'yes' | 'no') => void
  disabled: boolean
}

export default function ChoiceButtons({ onChoice, disabled }: Props) {
  return (
    <div className="choice-buttons">
      <button
        className="btn btn-choice btn-yes"
        onClick={() => onChoice('yes')}
        disabled={disabled}
      >
        YES
      </button>
      <button
        className="btn btn-choice btn-no"
        onClick={() => onChoice('no')}
        disabled={disabled}
      >
        NO
      </button>
    </div>
  )
}

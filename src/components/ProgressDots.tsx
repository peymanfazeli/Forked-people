interface Props {
  total: number
  completed: number
}

export default function ProgressDots({ total, completed }: Props) {
  return (
    <div className="progress" role="progressbar" aria-valuenow={completed} aria-valuemin={0} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`progress-dot${i < completed ? ' completed' : ''}`}
        />
      ))}
    </div>
  )
}

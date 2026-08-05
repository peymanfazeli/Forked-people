interface Props {
  total: number
  completed: number
  definite?: number
}

export default function ProgressDots({ total, completed, definite = completed }: Props) {
  return (
    <div className="progress" role="progressbar" aria-valuenow={completed} aria-valuemin={0} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => {
        let className = 'progress-dot'
        if (i < completed) className += ' completed'
        else if (i < definite) className += ' definite'
        else className += ' possible'
        return <span key={i} className={className} />
      })}
    </div>
  )
}

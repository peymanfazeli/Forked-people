interface Props {
  question: string
}

export default function QuestionBlock({ question }: Props) {
  return (
    <div className="question-block">
      <p className="question-text">{question}</p>
    </div>
  )
}

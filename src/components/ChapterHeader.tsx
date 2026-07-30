interface Props {
  chapter: string
}

export default function ChapterHeader({ chapter }: Props) {
  return (
    <div className="chapter-header">
      <span className="chapter-label">Chapter</span>
      <span className="chapter-name">{chapter}</span>
    </div>
  )
}

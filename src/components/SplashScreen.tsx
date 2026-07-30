interface Props {
  onBegin: () => void
}

export default function SplashScreen({ onBegin }: Props) {
  return (
    <div className="screen splash-screen">
      <div className="splash-overlay" />
      <div className="splash-content">
        <h1 className="splash-title">Life Decisions</h1>
        <p className="splash-subtitle">
          Live another life. Make the choices that shape history.
        </p>
        <button className="btn btn-primary btn-splash" onClick={onBegin}>
          Begin Your Journey
        </button>
      </div>
    </div>
  )
}

import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas-lite'

interface Props {
  src: string
  rotation?: number
  cover?: boolean
}

export default function RiveBackground({ src, rotation = 0, cover = false }: Props) {
  const { RiveComponent } = useRive({
    src,
    autoplay: true,
    layout: new Layout({
      fit: cover ? Fit.Cover : Fit.Contain,
      alignment: Alignment.Center,
      rotation: rotation * (Math.PI / 180),
    }),
  })

  return (
    <div className="rive-bg" aria-hidden="true">
      <RiveComponent />
    </div>
  )
}

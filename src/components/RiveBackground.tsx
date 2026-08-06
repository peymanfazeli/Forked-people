import { useState } from 'react'
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas-lite'

interface Props {
  src: string
  rotation?: number
  cover?: boolean
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function RiveBackground({ src, rotation = 0, cover = false }: Props) {
  const [autoplay] = useState(() => !prefersReducedMotion())

  const { RiveComponent } = useRive({
    src,
    autoplay,
    layout: new Layout({
      fit: cover ? Fit.Cover : Fit.Contain,
      alignment: Alignment.Center,
    }),
  })

  const isRotated = rotation !== 0

  return (
    <div className="rive-bg" aria-hidden="true">
      <div
        className={isRotated ? 'rive-bg-canvas rive-bg-canvas-rotated' : 'rive-bg-canvas'}
        style={isRotated ? { transform: `translate(-50%, -50%) rotate(${rotation}deg)` } : undefined}
      >
        <RiveComponent />
      </div>
    </div>
  )
}

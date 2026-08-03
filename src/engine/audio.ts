type SoundName =
  | 'click'
  | 'decision'
  | 'consequence'
  | 'chapter'
  | 'reveal'
  | 'complete'

const BACKGROUND_URL = '/background_sound.mp3'
const BACKGROUND_TARGET_VOLUME = 0.4
const BACKGROUND_FADE_MS = 2000

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

class AudioService {
  private sounds = new Map<SoundName, HTMLAudioElement>()
  private background: HTMLAudioElement | null = null
  private fadeRaf = 0
  private bgFadeProgress = 0
  private deferredStart = this.retryOnFirstGesture.bind(this)

  private _volume = 1
  private _bgMusic = true
  private _clickEnabled = true

  constructor() {
    try {
      const volume = localStorage.getItem('life-decisions-volume')
      if (volume !== null && !Number.isNaN(Number(volume))) {
        this._volume = clamp01(Number(volume))
      }
      if (localStorage.getItem('life-decisions-bg-music') === 'off') {
        this._bgMusic = false
      }
      if (localStorage.getItem('life-decisions-click') === 'off') {
        this._clickEnabled = false
      }
    } catch {}
  }

  get volume() {
    return this._volume
  }

  get bgMusic() {
    return this._bgMusic
  }

  get clickEnabled() {
    return this._clickEnabled
  }

  load(name: SoundName, url: string) {
    const audio = new Audio(url)
    audio.preload = 'auto'
    this.sounds.set(name, audio)
  }

  play(name: SoundName) {
    if (name === 'click' && !this._clickEnabled) return
    const sound = this.sounds.get(name)
    if (sound) {
      try {
        sound.currentTime = 0
      } catch {}
      sound.volume = this._volume
      sound.play().catch(() => {})
    }
  }

  setVolume(v: number) {
    this._volume = clamp01(v)
    try {
      localStorage.setItem('life-decisions-volume', String(this._volume))
    } catch {}
    if (this.background) {
      this.background.volume = this.bgTargetVolume() * this.bgFadeProgress
    }
  }

  setBackgroundMusic(on: boolean) {
    this._bgMusic = on
    try {
      localStorage.setItem('life-decisions-bg-music', on ? 'on' : 'off')
    } catch {}
    if (on) {
      this.startBackground()
    } else {
      this.stopBackground()
    }
  }

  setClickEnabled(on: boolean) {
    this._clickEnabled = on
    try {
      localStorage.setItem('life-decisions-click', on ? 'on' : 'off')
    } catch {}
  }

  startBackground() {
    if (!this._bgMusic) return

    if (!this.background) {
      const audio = new Audio(BACKGROUND_URL)
      audio.loop = true
      audio.preload = 'auto'
      audio.volume = 0
      this.background = audio
      this.bgFadeProgress = 0
    }

    this.tryPlayBackground()
  }

  private bgTargetVolume() {
    return BACKGROUND_TARGET_VOLUME * this._volume
  }

  private tryPlayBackground() {
    if (!this.background) return
    const alreadyFaded = !this.background.paused && this.bgFadeProgress >= 1
    this.background
      .play()
      .then(() => {
        if (!alreadyFaded) this.fadeIn()
      })
      .catch(() => this.armGestureStart())
  }

  private armGestureStart() {
    window.addEventListener('pointerdown', this.deferredStart)
    window.addEventListener('keydown', this.deferredStart)
  }

  private disengageGestureStart() {
    window.removeEventListener('pointerdown', this.deferredStart)
    window.removeEventListener('keydown', this.deferredStart)
  }

  private fadeIn() {
    cancelAnimationFrame(this.fadeRaf)
    const audio = this.background
    if (!audio) return

    const start = performance.now()
    const step = (now: number) => {
      if (!this.background) return
      const t = clamp01((now - start) / BACKGROUND_FADE_MS)
      this.bgFadeProgress = t
      audio.volume = this.bgTargetVolume() * t
      if (t < 1) this.fadeRaf = requestAnimationFrame(step)
    }
    this.fadeRaf = requestAnimationFrame(step)
  }

  private stopBackground() {
    cancelAnimationFrame(this.fadeRaf)
    this.disengageGestureStart()
    if (this.background) {
      this.background.pause()
      this.background.volume = 0
    }
    this.bgFadeProgress = 0
  }

  private retryOnFirstGesture() {
    this.disengageGestureStart()
    if (this._bgMusic && this.background) {
      this.tryPlayBackground()
    }
  }
}

export const audio = new AudioService()

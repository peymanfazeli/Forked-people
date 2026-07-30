type SoundName = 'decision' | 'consequence' | 'chapter' | 'reveal' | 'complete'

class AudioService {
  private _enabled = true
  private sounds = new Map<SoundName, HTMLAudioElement>()

  constructor() {
    try {
      const pref = localStorage.getItem('life-decisions-audio')
      if (pref === 'off') this._enabled = false
    } catch {}
  }

  get enabled() {
    return this._enabled
  }

  load(name: SoundName, url: string) {
    const audio = new Audio(url)
    audio.preload = 'auto'
    this.sounds.set(name, audio)
  }

  play(name: SoundName) {
    if (!this._enabled) return
    const sound = this.sounds.get(name)
    if (sound) {
      sound.currentTime = 0
      sound.play().catch(() => {})
    }
  }

  toggle() {
    this._enabled = !this._enabled
    try {
      localStorage.setItem(
        'life-decisions-audio',
        this._enabled ? 'on' : 'off'
      )
    } catch {}
    return this._enabled
  }
}

export const audio = new AudioService()

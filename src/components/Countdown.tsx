import { useEffect, useState } from 'react'
import {
  DEADLINE,
  WINDOW_START,
  percentElapsed,
  remainingUntil,
  totalHoursLeft,
} from '../lib/deadline'

function useNow(): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

const pad = (n: number) => String(n).padStart(2, '0')

function Segment({ value, label }: { value: string; label: string }) {
  return (
    <span className="seg">
      <span className="seg-value">{value}</span>
      <span className="seg-label">{label}</span>
    </span>
  )
}

export default function Countdown() {
  const now = useNow()
  const remaining = remainingUntil(DEADLINE, now)
  const consumed = percentElapsed(WINDOW_START, DEADLINE, now)

  return (
    <section className="terminal" aria-label="Countdown to the Fable 5 cutoff">
      <div className="terminal-bar">
        <span className="dot dot-red" />
        <span className="dot dot-yellow" />
        <span className="dot dot-green" />
        <span className="terminal-title">fable5 — last call</span>
      </div>
      <div className="terminal-body">
        <p className="prompt">
          <span className="prompt-mark">❯</span> fable5 --remaining
        </p>
        <p className={`countdown-time${remaining.expired ? ' expired' : ''}`}>
          <Segment value={pad(remaining.days)} label="days" />
          <span className="sep" aria-hidden="true">
            :
          </span>
          <Segment value={pad(remaining.hours)} label="hrs" />
          <span className="sep" aria-hidden="true">
            :
          </span>
          <Segment value={pad(remaining.minutes)} label="min" />
          <span className="sep" aria-hidden="true">
            :
          </span>
          <Segment value={pad(remaining.seconds)} label="sec" />
        </p>
        <p className="countdown-sub">
          {remaining.expired
            ? 'Fable 5 has left your Claude plan'
            : 'until Fable 5 leaves your Claude plan'}
        </p>
        {!remaining.expired && (
          <p className="countdown-hours">
            = <strong>{totalHoursLeft(DEADLINE, now)}</strong> hours left to use it
          </p>
        )}
        <div
          className="meter"
          role="progressbar"
          aria-valuenow={Math.round(consumed)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Included-access window consumed"
        >
          <div className="meter-fill" style={{ width: `${consumed}%` }} />
        </div>
        <p className="meter-label">
          {remaining.expired
            ? 'the included-access window is over'
            : `${consumed.toFixed(1)}% of the included-access window is gone`}
        </p>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { DEADLINE, formatRemaining, remainingUntil } from '../lib/deadline'

function useNow(): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export default function Countdown() {
  const now = useNow()
  const remaining = remainingUntil(DEADLINE, now)

  return (
    <section className="countdown">
      <p className="countdown-title">FABLE 5 — LAST CALL</p>
      <p className={`countdown-time${remaining.expired ? ' expired' : ''}`}>
        {formatRemaining(remaining)}
      </p>
      <p className="countdown-sub">
        {remaining.expired
          ? 'Fable 5 has left your Claude plan'
          : 'until Fable 5 leaves your Claude plan'}
      </p>
    </section>
  )
}

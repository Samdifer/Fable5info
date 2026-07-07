import { useMemo, useState } from 'react'
import { detectZone, formatDeadlineIn, timezoneList } from '../lib/deadline'

export default function TimezoneCalculator() {
  const detected = useMemo(detectZone, [])
  const zones = useMemo(timezoneList, [])
  const [zone, setZone] = useState(detected)

  return (
    <section className="card">
      <h2>When does it end for you?</h2>
      <p className="tz-result">
        In <strong>{zone.replace(/_/g, ' ')}</strong>, Fable 5 stops being included at
        <br />
        <span className="tz-time">{formatDeadlineIn(zone)}</span>
      </p>
      <label className="tz-label">
        Check another timezone{' '}
        <select value={zone} onChange={(e) => setZone(e.target.value)}>
          {zones.map((z) => (
            <option key={z} value={z}>
              {z.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
      </label>
      {zone !== detected && (
        <button className="tz-reset" onClick={() => setZone(detected)}>
          back to your timezone ({detected.replace(/_/g, ' ')})
        </button>
      )}
      <p className="disclaimer">
        Anthropic has only announced the <em>date</em> — July 12, 2026. This site assumes the
        cutoff lands at 11:59:59&nbsp;PM Mountain Time; the exact hour could differ.
      </p>
    </section>
  )
}

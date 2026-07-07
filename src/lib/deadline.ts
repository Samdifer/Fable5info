// = July 12, 2026 11:59:59 PM America/Denver (MDT, UTC-6). Anthropic announced the
// July 12 date only; the hour is this site's stated Mountain Time assumption.
export const DEADLINE = new Date('2026-07-13T05:59:59Z')

export interface Remaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

export function remainingUntil(deadline: Date, now: Date): Remaining {
  const ms = deadline.getTime() - now.getTime()
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  const t = Math.floor(ms / 1000)
  return {
    days: Math.floor(t / 86400),
    hours: Math.floor((t % 86400) / 3600),
    minutes: Math.floor((t % 3600) / 60),
    seconds: t % 60,
    expired: false,
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

export function formatRemaining(r: Remaining): string {
  return `${r.days}d ${pad(r.hours)}:${pad(r.minutes)}:${pad(r.seconds)}`
}

export function formatDeadlineIn(zone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(DEADLINE)
}

const FALLBACK_ZONES = [
  'Pacific/Honolulu',
  'America/Anchorage',
  'America/Los_Angeles',
  'America/Denver',
  'America/Chicago',
  'America/New_York',
  'America/Sao_Paulo',
  'Atlantic/Reykjavik',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Athens',
  'Europe/Moscow',
  'Africa/Cairo',
  'Africa/Johannesburg',
  'Asia/Dubai',
  'Asia/Karachi',
  'Asia/Kolkata',
  'Asia/Bangkok',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Asia/Seoul',
  'Australia/Sydney',
  'Pacific/Auckland',
]

export function timezoneList(): string[] {
  try {
    return Intl.supportedValuesOf('timeZone')
  } catch {
    return FALLBACK_ZONES
  }
}

export function detectZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Denver'
}

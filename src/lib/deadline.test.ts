import { describe, it, expect } from 'vitest'
import { DEADLINE, remainingUntil, formatRemaining, formatDeadlineIn } from './deadline'

describe('remainingUntil', () => {
  it('breaks down remaining time', () => {
    const now = new Date(DEADLINE.getTime() - (2 * 86400 + 3 * 3600 + 4 * 60 + 5) * 1000)
    expect(remainingUntil(DEADLINE, now)).toEqual({
      days: 2,
      hours: 3,
      minutes: 4,
      seconds: 5,
      expired: false,
    })
  })

  it('clamps at zero after the deadline', () => {
    const now = new Date(DEADLINE.getTime() + 1000)
    expect(remainingUntil(DEADLINE, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    })
  })
})

describe('formatRemaining', () => {
  it('pads to Xd HH:MM:SS', () => {
    expect(formatRemaining({ days: 5, hours: 1, minutes: 2, seconds: 3, expired: false })).toBe(
      '5d 01:02:03'
    )
  })
})

describe('formatDeadlineIn', () => {
  it('is 11:59 PM on July 12 in Denver', () => {
    const s = formatDeadlineIn('America/Denver')
    expect(s).toContain('11:59')
    expect(s).toContain('July 12')
  })

  it('rolls over to July 13 in Tokyo', () => {
    expect(formatDeadlineIn('Asia/Tokyo')).toContain('July 13')
  })
})

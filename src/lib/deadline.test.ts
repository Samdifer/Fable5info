import { describe, it, expect } from 'vitest'
import {
  DEADLINE,
  WINDOW_START,
  remainingUntil,
  formatRemaining,
  formatDeadlineIn,
  totalHoursLeft,
  percentElapsed,
} from './deadline'

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

describe('totalHoursLeft', () => {
  it('returns total hours to one decimal', () => {
    const now = new Date(DEADLINE.getTime() - (2 * 86400 + 3 * 3600 + 4 * 60 + 5) * 1000)
    expect(totalHoursLeft(DEADLINE, now)).toBe('51.1')
  })

  it('clamps at zero after the deadline', () => {
    expect(totalHoursLeft(DEADLINE, new Date(DEADLINE.getTime() + 1000))).toBe('0.0')
  })
})

describe('percentElapsed', () => {
  it('is 50 at the midpoint of the window', () => {
    const mid = new Date((WINDOW_START.getTime() + DEADLINE.getTime()) / 2)
    expect(percentElapsed(WINDOW_START, DEADLINE, mid)).toBeCloseTo(50, 5)
  })

  it('clamps to 0 before the window and 100 after', () => {
    expect(percentElapsed(WINDOW_START, DEADLINE, new Date(WINDOW_START.getTime() - 1000))).toBe(0)
    expect(percentElapsed(WINDOW_START, DEADLINE, new Date(DEADLINE.getTime() + 1000))).toBe(100)
  })
})

describe('formatDeadlineIn', () => {
  it('is 11:59 PM on July 12 in San Francisco (Pacific)', () => {
    const s = formatDeadlineIn('America/Los_Angeles')
    expect(s).toContain('11:59')
    expect(s).toContain('July 12')
  })

  it('is 12:59 AM on July 13 in Denver', () => {
    const s = formatDeadlineIn('America/Denver')
    expect(s).toContain('12:59')
    expect(s).toContain('July 13')
  })

  it('rolls over to July 13 in Tokyo', () => {
    expect(formatDeadlineIn('Asia/Tokyo')).toContain('July 13')
  })
})

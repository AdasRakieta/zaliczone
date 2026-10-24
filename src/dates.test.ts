import { expect, it } from 'vitest'
import { calendarDaysBetween } from './dates'

it('liczy dni kalendarzowe także przez jesienną i wiosenną zmianę czasu', () => {
  expect(calendarDaysBetween('2026-10-26', '2026-10-24')).toBe(2)
  expect(calendarDaysBetween('2026-03-30', '2026-03-28')).toBe(2)
  expect(calendarDaysBetween('2026-10-24', '2026-10-24')).toBe(0)
  expect(calendarDaysBetween('2026-10-23', '2026-10-24')).toBe(-1)
})

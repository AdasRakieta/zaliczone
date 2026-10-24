import { describe, expect, it } from 'vitest'
import { emptyData, parsePlannerData, readData, storageKey } from './types'

describe('format planu', () => {
  it('akceptuje pusty plan i poprawne powiązane wpisy', () => {
    localStorage.setItem(storageKey, '{uszkodzony zapis')
    expect(readData()).toEqual(emptyData)
    localStorage.clear()
    expect(parsePlannerData(emptyData)).toEqual(emptyData)
    expect(parsePlannerData({
      version: 1,
      subjects: [{ id: 's1', name: 'Matematyka', color: '#abc' }],
      exams: [{ id: 'e1', subjectId: 's1', title: 'Egzamin', date: '2026-11-02', type: 'Egzamin' }],
      tasks: [{ id: 't1', subjectId: 's1', title: 'Powtórka', dueDate: '2026-11-01', done: false }],
    }).subjects).toHaveLength(1)
  })
  it('odrzuca nieobsługiwaną wersję i nieprawidłowe relacje', () => {
    expect(() => parsePlannerData({ ...emptyData, version: 2 })).toThrow('Nieobsługiwany format')
    expect(() => parsePlannerData({ ...emptyData, tasks: [{ id: 't1', subjectId: 'missing', title: 'X', dueDate: '2026-11-01', done: false }] })).toThrow('niepoprawne dane')
  })
  it('odrzuca błędny rodzaj zaliczenia, duplikat identyfikatora i pustą nazwę przedmiotu', () => {
    expect(() => parsePlannerData({ ...emptyData, subjects: [{ id: 's1', name: ' ', color: '#abc' }] })).toThrow('Dane przedmiotu')
    expect(() => parsePlannerData({ ...emptyData, subjects: [{ id: 's1', name: 'A', color: '#abc' }, { id: 's1', name: 'B', color: '#def' }] })).toThrow('Dane przedmiotu')
    expect(() => parsePlannerData({ ...emptyData, subjects: [{ id: 's1', name: 'A', color: '#abc' }], exams: [{ id: 'e1', subjectId: 's1', title: 'X', date: '2026-11-01', type: 'Quiz' }] })).toThrow('Rodzaj zaliczenia')
  })
})

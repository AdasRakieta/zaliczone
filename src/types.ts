export type Subject = { id: string; name: string; color: string }
export type Exam = { id: string; subjectId: string; title: string; date: string; type: 'Egzamin' | 'Kolokwium' | 'Projekt' }
export type StudyTask = { id: string; subjectId: string; title: string; dueDate: string; done: boolean }
export type PlannerData = { version: 1; subjects: Subject[]; exams: Exam[]; tasks: StudyTask[] }

export const emptyData: PlannerData = { version: 1, subjects: [], exams: [], tasks: [] }
export const storageKey = 'zaliczone:data:v1'

export function parsePlannerData(value: unknown): PlannerData {
  if (!value || typeof value !== 'object') throw new Error('Plik nie zawiera poprawnego planu.')
  const data = value as Partial<PlannerData>
  if (data.version !== 1 || !Array.isArray(data.subjects) || !Array.isArray(data.exams) || !Array.isArray(data.tasks)) {
    throw new Error('Nieobsługiwany format pliku. Zaimportuj kopię zapisaną w aplikacji.')
  }
  const ids = new Set<string>()
  for (const subject of data.subjects) {
    if (!subject || typeof subject.id !== 'string' || !subject.id || typeof subject.name !== 'string' || !subject.name.trim() || typeof subject.color !== 'string' || ids.has(subject.id)) throw new Error('Dane przedmiotu są niepoprawne.')
    ids.add(subject.id)
  }
  const subjectIds = new Set(data.subjects.map((subject) => subject.id))
  const idsSeen = new Set<string>(ids)
  for (const record of data.exams) {
    if (!record || typeof record.id !== 'string' || !record.id || idsSeen.has(record.id) || !subjectIds.has(record.subjectId) || typeof record.title !== 'string' || !record.title.trim() || typeof record.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(record.date)) throw new Error('Termin lub zadanie zawiera niepoprawne dane.')
    idsSeen.add(record.id)
  }
  for (const record of data.tasks) {
    if (!record || typeof record.id !== 'string' || !record.id || idsSeen.has(record.id) || !subjectIds.has(record.subjectId) || typeof record.title !== 'string' || !record.title.trim() || typeof record.dueDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(record.dueDate)) throw new Error('Termin lub zadanie zawiera niepoprawne dane.')
    idsSeen.add(record.id)
  }
  if (data.exams.some((exam) => !['Egzamin', 'Kolokwium', 'Projekt'].includes(exam.type))) throw new Error('Rodzaj zaliczenia jest niepoprawny.')
  if (data.tasks.some((task) => typeof task.done !== 'boolean')) throw new Error('Status zadania jest niepoprawny.')
  return data as PlannerData
}

export function readData(): PlannerData {
  try {
    const raw = localStorage.getItem(storageKey)
    return raw ? parsePlannerData(JSON.parse(raw)) : emptyData
  } catch {
    return emptyData
  }
}

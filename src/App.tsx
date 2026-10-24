import { useMemo, useRef, useState } from 'react'
import { ArrowDownToLine, ArrowRight, BookOpen, CalendarDays, Check, CheckCheck, ChevronDown, CircleHelp, GraduationCap, Plus, RotateCcw, Sparkles, Trash2, Upload, X } from './components/Icons'
import { emptyData, parsePlannerData, readData, storageKey, type Exam, type PlannerData, type StudyTask, type Subject } from './types'

const colors = ['#6d8f68', '#c9855d', '#8183b7', '#d0a944', '#5d99a1', '#b86d80']
const today = () => {
  const value = new Date()
  const local = new Date(value.getTime() - value.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 10)
}
const uid = () => crypto.randomUUID()
const formatDate = (date: string) => new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long' }).format(new Date(date + 'T12:00:00'))
const dayGap = (date: string) => Math.ceil((new Date(date + 'T00:00:00').getTime() - new Date(today() + 'T00:00:00').getTime()) / 86400000)

function seedData(): PlannerData {
  const subjects: Subject[] = [
    { id: 's1', name: 'Programowanie obiektowe', color: colors[0] },
    { id: 's2', name: 'Matematyka dyskretna', color: colors[2] },
    { id: 's3', name: 'Bazy danych', color: colors[4] },
  ]
  const shift = (days: number) => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
  }
  return {
    version: 1, subjects,
    exams: [
      { id: 'e1', subjectId: 's1', title: 'Kolokwium — klasy i obiekty', date: shift(2), type: 'Kolokwium' },
      { id: 'e2', subjectId: 's2', title: 'Egzamin z kombinatoryki', date: shift(6), type: 'Egzamin' },
      { id: 'e3', subjectId: 's3', title: 'Oddanie projektu SQL', date: shift(10), type: 'Projekt' },
    ],
    tasks: [
      { id: 't1', subjectId: 's1', title: 'Powtórzyć dziedziczenie i interfejsy', dueDate: shift(1), done: false },
      { id: 't2', subjectId: 's1', title: 'Rozwiązać zadania z listy 4', dueDate: shift(2), done: false },
      { id: 't3', subjectId: 's2', title: 'Przerobić notatki z kombinatoryki', dueDate: shift(4), done: false },
      { id: 't4', subjectId: 's3', title: 'Uzupełnić diagram relacji', dueDate: shift(5), done: true },
    ],
  }
}

export default function App() {
  const [data, setData] = useState<PlannerData>(readData)
  const [filter, setFilter] = useState('all')
  const [modal, setModal] = useState<'subject' | 'exam' | 'task' | 'help' | null>(null)
  const [toast, setToast] = useState('')
  const [showDemo, setShowDemo] = useState(false)
  const importRef = useRef<HTMLInputElement>(null)
  const save = (next: PlannerData) => { setData(next); localStorage.setItem(storageKey, JSON.stringify(next)) }
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2800) }
  const subjects = useMemo(() => new Map(data.subjects.map((subject) => [subject.id, subject])), [data.subjects])
  const exams = useMemo(() => data.exams.filter((exam) => filter === 'all' || exam.subjectId === filter).sort((a, b) => a.date.localeCompare(b.date)), [data.exams, filter])
  const tasks = useMemo(() => data.tasks.filter((task) => filter === 'all' || task.subjectId === filter).sort((a, b) => a.dueDate.localeCompare(b.dueDate)), [data.tasks, filter])
  const upcoming = exams[0]
  const unfinished = tasks.filter((task) => !task.done).length
  const doneCount = data.tasks.filter((task) => task.done).length
  const progress = data.tasks.length ? Math.round(doneCount / data.tasks.length * 100) : 0
  function openEntry(kind: 'task' | 'exam') {
    if (!data.subjects.length) {
      setModal('subject')
      notify('Najpierw dodaj przedmiot.')
      return
    }
    setModal(kind)
  }

  function addSubject(name: string) {
    if (!name.trim()) return
    save({ ...data, subjects: [...data.subjects, { id: uid(), name: name.trim(), color: colors[data.subjects.length % colors.length] }] })
    setModal(null); notify('Przedmiot dodany do planu.')
  }
  function addExam(subjectId: string, title: string, date: string, type: Exam['type']) {
    save({ ...data, exams: [...data.exams, { id: uid(), subjectId, title: title.trim(), date, type }] })
    setModal(null); notify('Termin zapisany.')
  }
  function addTask(subjectId: string, title: string, dueDate: string) {
    save({ ...data, tasks: [...data.tasks, { id: uid(), subjectId, title: title.trim(), dueDate, done: false }] })
    setModal(null); notify('Zadanie dodane.')
  }
  function toggleTask(taskId: string) {
    save({ ...data, tasks: data.tasks.map((task) => task.id === taskId ? { ...task, done: !task.done } : task) })
  }
  function deleteSubject(subjectId: string) {
    const subject = subjects.get(subjectId)
    if (!subject || !window.confirm('Usunąć „' + subject.name + '” razem z jego terminami i zadaniami?')) return
    save({ ...data, subjects: data.subjects.filter((item) => item.id !== subjectId), exams: data.exams.filter((item) => item.subjectId !== subjectId), tasks: data.tasks.filter((item) => item.subjectId !== subjectId) })
    if (filter === subjectId) setFilter('all')
    notify('Przedmiot i powiązane wpisy usunięte.')
  }
  function exportData() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
    const link = document.createElement('a'); link.href = url; link.download = 'zaliczone-kopia.json'; link.click(); URL.revokeObjectURL(url)
    notify('Kopia planu została pobrana.')
  }
  async function importData(file?: File) {
    if (!file) return
    try {
      const parsed = parsePlannerData(JSON.parse(await file.text()))
      save(parsed); setFilter('all'); notify('Plan został odtworzony z kopii.')
    } catch (error) { notify(error instanceof Error ? error.message : 'Nie udało się odczytać pliku.') }
    if (importRef.current) importRef.current.value = ''
  }
  function loadDemo() {
    save(seedData()); setFilter('all'); setShowDemo(true); notify('Załadowano przykładowy plan.')
  }
  function resetPlan() {
    if (!window.confirm('Usunąć wszystkie przedmioty, terminy i zadania z tego urządzenia?')) return
    save(emptyData); setFilter('all'); setShowDemo(false); notify('Plan został wyczyszczony.')
  }
  const dateLabel = new Intl.DateTimeFormat('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())

  return <main className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#start" aria-label="Zaliczone — strona główna"><span className="brand-mark"><GraduationCap size={21} /></span><span>Zaliczone<span className="brand-dot">.</span><small>TWÓJ PLAN NA SEMESTR</small></span></a>
      <div className="side-label">PRZESTRZEŃ</div>
      <button className="nav-item active"><BookOpen size={17} /> Mój plan <span className="nav-count">{unfinished}</span></button>
      <div className="side-label subject-label">PRZEDMIOTY <button className="icon-button small" aria-label="Dodaj przedmiot" onClick={() => setModal('subject')}><Plus size={15} /></button></div>
      <div className="subject-list">
        {data.subjects.map((subject) => <div className="subject-row" key={subject.id}><button className={'subject-filter ' + (filter === subject.id ? 'selected' : '')} onClick={() => setFilter(filter === subject.id ? 'all' : subject.id)}><i style={{ background: subject.color }} />{subject.name}</button><button className="delete-subject" title="Usuń przedmiot" aria-label={'Usuń przedmiot ' + subject.name} onClick={() => deleteSubject(subject.id)}><Trash2 size={13} /></button></div>)}
        {data.subjects.length === 0 && <p className="empty-sidebar">Dodaj pierwszy przedmiot, aby zacząć planować.</p>}
      </div>
      <div className="sidebar-bottom"><div className="focus-card"><span className="focus-icon"><Sparkles size={16} /></span><strong>Małe kroki, duży spokój.</strong><p>Rozbij naukę na zadania i skup się na tym, co przed Tobą.</p><button onClick={() => openEntry('task')}>Dodaj zadanie <ArrowRight size={14} /></button></div><button className="nav-item subtle" onClick={() => setModal('help')}><CircleHelp size={17} /> Jak to działa?</button></div>
    </aside>

    <section className="main-content" id="start">
      <header className="topbar"><span className="breadcrumb">Mój semestr <span>/</span> <b>Plan nauki</b></span><div className="top-actions"><button className="text-button" onClick={() => setModal('help')}><CircleHelp size={16} /> Pomoc</button><span className="avatar" title="Twój osobisty plan">S</span></div></header>
      <div className="page-content">
        <section className="welcome"><div><p className="eyebrow">{dateLabel}</p><h1>Nie wszystko<br/><span>naraz.</span></h1><p className="welcome-copy">Zbierz terminy i małe kroki w jednym miejscu.<br/>Reszta może poczekać.</p></div><div className="welcome-art" aria-hidden="true"><svg viewBox="0 0 250 180" role="presentation"><path d="M34 37c27-11 53-8 78 9v104c-25-18-51-21-78-9z"/><path d="M112 46c25-17 52-20 80-9v104c-28-12-55-9-80 9z"/><path d="M112 47v104M48 60c15-4 30-2 43 4m-43 9c15-4 30-2 43 4m-43 9c15-4 30-2 43 4m49-22c14-6 30-7 46-3m-46 13c14-6 30-7 46-3m-46 13c14-6 30-7 46-3"/><path className="ink-mark" d="m175 28 5 8 10-13"/><path className="ink-mark" d="m41 25 5 4 7-8"/><path className="book-line" d="M25 150c26-12 55-8 87 10 31-18 62-22 91-10"/><path className="book-line" d="m197 55 15-3m-8 12 14 5"/></svg><span className="art-note">zaczynamy od jednego</span></div></section>
        <section className="summary-grid" aria-label="Podsumowanie planu">
          <article className="summary-card exam-summary"><div className="summary-top"><span className="summary-icon peach"><CalendarDays size={17}/></span><span className="card-kicker">NAJBLIŻSZE ZALICZENIE</span></div>{upcoming ? <><strong className="summary-number">{formatDate(upcoming.date)}</strong><span className="summary-foot"><i style={{background: subjects.get(upcoming.subjectId)?.color}}/>{subjects.get(upcoming.subjectId)?.name} · {upcoming.type}</span></> : <><strong className="summary-number">Brak terminów</strong><span className="summary-foot">Dodaj pierwsze zaliczenie</span></>}</article>
          <article className="summary-card task-summary"><div className="summary-top"><span className="summary-icon green"><CheckCheck size={17}/></span><span className="card-kicker">DO ZROBIENIA</span></div><strong className="summary-number">{unfinished} <small>{unfinished === 1 ? 'zadanie' : 'zadań'}</small></strong><span className="summary-foot">{data.tasks.length ? doneCount + ' z ' + data.tasks.length + ' kroków za Tobą' : 'Dodaj zadanie do nauki'}</span></article>
          <article className="summary-card progress-summary"><div className="summary-top"><span className="summary-icon lilac"><Sparkles size={17}/></span><span className="card-kicker">TWÓJ POSTĘP</span></div><strong className="summary-number">{progress}<small>%</small></strong><div className="progress-track"><span style={{width: progress + '%'}}/></div></article>
        </section>
        <section className="section-heading"><div><p className="eyebrow">NAJBLIŻSZE KROKI</p><h2>Plan nauki</h2></div><div className="heading-actions"><label className="filter-select"><span className="sr-only">Filtruj plan po przedmiocie</span><select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">Wszystkie przedmioty</option>{data.subjects.map((subject) => <option value={subject.id} key={subject.id}>{subject.name}</option>)}</select><ChevronDown size={15}/></label><button className="primary-button" onClick={() => openEntry('task')}><Plus size={16}/> Dodaj zadanie</button></div></section>
        <section className="planner-grid">
          <article className="panel task-panel"><div className="panel-heading"><div><h3>Zadania do nauki</h3><p>Jeden krok na raz, bez presji.</p></div><span className="panel-badge">{tasks.length}</span></div>
            {tasks.length ? <div className="task-list">{tasks.map((task) => <TaskRow key={task.id} task={task} subject={subjects.get(task.subjectId)} onToggle={() => toggleTask(task.id)} />)}</div> : <EmptyState icon={<CheckCheck size={19}/>} title="Tu pojawią się Twoje zadania" text={data.subjects.length ? 'Dodaj mały krok, od którego zaczniesz naukę.' : 'Najpierw dodaj przedmiot, a potem zaplanuj powtórkę.'} action="Dodaj zadanie" onClick={() => setModal(data.subjects.length ? 'task' : 'subject')} />}
            <button className="panel-link" onClick={() => openEntry('task')}>+ Dodaj kolejny krok</button>
          </article>
          <article className="panel dates-panel"><div className="panel-heading"><div><h3>Terminy zaliczeń</h3><p>Wiesz, ile masz jeszcze czasu.</p></div><button className="icon-button" aria-label="Dodaj termin" onClick={() => openEntry('exam')}><Plus size={17}/></button></div>
            {exams.length ? <div className="exam-list">{exams.map((exam) => <ExamRow key={exam.id} exam={exam} subject={subjects.get(exam.subjectId)} />)}</div> : <EmptyState icon={<CalendarDays size={19}/>} title="Kalendarz czeka na terminy" text="Dodaj datę zaliczenia, aby widzieć ją w swoim planie." action="Dodaj termin" onClick={() => setModal(data.subjects.length ? 'exam' : 'subject')} />}
            <button className="panel-link" onClick={() => openEntry('exam')}>+ Dodaj termin</button>
          </article>
        </section>
        <section className="subjects-section"><div className="section-heading compact"><div><p className="eyebrow">TWÓJ SEMESTR</p><h2>Przedmioty</h2></div><button className="text-button add-subject" onClick={() => setModal('subject')}><Plus size={16}/> Dodaj przedmiot</button></div>
          {data.subjects.length ? <div className="subject-cards">{data.subjects.map((subject) => {
            const total = data.tasks.filter((task) => task.subjectId === subject.id).length
            const complete = data.tasks.filter((task) => task.subjectId === subject.id && task.done).length
            const examCount = data.exams.filter((exam) => exam.subjectId === subject.id).length
            return <button className="subject-card" key={subject.id} onClick={() => setFilter(filter === subject.id ? 'all' : subject.id)}><span className="subject-color" style={{background: subject.color}}/><span className="subject-card-content"><strong>{subject.name}</strong><small>{examCount} {examCount === 1 ? 'termin' : 'terminów'} · {complete}/{total} zadań</small></span><ArrowRight size={16}/></button>
          })}</div> : <div className="subject-empty"><p>Twój semestr zaczyna się tutaj.</p><button onClick={() => setModal('subject')}><Plus size={15}/> Dodaj pierwszy przedmiot</button></div>}
        </section>
        <footer className="page-footer"><span>Zaliczone<span className="brand-dot">.</span> <span>Twój plan należy do Ciebie.</span></span><div><button onClick={exportData}><ArrowDownToLine size={14}/> Pobierz kopię</button><button onClick={() => importRef.current?.click()}><Upload size={14}/> Przywróć kopię</button><button onClick={loadDemo}><Sparkles size={14}/> Dane przykładowe</button><button onClick={resetPlan}><RotateCcw size={14}/> Wyczyść plan</button></div></footer>
      </div>
    </section>
    <input ref={importRef} type="file" accept="application/json,.json" hidden aria-label="Wybierz kopię planu do importu" onChange={(event) => void importData(event.target.files?.[0])}/>
    {showDemo && <div className="demo-note"><Sparkles size={14}/> Przykładowy plan demonstracyjny <button aria-label="Ukryj informację o przykładzie" onClick={() => setShowDemo(false)}><X size={14}/></button></div>}
    {toast && <div className="toast" role="status">{toast}</div>}
    {modal && <Dialog kind={modal} subjects={data.subjects} onClose={() => setModal(null)} onSubject={addSubject} onExam={addExam} onTask={addTask}/>}
  </main>
}

function TaskRow({ task, subject, onToggle }: { task: StudyTask; subject?: Subject; onToggle: () => void }) {
  const gap = dayGap(task.dueDate)
  return <div className={'task-row ' + (task.done ? 'is-done' : '')}><button className={'check-control ' + (task.done ? 'checked' : '')} aria-label={task.done ? 'Oznacz jako niewykonane: ' + task.title : 'Oznacz jako wykonane: ' + task.title} onClick={onToggle}>{task.done && <Check size={14}/>}</button><div className="task-main"><strong>{task.title}</strong><span><i style={{background: subject?.color}}/>{subject?.name}</span></div><span className={'due-pill ' + (gap < 0 && !task.done ? 'overdue' : '')}>{task.done ? 'Gotowe' : gap === 0 ? 'Dziś' : gap === 1 ? 'Jutro' : gap < 0 ? Math.abs(gap) + ' d po terminie' : formatDate(task.dueDate)}</span></div>
}
function ExamRow({ exam, subject }: { exam: Exam; subject?: Subject }) {
  const gap = dayGap(exam.date)
  return <div className="exam-row"><div className="date-tile"><strong>{new Intl.DateTimeFormat('pl-PL', { day: '2-digit' }).format(new Date(exam.date + 'T12:00:00'))}</strong><span>{new Intl.DateTimeFormat('pl-PL', { month: 'short' }).format(new Date(exam.date + 'T12:00:00')).replace('.', '')}</span></div><div className="exam-main"><strong>{exam.title}</strong><span><i style={{background: subject?.color}}/>{subject?.name} · {exam.type}</span></div><span className="countdown">{gap < 0 ? 'minęło' : gap === 0 ? 'dziś' : 'za ' + gap + ' dni'}</span></div>
}
function EmptyState({ icon, title, text, action, onClick }: { icon: React.ReactNode; title: string; text: string; action: string; onClick: () => void }) {
  return <div className="empty-state"><span>{icon}</span><strong>{title}</strong><p>{text}</p><button onClick={onClick}>{action} <ArrowRight size={14}/></button></div>
}
function Dialog({ kind, subjects, onClose, onSubject, onExam, onTask }: { kind: 'subject' | 'exam' | 'task' | 'help'; subjects: Subject[]; onClose: () => void; onSubject: (name: string) => void; onExam: (subjectId: string, title: string, date: string, type: Exam['type']) => void; onTask: (subjectId: string, title: string, date: string) => void }) {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? '')
  const [date, setDate] = useState(today())
  const [type, setType] = useState<Exam['type']>('Kolokwium')
  const isSubject = kind === 'subject'; const isExam = kind === 'exam'; const isTask = kind === 'task'
  const heading = isSubject ? 'Nowy przedmiot' : isExam ? 'Nowy termin' : isTask ? 'Nowe zadanie' : 'Jak korzystać z planu?'
  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (isSubject) onSubject(name)
    else if (isExam) onExam(subjectId, title, date, type)
    else if (isTask) onTask(subjectId, title, date)
  }
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><header><h2 id="dialog-title">{heading}</h2><button className="icon-button" onClick={onClose} aria-label="Zamknij"><X size={18}/></button></header>
    {kind === 'help' ? <div className="help-copy"><p>Dodaj przedmioty, a pod nimi zaplanuj zaliczenia i małe kroki do nauki. Postęp aktualizuje się po oznaczeniu zadania jako wykonanego.</p><p>Plan zapisuje się w tej przeglądarce. Przyciski na dole strony pozwalają pobrać kopię JSON i przywrócić ją na tym lub innym urządzeniu.</p><p>Dane przykładowe służą do demonstracji — możesz je wyczyścić i zacząć własny plan.</p><button className="primary-button full" onClick={onClose}>Rozumiem</button></div> : <form onSubmit={submit}>
      {isSubject ? <label>Nazwa przedmiotu<input autoFocus required maxLength={60} placeholder="np. Programowanie obiektowe" value={name} onChange={(event) => setName(event.target.value)}/></label> : <><label>{isExam ? 'Nazwa zaliczenia' : 'Co chcesz zrobić?'}<input autoFocus required maxLength={100} placeholder={isExam ? 'np. Kolokwium z algebry' : 'np. Powtórzyć rozdział 3'} value={title} onChange={(event) => setTitle(event.target.value)}/></label><label>Przedmiot<select required value={subjectId} onChange={(event) => setSubjectId(event.target.value)}>{subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}</select></label><label>{isExam ? 'Data zaliczenia' : 'Termin zadania'}<input required type="date" value={date} onChange={(event) => setDate(event.target.value)}/></label>{isExam && <label>Rodzaj<select value={type} onChange={(event) => setType(event.target.value as Exam['type'])}><option>Kolokwium</option><option>Egzamin</option><option>Projekt</option></select></label>}</>}
      <div className="dialog-actions"><button type="button" className="secondary-button" onClick={onClose}>Anuluj</button><button className="primary-button" type="submit"><Plus size={15}/> {isSubject ? 'Dodaj przedmiot' : isExam ? 'Zapisz termin' : 'Dodaj zadanie'}</button></div>
    </form>}
  </section></div>
}

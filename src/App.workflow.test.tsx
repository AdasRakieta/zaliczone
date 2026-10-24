import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'
import { storageKey, type PlannerData } from './types'

const plan: PlannerData = {
  version: 1,
  subjects: [{ id: 's1', name: 'Fizyka', color: '#6d8f68' }],
  tasks: [{ id: 't1', subjectId: 's1', title: 'Optyka', dueDate: '2026-11-01', done: false }],
  exams: [{ id: 'e1', subjectId: 's1', title: 'Zaliczenie', date: '2026-11-02', type: 'Egzamin' }],
}

afterEach(() => localStorage.clear())

function start() {
  localStorage.setItem(storageKey, JSON.stringify(plan))
  return render(<App />)
}

function upload(value: unknown) {
  const file = new File([JSON.stringify(value)], 'kopia.json', { type: 'application/json' })
  Object.defineProperty(file, 'text', { value: async () => JSON.stringify(value) })
  fireEvent.change(screen.getByLabelText('Wybierz kopię planu do importu'), { target: { files: [file] } })
}

describe('bezpieczne zmiany planu i własne okna', () => {
  it('przywraca plan po ponownym otwarciu i omija minione daty w podsumowaniu', () => {
    const seeded = { ...plan, exams: [
      { ...plan.exams[0], id: 'future', title: 'Przyszły egzamin', date: '2099-12-03' },
      { ...plan.exams[0], id: 'past', title: 'Archiwalny egzamin', date: '2000-01-01' },
    ] }
    localStorage.setItem(storageKey, JSON.stringify(seeded))
    const first = render(<App />)
    expect(first.container.querySelector('.exam-summary .summary-number')).toHaveTextContent('3 grudnia')
    expect(Array.from(first.container.querySelectorAll('.exam-main > strong')).map((element) => element.textContent)).toEqual(['Archiwalny egzamin', 'Przyszły egzamin'])
    fireEvent.click(screen.getByRole('button', { name: 'Oznacz jako wykonane: Optyka' }))
    first.unmount()
    render(<App />)
    expect(screen.getByRole('button', { name: 'Oznacz jako niewykonane: Optyka' })).toBeInTheDocument()
  })

  it('zatrzymuje fokus w oknie, zamyka Escape i oddaje fokus przyciskowi', async () => {
    const user = userEvent.setup()
    start()
    const trigger = screen.getByRole('button', { name: 'Usuń przedmiot Fizyka' })
    await user.click(trigger)
    const dialog = screen.getByRole('dialog', { name: 'Usunąć przedmiot?' })
    const cancel = within(dialog).getByRole('button', { name: 'Anuluj' })
    expect(cancel).toHaveFocus()
    await user.tab()
    expect(within(dialog).getByRole('button', { name: 'Usuń przedmiot' })).toHaveFocus()
    await user.tab()
    expect(within(dialog).getByRole('button', { name: 'Zamknij' })).toHaveFocus()
    await user.tab({ shift: true })
    expect(within(dialog).getByRole('button', { name: 'Usuń przedmiot' })).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(JSON.parse(localStorage.getItem(storageKey)!)).toEqual(plan)
    const add = within(screen.getByRole('complementary')).getByRole('button', { name: 'Dodaj przedmiot', exact: true })
    await user.click(add)
    expect(screen.getByLabelText('Nazwa przedmiotu')).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(add).toHaveFocus()
  })

  it('usuwa przedmiot i powiązane wpisy dopiero po potwierdzeniu', async () => {
    const user = userEvent.setup()
    start()
    await user.click(screen.getByRole('button', { name: 'Usuń przedmiot Fizyka' }))
    await user.click(screen.getByRole('button', { name: 'Anuluj' }))
    expect(screen.getByText('Optyka')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Usuń przedmiot Fizyka' }))
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Usuń przedmiot' }))
    expect(JSON.parse(localStorage.getItem(storageKey)!)).toEqual({ version: 1, subjects: [], tasks: [], exams: [] })
    expect(screen.queryByText('Optyka')).not.toBeInTheDocument()
  })

  it('odrzuca niemożliwą datę i odtwarza poprawny plan dopiero po potwierdzeniu', async () => {
    const user = userEvent.setup()
    start()
    upload({ ...plan, exams: [{ ...plan.exams[0], date: '2026-02-31' }] })
    expect(await screen.findByText('Termin lub zadanie zawiera niepoprawne dane.')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(storageKey)!)).toEqual(plan)
    const restored = { ...plan, tasks: [{ ...plan.tasks[0], title: 'Nowa powtórka' }] }
    upload(restored)
    await screen.findByRole('dialog', { name: 'Przywrócić kopię?' })
    expect(JSON.parse(localStorage.getItem(storageKey)!)).toEqual(plan)
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Przywróć kopię' }))
    expect(screen.getByText('Nowa powtórka')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(storageKey)!)).toEqual(restored)
  })

  it('pozwala anulować wczytanie demo i wyczyszczenie własnego planu', async () => {
    const user = userEvent.setup()
    start()
    for (const action of ['Dane przykładowe', 'Wyczyść plan']) {
      await user.click(screen.getByRole('button', { name: action }))
      await user.click(screen.getByRole('button', { name: 'Anuluj' }))
      expect(JSON.parse(localStorage.getItem(storageKey)!)).toEqual(plan)
    }
    await user.click(screen.getByRole('button', { name: 'Wyczyść plan' }))
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Wyczyść plan' }))
    expect(screen.getByText('Twój semestr zaczyna się tutaj.')).toBeInTheDocument()
  })
})

import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'
import { storageKey } from './types'

afterEach(() => localStorage.clear())

describe('plan nauki', () => {
  it('pozwala dodać przedmiot, zadanie, zaliczenie i zapamiętuje plan', () => {
    const { container } = render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /dodaj pierwszy przedmiot/i }))
    fireEvent.change(screen.getByLabelText('Nazwa przedmiotu'), { target: { value: 'Algorytmy' } })
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Dodaj przedmiot' }))
    const addTaskButton = document.querySelector('.heading-actions')!
    fireEvent.click(within(addTaskButton as HTMLElement).getByRole('button', { name: /Dodaj zadanie/i }))
    fireEvent.change(screen.getByLabelText('Co chcesz zrobić?'), { target: { value: 'Powtórzyć sortowanie' } })
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Dodaj zadanie' }))
    expect(screen.getByText('Powtórzyć sortowanie')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(storageKey) ?? '{}').tasks).toHaveLength(1)
    fireEvent.click(container.querySelector('.dates-panel .panel-heading button')!)
    fireEvent.change(screen.getByLabelText('Nazwa zaliczenia'), { target: { value: 'Kolokwium A' } })
    fireEvent.change(screen.getByLabelText('Data zaliczenia'), { target: { value: '2026-11-01' } })
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Zapisz termin' }))
    expect(screen.getByText('Kolokwium A')).toBeInTheDocument()
  })
  it('zmienia postęp po oznaczeniu zadania i filtruje po przedmiocie', () => {
    localStorage.setItem(storageKey, JSON.stringify({
      version: 1,
      subjects: [{ id: 's1', name: 'Fizyka', color: '#abc' }, { id: 's2', name: 'Historia', color: '#def' }],
      exams: [],
      tasks: [
        { id: 't1', subjectId: 's1', title: 'Optyka', dueDate: '2026-11-01', done: false },
        { id: 't2', subjectId: 's2', title: 'Daty', dueDate: '2026-11-01', done: false },
      ],
    }))
    const { container } = render(<App />)
    expect(container.querySelector('.progress-summary .summary-number')).toHaveTextContent('0%')
    fireEvent.click(screen.getByRole('button', { name: 'Oznacz jako wykonane: Optyka' }))
    expect(container.querySelector('.progress-summary .summary-number')).toHaveTextContent('50%')
    fireEvent.change(container.querySelector('.filter-select select')!, { target: { value: 's1' } })
    expect(screen.getByText('Optyka')).toBeInTheDocument()
    expect(screen.queryByText('Daty')).not.toBeInTheDocument()
  })
})

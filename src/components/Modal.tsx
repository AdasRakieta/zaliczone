import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from './Icons'

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const titleId = useId()
  const panel = useRef<HTMLElement>(null)
  const close = useRef(onClose)
  close.current = onClose

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const background = Array.from(panel.current?.closest('.app-shell')?.children ?? [])
      .filter((element) => !element.contains(panel.current))
    const inertStates = background.map((element) => element.hasAttribute('inert'))
    background.forEach((element) => element.setAttribute('inert', ''))
    const focusable = () => Array.from(panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), a[href], [tabindex="0"]') ?? [])
    const initial = panel.current?.querySelector<HTMLElement>('[data-initial-focus], input')
    ;(initial ?? focusable()[0] ?? panel.current)?.focus()
    function keydown(event: KeyboardEvent) {
      if (event.key === 'Escape') { event.preventDefault(); close.current(); return }
      if (event.key !== 'Tab') return
      const controls = focusable()
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (!first) { event.preventDefault(); panel.current?.focus(); return }
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        event.preventDefault(); last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus()
      }
    }
    document.addEventListener('keydown', keydown)
    return () => {
      document.removeEventListener('keydown', keydown)
      document.body.style.overflow = bodyOverflow
      background.forEach((element, index) => { if (!inertStates[index]) element.removeAttribute('inert') })
      if (previous?.isConnected) previous.focus()
    }
  }, [])

  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section ref={panel} className="dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
      <header><h2 id={titleId}>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Zamknij"><X size={18} /></button></header>
      {children}
    </section>
  </div>
}

export type Confirmation = { title: string; message: string; action: string; onConfirm: () => void }

export function ConfirmDialog({ confirmation, onClose }: { confirmation: Confirmation; onClose: () => void }) {
  return <Modal title={confirmation.title} onClose={onClose}>
    <p className="confirm-copy">{confirmation.message}</p>
    <div className="dialog-actions">
      <button className="secondary-button" data-initial-focus onClick={onClose}>Anuluj</button>
      <button className="primary-button danger-button" onClick={() => { confirmation.onConfirm(); onClose() }}>{confirmation.action}</button>
    </div>
  </Modal>
}

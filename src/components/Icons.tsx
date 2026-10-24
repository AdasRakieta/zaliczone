import type { SVGProps } from 'react'

type IconName = 'ArrowDownToLine' | 'ArrowRight' | 'BookOpen' | 'CalendarDays' | 'Check' | 'CheckCheck' | 'ChevronDown' | 'CircleHelp' | 'GraduationCap' | 'Plus' | 'RotateCcw' | 'Sparkles' | 'Trash2' | 'Upload' | 'X'
type IconProps = Omit<SVGProps<SVGSVGElement>, 'name'> & { size?: number }

const drawings: Record<IconName, React.ReactNode> = {
  ArrowDownToLine: <><path d="M12 3v11m0 0 4-4m-4 4-4-4"/><path d="M5 16v4h14v-4"/></>,
  ArrowRight: <><path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></>,
  BookOpen: <><path d="M3 5.5c3.5-1.2 6.5-.7 9 1.3 2.5-2 5.5-2.5 9-1.3v13c-3.5-1.2-6.5-.7-9 1.3-2.5-2-5.5-2.5-9-1.3z"/><path d="M12 7v13"/></>,
  CalendarDays: <><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M7 3v4m10-4v4M3 10h18"/><path d="M7 14h2m4 0h2m-8 4h2"/></>,
  Check: <path d="m5 12 4.5 4.5L19 7"/>,
  CheckCheck: <><path d="m3 12 4 4 8-8"/><path d="m10 13 3 3 8-9"/></>,
  ChevronDown: <path d="m6 9 6 6 6-6"/>,
  CircleHelp: <><circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.4 2.4 0 1 1 4.2 1.6c-1.2 1.1-1.9 1.5-1.9 3"/><path d="M12 17.5h.01"/></>,
  GraduationCap: <><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3.5 2.8 8.5 2.8 12 0v-5m4-2v6"/></>,
  Plus: <><path d="M12 5v14M5 12h14"/></>,
  RotateCcw: <><path d="M4 8V4m0 4h4"/><path d="M5.5 7A8 8 0 1 1 4 13"/></>,
  Sparkles: <><path d="m12 3 1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8z"/><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9z"/></>,
  Trash2: <><path d="M4 7h16M9 7V4h6v3m3 0-.8 13H6.8L6 7"/><path d="M10 11v5m4-5v5"/></>,
  Upload: <><path d="M12 15V4m0 0L8 8m4-4 4 4"/><path d="M5 14v6h14v-6"/></>,
  X: <><path d="m6 6 12 12M18 6 6 18"/></>,
}

export function Icon({ size = 18, ...props }: IconProps & { name: IconName }) {
  const { name, ...svgProps } = props
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" {...svgProps}>{drawings[name]}</svg>
}

export const ArrowDownToLine = (props: IconProps) => <Icon name="ArrowDownToLine" {...props}/>
export const ArrowRight = (props: IconProps) => <Icon name="ArrowRight" {...props}/>
export const BookOpen = (props: IconProps) => <Icon name="BookOpen" {...props}/>
export const CalendarDays = (props: IconProps) => <Icon name="CalendarDays" {...props}/>
export const Check = (props: IconProps) => <Icon name="Check" {...props}/>
export const CheckCheck = (props: IconProps) => <Icon name="CheckCheck" {...props}/>
export const ChevronDown = (props: IconProps) => <Icon name="ChevronDown" {...props}/>
export const CircleHelp = (props: IconProps) => <Icon name="CircleHelp" {...props}/>
export const GraduationCap = (props: IconProps) => <Icon name="GraduationCap" {...props}/>
export const Plus = (props: IconProps) => <Icon name="Plus" {...props}/>
export const RotateCcw = (props: IconProps) => <Icon name="RotateCcw" {...props}/>
export const Sparkles = (props: IconProps) => <Icon name="Sparkles" {...props}/>
export const Trash2 = (props: IconProps) => <Icon name="Trash2" {...props}/>
export const Upload = (props: IconProps) => <Icon name="Upload" {...props}/>
export const X = (props: IconProps) => <Icon name="X" {...props}/>

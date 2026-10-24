import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const candidates = [
  process.env.REPORT_PYTHON,
  resolve(root, 'tmp/document-runtime/venv/Scripts/python.exe'),
  resolve(root, '.report-venv/Scripts/python.exe'),
  resolve(root, '.report-venv/bin/python'),
].filter(Boolean)
const python = candidates.find(path => existsSync(path)) ?? (process.platform === 'win32' ? 'python' : 'python3')
const args = [resolve(root, 'scripts/build-report.py')]
if (!process.argv.includes('--docx-only')) args.push('--pdf')
const result = spawnSync(python, args, { cwd: root, stdio: 'inherit', windowsHide: true })
if (result.error) throw new Error('Przygotuj środowisko sprawozdania zgodnie z docs/report/README.md lub ustaw REPORT_PYTHON.', { cause: result.error })
if (result.status !== 0) process.exit(result.status ?? 1)

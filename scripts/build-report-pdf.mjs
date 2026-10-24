import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'
import { marked } from 'marked'

const root = resolve(import.meta.dirname, '..')
const markdownPath = resolve(root, 'docs/REPORT.md')
const outputPath = resolve(root, 'output/pdf/Sprawozdanie-Zaliczone.pdf')
const htmlPath = resolve(root, 'tmp/pdfs/Sprawozdanie-Zaliczone.html')
const profilePath = resolve(root, 'tmp/pdfs/chrome-profile')
const source = await readFile(markdownPath, 'utf8')
const content = marked.parse(source, { gfm: true, breaks: false })
const html = [
  '<!doctype html>',
  '<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">',
  '<title>Sprawozdanie projektu Zaliczone</title>',
  '<style>',
  '@page{size:A4;margin:18mm 17mm 20mm;@bottom-right{content:counter(page);font:9pt Arial;color:#787468}}',
  '*{box-sizing:border-box}body{font:10.5pt/1.55 Arial,Helvetica,sans-serif;color:#33332d;margin:0}',
  'h1,h2,h3{font-family:Georgia,"Times New Roman",serif;font-weight:400;line-height:1.18;break-after:avoid;color:#34382f}',
  'h1{font-size:30pt;letter-spacing:-.6pt;margin:0 0 15pt;padding:0 0 12pt;border-bottom:2pt solid #718064}',
  'h2{font-size:19pt;margin:23pt 0 8pt;padding-bottom:5pt;border-bottom:.6pt solid #d7d1c5}',
  'h3{font-size:14pt;margin:15pt 0 6pt}',
  'p{margin:0 0 8pt}blockquote{margin:0 0 17pt;padding:10pt 12pt;border-left:3pt solid #b7674b;background:#f3efe6;color:#5f5d52;font-size:9.5pt}',
  'table{width:100%;border-collapse:collapse;margin:9pt 0 14pt;font-size:8.7pt;line-height:1.35;break-inside:auto}',
  'thead{display:table-header-group}tr{break-inside:avoid}th{background:#e9e5db;color:#42453c;font-weight:700;text-align:left}',
  'th,td{border:.55pt solid #d8d3c8;padding:6pt 7pt;vertical-align:top}tbody tr:nth-child(even){background:#faf8f3}',
  'ul,ol{padding-left:18pt;margin:4pt 0 10pt}li{margin:0 0 3pt}a{color:#87533f;text-decoration:none}',
  'strong{color:#393a33}code{font:9pt Consolas,monospace;color:#5c604f}hr{border:0;border-top:1px solid #ded9cd;margin:15pt 0}',
  '</style></head><body><article>',
  content,
  '</article></body></html>',
].join('\n')

await mkdir(dirname(htmlPath), { recursive: true })
await mkdir(dirname(outputPath), { recursive: true })
await writeFile(htmlPath, html, 'utf8')

const chrome = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const result = spawnSync(chrome, [
  '--headless', '--no-sandbox', '--disable-gpu', '--no-pdf-header-footer',
  '--user-data-dir=' + profilePath, '--print-to-pdf=' + outputPath, pathToFileURL(htmlPath).href,
], { stdio: 'inherit', windowsHide: true })
if (result.error) throw result.error
if (result.status !== 0) throw new Error('Chrome nie wygenerował sprawozdania PDF.')
console.log('Utworzono ' + outputPath)

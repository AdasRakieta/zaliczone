# Sprawozdanie według wzorca UKW

DOCX i PDF przedstawiają jedno sprawozdanie. Dokument zachowuje oryginalną stronę tytułową, logo, geometrię A4, style Times New Roman, numerowanie i kolejność dziesięciu rozdziałów. Rozwinięto wszystkie punkty szablonu, dodano zrzuty działającej aplikacji i GitHub, diagramy, Gantta, testy, instrukcję oraz scenariusz spotkań czteroosobowego zespołu.

## Pliki

- `template.docx` — niezmieniona kopia przekazanego wzorca.
- `content.py` — treść i plan stron sprawozdania.
- `assets/` — zrzuty, wykresy i dane kadrowania w Wordzie. Zrzuty przedstawiają rzeczywisty stan interfejsu; role są pokazane w widoku Zespół.
- `output/docx/Sprawozdanie-Zaliczone.docx` oraz `output/pdf/Sprawozdanie-Zaliczone.pdf` — wynik składu, ścieżki względem głównego katalogu repozytorium.
- `../REPORT.md` — tekst tej samej treści, do przeglądania w repozytorium.

Notatki sprintów, głosowania i feedback 360° są symulacją przygotowaną na potrzeby ćwiczenia. Dokument opisuje wszystkie cztery role i nie jest historią autorstwa commitów.

## Odtwarzanie dokumentu

Potrzebne są Python 3.10 lub nowszy oraz LibreOffice. Środowisko dokumentu jest oddzielone od zależności aplikacji:

~~~sh
python -m venv .report-venv
.report-venv/Scripts/python -m pip install -r scripts/report-requirements.txt
npm run report:pdf
~~~

Na Linux i macOS interpreter środowiska znajduje się w `.report-venv/bin/python`. Można wskazać go zmienną `REPORT_PYTHON`. Jeśli LibreOffice nie jest w PATH, ustaw `LIBREOFFICE_PATH` na jego plik wykonywalny `soffice` lub `soffice.exe`.

`npm run report:docx` buduje DOCX i tekst Markdown. `npm run report:pdf` dodatkowo eksportuje ten DOCX do PDF, dzięki czemu obie wersje mają ten sam układ. Skrypt nie generuje osobnego skróconego raportu z Markdown. Przy składzie porównuje zachowane części pakietu i logo z wzorcem. Zrzuty są kadrowane w dokumencie, bez zmiany zawartości obrazów źródłowych.

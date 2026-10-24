# Zaliczone

Planer nauki i zaliczeń dla studentów. Dodawaj przedmioty, terminy i małe zadania do nauki, obserwuj postęp oraz przenoś swój plan za pomocą kopii JSON. Dane pozostają w pamięci przeglądarki; aplikacja nie wymaga konta ani serwera.

**Aplikacja:** https://adasrakieta.github.io/zaliczone/<br>
**Tablica pracy:** https://github.com/users/AdasRakieta/projects/5<br>
**Widok zespołu:** https://github.com/users/AdasRakieta/projects/5/views/2<br>
**Zespół:** Szymon Przybysz, Iwona Figas, Jarek Antczak, Emil Kosicki.

## Uruchomienie

~~~sh
npm ci
npm run dev
~~~

Produkcja i testy:

~~~sh
npm test
npm run build
~~~

Eksport sprawozdania DOCX i PDF (Python i LibreOffice; przygotowanie w [instrukcji składu](docs/report/README.md)):

~~~
npm run report:pdf
~~~

## Funkcje

- Przedmioty z własnymi kolorami, daty egzaminów, kolokwiów i projektów oraz zadania do nauki.
- Filtrowanie wpisów po przedmiocie, oznaczanie zadań i automatyczny wskaźnik postępu.
- Zapis w przeglądarce, eksport planu do JSON i bezpieczny import z walidacją.
- Demonstracyjny zestaw danych i układ dopasowany do telefonu oraz komputera.

## Jak pracujemy

Wybraliśmy Scrum z tablicą Kanban. Dwa symulowane sprinty, backlog, estymaty Planning Poker, zasady WIP i kryteria akceptacji opisano w [planie projektu](docs/PROJECT.md). Pełne [sprawozdanie](docs/REPORT.md) zachowuje dziesięć rozdziałów wzorca UKW. Zawiera ilustracje, diagramy i notatki ze skróconymi wypowiedziami wszystkich czterech osób oraz feedback 360°. Notatki spotkań i oceny są **symulacją dydaktyczną**.

Jedno sprawozdanie w dwóch formatach: [edytowalny DOCX](output/docx/Sprawozdanie-Zaliczone.docx) oraz [PDF do oddania](output/pdf/Sprawozdanie-Zaliczone.pdf).

Każda zmiana powstaje na branchu i przechodzi PR do chronionego `main`. [CONTRIBUTING.md](CONTRIBUTING.md) opisuje reguły GitHub, lokalne hooki i komendy pracy.

## CI i publikacja

Pull Requesty i zmiany w main przechodzą testy oraz kompilację. GitHub Actions publikuje dist/ w GitHub Pages po każdym poprawnym pushu do main. Ustawienia repozytorium Pages muszą wskazywać źródło „GitHub Actions”.

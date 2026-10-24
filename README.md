# Zaliczone

Planer nauki i zaliczeń dla studentów. Dodawaj przedmioty, terminy i małe zadania do nauki, obserwuj postęp oraz przenoś swój plan za pomocą kopii JSON. Dane pozostają w pamięci przeglądarki; aplikacja nie wymaga konta ani serwera.

**Aplikacja:** https://adasrakieta.github.io/zaliczone/  
**Tablica pracy:** https://github.com/users/AdasRakieta/projects/5  
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

## Funkcje

- Przedmioty z własnymi kolorami, daty egzaminów, kolokwiów i projektów oraz zadania do nauki.
- Filtrowanie wpisów po przedmiocie, oznaczanie zadań i automatyczny wskaźnik postępu.
- Zapis w przeglądarce, eksport planu do JSON i bezpieczny import z walidacją.
- Demonstracyjny zestaw danych i układ dopasowany do telefonu oraz komputera.

## Jak pracujemy

Wybraliśmy Scrum z tablicą Kanban. Dwa symulowane sprinty, backlog, estymaty Planning Poker, zasady WIP, kryteria akceptacji, raporty i retrospektywy opisano w [planie projektu](docs/PROJECT.md). Dokumentację zaliczeniową w dziesięciu rozdziałach zawiera [sprawozdanie](docs/REPORT.md). Materiały sprintów są wyraźnie oznaczone jako **symulacja dydaktyczna** i nie przypisują członkom zespołu fikcyjnych wypowiedzi.

## CI i publikacja

Pull Requesty i zmiany w main przechodzą testy oraz kompilację. GitHub Actions publikuje dist/ w GitHub Pages po każdym poprawnym pushu do main. Ustawienia repozytorium Pages muszą wskazywać źródło „GitHub Actions”.

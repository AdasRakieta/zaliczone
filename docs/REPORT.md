# Sprawozdanie projektu — Zaliczone

> Materiał dydaktyczny projektu realizowanego na zajęcia „Zwinne metodyki zarządzania projektami”. Opisy spotkań i wyników sprintów w PROJECT.md są symulacją, a nie potwierdzeniem faktycznych wydarzeń. Wyniki testów i wdrożenia należy odczytywać z historii Actions i uzupełnić po rzeczywistej weryfikacji.

**Zespół:** Szymon Przybysz, Iwona Figas, Jarek Antczak, Emil Kosicki  
**Temat:** aplikacja do nauki i planowania zaliczeń  
**Repozytorium:** https://github.com/AdasRakieta/zaliczone  
**Aplikacja:** https://adasrakieta.github.io/zaliczone/

## 1. Wprowadzenie

### Cel projektu

Zaliczone pomaga studentowi uporządkować przedmioty, terminy zaliczeń i zadania przygotowawcze. Wskaźnik postępu pokazuje wykonane kroki. Celem użytkowym jest ograniczenie chaosu informacyjnego podczas semestru.

### Zakres

MVP obejmuje dodawanie i usuwanie przedmiotów, terminy egzaminów/kolokwiów/projektów, zadania, filtr przedmiotu, postęp, lokalny zapis i kopię JSON. Konta, synchronizacja, współpraca i przypomnienia pozostają poza pierwszym wydaniem.

### Metodyka

Zespół wybrał Scrum uzupełniony tablicą Kanban. Dwie krótkie iteracje porządkują pracę nad przyrostem i dają miejsce na przegląd oraz zmianę sposobu pracy. Tablica pokazuje przepływ i limity WIP. Dla czterech osób i małego MVP ceremonie Scrum pozostają lekkie. W kompromisie zakres–czas–koszt chronimy podstawowy zakres i termin zajęć; dodatkowe integracje są odłożone.

## 2. Organizacja zespołu projektowego

| Osoba | Rola | Odpowiedzialność |
|---|---|---|
| Szymon Przybysz | Koordynacja techniczna i deweloper | Architektura, CI, repozytorium, Pages |
| Iwona Figas | Product Owner i UX | Cel, priorytety, kryteria produktu, instrukcja |
| Jarek Antczak | Scrum Master i deweloper | Tablica, blokady, iteracje, funkcje planu |
| Emil Kosicki | Tester i deweloper | Scenariusze, regresja, checklisty jakości |

Role są podziałem planowanym w dokumentacji. Rzeczywiste konto GitHub i udział w PR należy uzupełnić po uzyskaniu loginów pozostałych osób.

### Plan komunikacji

Plan przewiduje krótkie codzienne aktualizacje, planowanie na początku sprintu, przegląd działającego przyrostu i retrospektywę 4Ls na końcu. Zapisane poniżej notatki są symulacyjne. W rzeczywistym projekcie należy dopisać datę i potwierdzić ustalenia przez zespół.

## 3. Planowanie i szacowanie pracy

Backlog i właściciele znajdują się w PROJECT.md. User Story ma wzór: „Jako [rola] chcę [funkcja], aby [korzyść]”. Oszacowania 1, 2, 3, 5 i 8 SP są proponowaną symulacją Planning Poker; nie są wynikiem przeprowadzonego głosowania. Kryteria akceptacji są zapisywane w Issue.

### Iteracje

Sprint 1 (26.10–01.11.2026): rdzeń modelu, przedmioty, zadania, terminy, filtrowanie, postęp i lokalny zapis. Cel: zaplanować najbliższe kroki dla przedmiotu. Raport i retro mają status symulacyjny.

Sprint 2 (02.11–08.11.2026): kopia danych, demonstracja, responsywność, testy, instrukcja i Pages. Cel: zamknąć przepływ użytkownika i przygotować prezentację. Raport i retro mają status symulacyjny.

### Backlog produktu i estymacja

Wartości SP to propozycja Planning Poker przygotowana do wspólnego potwierdzenia przez zespół; nie są protokołem przeprowadzonego głosowania. Szczegółowe kryteria akceptacji są w zadaniach GitHub #1–16.

| ID | User Story | Priorytet | SP | Sprint |
|---|---|---:|---:|---:|
| US-01 | Jako student chcę dodać przedmiot, aby uporządkować semestr. | P0 | 3 | 1 |
| US-02 | Jako student chcę zapisać termin zaliczenia, aby zaplanować naukę. | P0 | 5 | 1 |
| US-03 | Jako student chcę dodać zadania przygotowawcze, aby rozbić naukę na kroki. | P0 | 5 | 1 |
| US-04 | Jako student chcę oznaczać zadania i widzieć postęp. | P0 | 3 | 1 |
| US-05 | Jako student chcę filtrować plan po przedmiocie. | P1 | 3 | 1 |
| US-06 | Jako student chcę zachować plan po odświeżeniu strony. | P0 | 5 | 1 |
| US-07 | Jako student chcę pobrać kopię JSON. | P1 | 3 | 2 |
| US-08 | Jako student chcę odtworzyć plan z poprawnej kopii. | P1 | 5 | 2 |
| US-09 | Jako student chcę widzieć nadchodzące terminy i liczbę dni. | P0 | 3 | 1 |
| US-10 | Jako nowy użytkownik chcę załadować przykład. | P1 | 3 | 2 |
| US-11 | Jako student chcę wygodnie używać planera na telefonie. | P0 | 5 | 2 |
| US-12 | Jako student chcę instrukcji, która wyjaśnia obsługę i kopię danych. | P1 | 3 | 2 |

### Gantt

| Praca / kamień milowy | 26–28 X | 29 X–1 XI | 2–4 XI | 5–8 XI |
|---|:---:|:---:|:---:|:---:|
| Model danych, repozytorium i CI | █ |  |  |  |
| Przedmioty, zadania, terminy, filtr | █ | █ |  |  |
| **M1 — przegląd Sprintu 1** |  | ◆ |  |  |
| Eksport/import, demo, instrukcja |  |  | █ |  |
| Responsywność, jakość i dostępność |  |  | █ | █ |
| **M2 — wdrożenie Pages i przegląd** |  |  |  | ◆ |
| Retrospektywy i sprawozdanie |  | ◆ |  | ◆ |

## 4. Dokumentacja techniczna

Frontend jest zbudowany w React, TypeScript i Vite; dane nie opuszczają przeglądarki. Model PlannerData składa się z Subject, Exam i StudyTask; rekordy zaliczenia i zadania odwołują się do przedmiotu przez subjectId. Walidator importu sprawdza wersję, pola, unikalność identyfikatorów i istnienie powiązanego przedmiotu. GitHub Actions testuje i publikuje katalog dist/.

~~~text
Student → formularz React → walidowany model PlannerData → localStorage
                                             ↕
                                 kopia JSON / walidacja importu
GitHub Actions: testy + build → GitHub Pages: statyczny frontend
~~~

Przepływ fizyczny obejmuje statyczne pliki serwowane z GitHub Pages oraz pamięć localStorage konkretnej przeglądarki. Brak API serwera ogranicza koszty i ekspozycję danych, a jednocześnie oznacza brak automatycznej synchronizacji.

## 5. Implementacja

Funkcje MVP odpowiadają User Stories w backlogu i zgłoszeniom w repozytorium. Sprint 1 zawiera plan, model, terminy, zadania i postęp; Sprint 2 zawiera kopię, demo, widoki mobilne i dokumentację. Opis iteracji w projekcie jest symulacją dydaktyczną. Problemy do rozpatrzenia w tej architekturze to utrata lokalnego magazynu i błędny plik importu; obsługę stanowią eksport oraz walidacja przed zapisem.

**Środowisko:** Node.js 22, npm, TypeScript, Vite, React, Vitest, Testing Library, GitHub Actions i GitHub Pages.

### Stan przyrostu

Poniższy stan opisuje rzeczywisty przyrost; nie jest przypisaniem historycznego wkładu do osoby. Technicznie zweryfikowane zadania mają dowody w Issues i PR. Odbiór zespołu oraz rzeczywisty feedback pozostają odrębnym zadaniem. Szczegółowe wyniki znajdują się w ACCEPTANCE.md.

| Przyrost | Stan implementacji | Właściciel do odbioru |
|---|---|---|
| Przedmioty, formularze i filtr | W kodzie; przegląd zespołu do wykonania | Iwona Figas |
| Terminy, zadania i postęp | W kodzie; przegląd zespołu do wykonania | Jarek Antczak |
| Zapis i kopia JSON | Odtwarzanie i ochrona istniejącego planu sprawdzone automatycznie | Szymon Przybysz |
| Scenariusze jakości i checklisty | Testy i przegląd 360 px wykonane; opinie zespołu otwarte | Emil Kosicki |
| CI, Pages i dokumentacja | Redesign wdrożony przez PR #17; wyniki w Actions | Szymon Przybysz |

## 6. Testowanie i jakość

Testy jednostkowe i interfejsu opisano w TEST_PLAN.md. W lokalnym uruchomieniu po poprawkach #18 zestaw zakończył się wynikiem **11/11 testów w czterech plikach**; kompilacja produkcyjna przeszła. Poprzedni audyt npm nie wykazał podatności. Nie dodano nowych zależności.

| ID | Scenariusz | Oczekiwany rezultat | Wynik |
|---|---|---|---|
| T-01 | Dodać przedmiot | Pojawia się w planie i filtrze | Automatyczny test przechodzi |
| T-02 | Dodać zadanie i odświeżyć | Zadanie jest widoczne i zapisane | Automatyczny test przechodzi |
| T-03 | Dodać termin zaliczenia | Wpis jest widoczny i ma datę | Automatyczny test przechodzi |
| T-04 | Oznaczyć zadanie jako wykonane | Status i postęp zmieniają się | Automatyczny test przechodzi |
| T-05 | Filtrować plan po przedmiocie | Widać wpisy wybranego przedmiotu | Automatyczny test przechodzi |
| T-06 | Odtworzyć poprawną kopię | Plan zmienia się po potwierdzeniu | Test interfejsu przechodzi; drugi fizyczny sprzęt do odbioru zespołu |
| T-07 | Zaimportować uszkodzoną kopię | Dotychczasowy plan pozostaje | Test walidatora i interfejsu przechodzi |
| T-08 | Użyć klawiatury i widoku 360 px | Akcje dostępne, treść bez ucięcia | Tab/Escape/fokus sprawdzone; widok obejrzany w Chrome |
| T-09 | Anulować usunięcie, następnie potwierdzić | Dane zmieniają się tylko po potwierdzeniu | Test interfejsu przechodzi |
| T-10 | Liczyć dni przez zmianę czasu | 24–26 X to 2 dni | Test regresji przechodzi; Chrome pokazuje 2 dni |

Workflowy redesignu po PR #17 zakończyły się sukcesem: CI 40088853147 i Pages 40088853150. Kolejne poprawki są weryfikowane w osobnym PR; aktualny stan publikacji jest widoczny w historii Actions. Rzeczywiste błędy odbioru i regresje opisuje Issue #18.

## 7. Zarządzanie ryzykiem

### SWOT

| Mocne strony | Słabe strony |
|---|---|
| Mały zakres, brak serwera, czytelny plan i działa po otwarciu offline. | Dane są związane z przeglądarką; brak kont i współdzielenia. |
| Szanse | Zagrożenia |
| Dodanie tygodniowego planu, przypomnień lub integracji kalendarza. | Utrata lokalnych danych, niedostępność hostingu lub brak udziału zespołu. |

### Rejestr ryzyk

| Ryzyko | Prawdopodobieństwo / wpływ | Działanie |
|---|---|---|
| Wyczyszczenie pamięci przeglądarki | Średnie / wysoki | Regularny eksport kopii JSON i instrukcja odzyskiwania |
| Niepoprawny import JSON | Średnie / średni | Walidacja całego pliku przed zapisem; test błędnych relacji |
| Błąd konfiguracji Pages | Średnie / wysoki | Build CI i odbiór działającej ścieżki /zaliczone/ |
| Utrata zewnętrznego fontu/CDN | Niskie / niski | Interfejs korzysta z fontów systemowych, bez zależności CDN |
| Rozrost zakresu ponad czas ćwiczeń | Średnie / wysoki | Chronić MVP; odkładać konta i synchronizację |

## 8. Dokumentacja użytkowa

Użytkownik dodaje przedmiot, przypisuje do niego terminy i zadania, oznacza kroki i eksportuje kopię. Aplikacja działa bez konta i zapisuje dane w bieżącej przeglądarce.

1. Wybierz „Dodaj przedmiot” i wpisz nazwę.
2. Wybierz „Dodaj termin”, wpisz datę i rodzaj zaliczenia.
3. Dodaj krótkie zadania przygotowawcze do przedmiotu.
4. Zaznacz wykonane kroki; wskaźnik postępu aktualizuje się automatycznie.
5. „Pobierz kopię” pozwala przenieść plan; po imporcie błędnego pliku dotychczasowe dane zostają.

**FAQ:** Plan nie synchronizuje się automatycznie; zaimportuj JSON na drugim urządzeniu. Konto nie jest wymagane. Dostępne rodzaje zaliczeń to egzamin, kolokwium i projekt.

## 9. Retrospektywa projektu

**Symulacja Sprintu 1 — 4Ls:** spodobała się prosta lista; zespół nauczył się, że filtr powinien obejmować zadania i terminy; brakowało objaśnienia lokalnego zapisu; chciano mierzalnych kryteriów. Działanie: dodać opis przechowywania i kopii oraz checklisty.

**Symulacja Sprintu 2 — 4Ls:** doceniono walidację; działanie z poprzedniej retrospektywy — opis lokalnego zapisu — zostało ujęte w instrukcji; synchronizacja nadal nie jest częścią MVP; do rozważenia jest kalendarz po zebraniu wymagań.

Feedback 360° zawiera pola do wypełnienia przez członków i interesariuszy. Nie wstawiono fikcyjnych ocen ani wypowiedzi. Faktyczne opinie należy zebrać i dopisać po spotkaniu.

## 10. Wnioski i rekomendacje

MVP spełnia cel użytkowy: ma przedmioty, terminy, zadania, wskaźnik postępu i lokalny zapis. Odbiór techniczny objął kopię JSON, klawiaturę i mobilny widok 360 px. Do końca zaliczenia zespół powinien przyjąć zaproszenia, wykonać własny przegląd na swoich urządzeniach i uzupełnić rzeczywisty feedback 360°. Dalszy rozwój może objąć tygodniowy plan, przypomnienia i synchronizację po decyzji o logowaniu i ochronie danych. Zalecenia: prowadzić każde zadanie przez Issue i PR, ograniczać WIP, dokumentować blokady, a retrospektywę kończyć konkretną zmianą procesu.

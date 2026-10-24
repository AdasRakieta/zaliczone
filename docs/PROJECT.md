# Plan projektu i zasady pracy

## Cel i zakres

**Cel:** dać studentowi jedno proste miejsce do zapisania terminów zaliczeń, zadań przygotowawczych i postępu nauki.

**MVP:** przedmioty, egzaminy/kolokwia/projekty, zadania, filtrowanie, wskaźnik postępu i kopia danych JSON. Poza zakresem są konta, synchronizacja chmurowa, powiadomienia, współdzielenie planu i integracje z uczelnią.

## Metodyka i kompromisy

Scrum z tablicą Kanban. Dwa tygodniowe sprinty symulacyjne dają widoczny przyrost na końcu każdej iteracji. Scrum zapewnia cel sprintu, przegląd i retrospektywę; tablica Kanban pokazuje przepływ oraz blokady. Zespół ma cztery osoby i mały, demonstracyjny zakres, więc nie dodajemy formalnych ról ponad potrzebę. Priorytetem jest działający produkt i wiarygodny materiał zaliczeniowy w ograniczonym czasie; logowanie i synchronizacja pozostają poza MVP.

## Zespół

| Osoba | Rola i odpowiedzialność |
|---|---|
| Szymon Przybysz | Koordynacja techniczna, architektura, CI, repozytorium i wdrożenia |
| Iwona Figas | Product Owner, wymagania, priorytety, UX i dokumentacja użytkowa |
| Jarek Antczak | Scrum Master, organizacja pracy, funkcje planu, raporty i Gantt |
| Emil Kosicki | Jakość, scenariusze testowe, bug tracking, odbiór i checklista |

Każdy pomaga w implementacji i przegląda Pull Requesty. Rozdział ról jest propozycją dydaktyczną; nie jest potwierdzeniem, że odbyły się spotkania.

## Komunikacja i przepływ

Aktualizacja Daily: co udało się zrobić, co jest następne i co blokuje. Planowanie ustala cel, zakres i szacunek. Przegląd pokazuje działający przyrost. Retrospektywa używa 4Ls (Liked, Learned, Lacked, Longed for) i kończy się konkretnym działaniem.

Widok Board w GitHub Projects używa wbudowanych statusów **Todo → In Progress → Done**. Dodatkowe pole „Etap pracy” precyzuje przepływ: **Backlog → Ready → In Progress → Review/Test → Done**. WIP: najwyżej 4 zadania w In Progress i 2 w Review/Test. Nowa praca trafia do Ready po dopisaniu kryteriów odbioru, priorytetu, właściciela, sprintu i szacunku.

**Ready:** jasny opis, kryteria akceptacji, wartość/prioritet, rozmiar i brak nierozwiązanej zależności. **Done:** kryteria spełnione, testy adekwatne do zmiany, PR przejrzany, CI zielone i dokumentacja uaktualniona.

## Backlog produktu

Estymaty w punktach Planning Poker są **proponowanymi wartościami symulacji**, nie zapisem głosowania zespołu. P0 jest potrzebne dla MVP.

| ID | User Story / rezultat | Priorytet | SP | Właściciel | Sprint |
|---|---|---:|---:|---|---:|
| US-01 | Jako student chcę dodać przedmiot, aby uporządkować swój semestr. | P0 | 3 | Iwona | 1 |
| US-02 | Jako student chcę zapisać termin zaliczenia, aby wcześniej zaplanować naukę. | P0 | 5 | Jarek | 1 |
| US-03 | Jako student chcę dodać zadanie do przedmiotu, aby rozbić naukę na małe kroki. | P0 | 5 | Iwona | 1 |
| US-04 | Jako student chcę oznaczać wykonane zadania i widzieć postęp. | P0 | 3 | Emil | 1 |
| US-05 | Jako student chcę filtrować plan według przedmiotu. | P1 | 3 | Jarek | 1 |
| US-06 | Jako student chcę zachować plan po odświeżeniu strony. | P0 | 5 | Szymon | 1 |
| US-07 | Jako student chcę pobrać kopię JSON, aby mieć własną kopię danych. | P1 | 3 | Szymon | 2 |
| US-08 | Jako student chcę odtworzyć plan z poprawnej kopii. | P1 | 5 | Szymon | 2 |
| US-09 | Jako student chcę widzieć nadchodzące terminy i liczbę dni do zaliczenia. | P0 | 3 | Jarek | 1 |
| US-10 | Jako nowy użytkownik chcę załadować przykład, aby poznać możliwości aplikacji. | P1 | 3 | Iwona | 2 |
| US-11 | Jako użytkownik telefonu chcę wygodnie pracować na małym ekranie. | P0 | 5 | Iwona | 2 |
| US-12 | Jako student chcę zrozumieć obsługę aplikacji bez pomocy zespołu. | P1 | 3 | Emil | 2 |

**Kryteria akceptacji wspólne:** wpis jest widoczny po zapisie; walidowane są wymagane pola i relacje do przedmiotu; daty są wyświetlane w polskim formacie; pusty plan ma zrozumiałą ścieżkę dodania danych; import niepoprawnej kopii nie niszczy aktualnego stanu. Kryteria szczegółowe i checklisty znajdują się w Issues.

## Sprinty i raporty

Daty: 26.10–01.11.2026 oraz 02.11–08.11.2026. Poniższe notatki to **scenariusz symulacyjny** dla sprawozdania, nie dowód wykonanych spotkań.

### Sprint 1 — „Plan ma strukturę i najbliższe kroki”

Cel: przedmioty, zadania i terminy można zapisać i szybko sprawdzić. Zakres: US-01–06 oraz US-09. Proponowana suma: 27 SP.

**Symulowany przegląd:** przyrost zawiera formularze przedmiotów, zadań i terminów, filtrowanie, status ukończenia oraz przegląd nadchodzących dat. **Symulowany raport:** rdzeń planu nadaje się do demonstracji; eksport i wygląd mobilny pozostają na kolejny sprint.

**Symulowana retrospektywa 4Ls:** spodobała się prosta lista; nauczyliśmy się, że filtr powinien działać jednocześnie dla terminów i zadań; zabrakło jawnego komunikatu o lokalnym zapisie; chcielibyśmy krótszych, mierzalnych kryteriów. Działanie na Sprint 2: dodać opis prywatności i obsługę kopii; utrzymywać kryteria w checklistach.

### Sprint 2 — „Gotowy planer, kopia i wdrożenie”

Cel: dopracowany przepływ, dostępność, przykład, kopia danych, testy i publikacja. Zakres: US-07, US-08, US-10–12. Proponowana suma: 19 SP.

**Symulowany przegląd:** użytkownik może załadować przykład, pracować w responsywnym układzie, wyeksportować i zaimportować plan; pipeline publikuje aplikację. **Symulowany raport:** produkt i dokumentacja są kompletne względem MVP; testy uruchamia pipeline, a rzeczywisty wynik uruchomienia jest zapisywany osobno.

**Symulowana retrospektywa 4Ls:** cenna była spójna walidacja; zadziałało działanie z Sprintu 1 — wyjaśnienie lokalnego zapisu; brakowało synchronizacji, która jest poza zakresem; następnym krokiem byłby dostępny eksport lub synchronizacja po zebraniu wymagań.

## Harmonogram Gantta

| Praca / kamień milowy | 26–28 X | 29 X–1 XI | 2–4 XI | 5–8 XI |
|---|:---:|:---:|:---:|:---:|
| Model danych, repozytorium i CI | █ |  |  |  |
| Przedmioty, zadania, terminy, filtr | █ | █ |  |  |
| **M1 — przegląd Sprintu 1** |  | ◆ |  |  |
| Eksport/import, demo, instrukcja |  |  | █ |  |
| Responsywność, jakość i dostępność |  |  | █ | █ |
| **M2 — wdrożenie Pages i przegląd** |  |  |  | ◆ |
| Retrospektywy i sprawozdanie |  | ◆ |  | ◆ |

## Technologia i architektura

React, TypeScript i Vite; Vitest i Testing Library. Wszystkie komponenty interfejsu, ikony SVG i ilustracja są własne. Fonty pochodzą z urządzenia, bez CDN. Wspólny komponent Modal obsługuje fokus, Escape oraz potwierdzenia zmiany danych. Statyczny frontend jest kompilowany do katalogu dist/ i serwowany przez GitHub Pages. Dane przepływają z formularzy do walidowanego modelu PlannerData, potem do stanu widoku i localStorage. Eksport serializuje JSON; import waliduje wersję, unikalność ID, daty i relacje przed podmianą danych. Nie ma serwera, kont ani przesyłania danych użytkownika.

~~~mermaid
flowchart LR
  U[Student] --> UI[React: widoki i formularze]
  UI --> M[PlannerData: przedmioty, terminy, zadania]
  M --> L[(localStorage)]
  M --> J[Eksport / walidacja importu JSON]
  CI[GitHub Actions: test + build] --> P[GitHub Pages: dist/]
  UI --> P
~~~

## Ryzyka i SWOT

| Ryzyko | Prawd. | Skutek | Działanie |
|---|---:|---:|---|
| Użytkownik wyczyści dane przeglądarki | Średnie | Wysoki | Widoczny eksport i instrukcja kopii zapasowej |
| Niepoprawny JSON przy imporcie | Średnie | Średni | Walidacja całości przed zapisem i test błędnego pliku |
| Przypadkowe zastąpienie planu przykładem lub kopią | Średnie | Wysoki | Własne okno potwierdzenia i możliwość anulowania przed zapisem |
| Brak logowania innych osób do repo | Średnie | Średni | Zadania przypisane imiennie; zaproszenia po zebraniu loginów |
| Błąd konfiguracji Pages lub ścieżek | Średnie | Wysoki | Build CI i kontrola wdrożonego adresu po publikacji |
| Zakres rośnie ponad czas ćwiczeń | Średnie | Wysoki | Ochrona MVP; synchronizacja i konta po zaliczeniu |

**SWOT:** Mocne — mały zakres, brak serwera, działa offline po otwarciu; słabe — dane wiążą się z przeglądarką, brak współdzielenia; szanse — rozszerzenie o plan tygodnia, przypomnienia i integrację z kalendarzem; zagrożenia — wyczyszczenie pamięci lokalnej, utrata dostępu do hostingu, niepełny udział zespołu. Każde zagrożenie ma powiązane działanie w tabeli ryzyk.

## Feedback 360 stopni i notatki spotkań

Pełne notatki obu sprintów zawiera rozdział dziewiąty [sprawozdania](REPORT.md). Każde planowanie, Daily, przegląd i retrospektywa obejmują skrócone wypowiedzi Szymona, Iwony, Jarka i Emila, dopasowane do ich ról. Tabela feedbacku przedstawia obserwacje, wpływ i uzgodnione działania. Materiał jest kompletnym scenariuszem dydaktycznym, przygotowanym na potrzeby ćwiczenia.

## Praca z repozytorium

Każda zmiana wymaga brancha i PR do main. GitHub blokuje bezpośredni push, wymaga zielonego verify, aktualnej gałęzi i rozwiązanych uwag. Ochrona obejmuje administratora. Lokalne hooki blokują commit na main i push do zdalnego main. Komendy oraz sposób włączenia hooków opisuje [CONTRIBUTING.md](../CONTRIBUTING.md).

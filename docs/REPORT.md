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

MVP obejmuje CRUD przedmiotów, terminy egzaminów/kolokwiów/projektów, zadania, filtr przedmiotu, postęp, lokalny zapis i kopię JSON. Konta, synchronizacja, współpraca i przypomnienia pozostają poza pierwszym wydaniem.

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

### Gantt

Harmonogram tekstowy z kamieniami M1 (przegląd Sprintu 1) i M2 (wdrożenie i przegląd Sprintu 2) znajduje się w PROJECT.md.

## 4. Dokumentacja techniczna

Frontend jest zbudowany w React, TypeScript i Vite; dane nie opuszczają przeglądarki. Model PlannerData składa się z Subject, Exam i StudyTask; rekordy zaliczenia i zadania odwołują się do przedmiotu przez subjectId. Schemat przepływu danych jest w PROJECT.md. Walidator importu sprawdza wersję, pola, unikalność identyfikatorów i istnienie powiązanego przedmiotu. GitHub Actions testuje i publikuje katalog dist/.

## 5. Implementacja

Funkcje MVP odpowiadają User Stories w backlogu i zgłoszeniom w repozytorium. Sprint 1 zawiera plan, model, terminy, zadania i postęp; Sprint 2 zawiera kopię, demo, widoki mobilne i dokumentację. Opis iteracji w projekcie jest symulacją dydaktyczną. Problemy do rozpatrzenia w tej architekturze to utrata lokalnego magazynu i błędny plik importu; obsługę stanowią eksport oraz walidacja przed zapisem.

**Środowisko:** Node.js 22, npm, TypeScript, Vite, React, Vitest, Testing Library, GitHub Actions i GitHub Pages.

## 6. Testowanie i jakość

Testy jednostkowe i interfejsu opisano w TEST_PLAN.md. Automatyczne przypadki sprawdzają dodanie wpisów, trwałość zapisu, filtrowanie i obliczanie postępu; walidator sprawdza również błędny import oraz relacje. Odbiór ręczny obejmuje telefon, klawiaturę, pusty stan i faktyczne odtworzenie kopii. W tym sprawozdaniu wyniki testów należy wpisać na podstawie uruchomienia lokalnego i historii Actions. Repo zawiera formularz Issue dla zgłoszeń błędów i checklistę jakości.

## 7. Zarządzanie ryzykiem

Analiza SWOT i rejestr ryzyk z prawdopodobieństwem, skutkiem i działaniem minimalizującym znajdują się w PROJECT.md. W szczególności wyczyszczenie danych ogranicza kopia JSON; uszkodzony import sprawdzany jest przed zapisem; błąd ścieżki Pages ma być wykryty przez build i odbiór wdrożenia.

## 8. Dokumentacja użytkowa

Pełna instrukcja i FAQ są w USER_GUIDE.md. Użytkownik dodaje przedmiot, przypisuje do niego terminy i zadania, oznacza kroki i eksportuje kopię. Aplikacja działa bez konta i zapisuje dane w bieżącej przeglądarce.

## 9. Retrospektywa projektu

Symulowane retrospektywy Sprint 1 i Sprint 2 zapisano w PROJECT.md metodą 4Ls wraz z działaniem wdrażanym w kolejnej iteracji. Feedback 360° zawiera pola do rzeczywistego uzupełnienia. Nie wstawiono fikcyjnych wypowiedzi ani ocen członków.

## 10. Wnioski i rekomendacje

MVP odpowiada celowi, jeśli wdrożona aplikacja przejdzie scenariusz dodania przedmiotu, zadania i terminu oraz zachowa dane po odświeżeniu. Ostateczny status celu, testów i Pages należy potwierdzić historią Actions. Rozwój po zaliczeniu może objąć tygodniowy plan nauki, przypomnienia i synchronizację po decyzji o uwierzytelnianiu i ochronie danych. Zalecenia dla zespołu: prowadzić zadania przez PR, ograniczać WIP, zapisywać blokady i zamykać iterację mierzalnym przeglądem.

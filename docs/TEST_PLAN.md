# Testy i jakość

Testy aplikacji uruchamia npm test; pipeline wykonuje je przed kompilacją i wdrożeniem. Wynik uruchomienia w repozytorium powinien być raportowany na podstawie realnego statusu CI.

| ID | Scenariusz | Oczekiwany wynik | Status |
|---|---|---|---|
| T-01 | Dodać przedmiot | Pojawia się na liście i w filtrze | Automatyczny |
| T-02 | Dodać zadanie do przedmiotu | Zadanie jest widoczne i zapisane po odświeżeniu | Automatyczny |
| T-03 | Dodać termin zaliczenia | Termin sortuje się po dacie | Automatyczny |
| T-04 | Oznaczyć zadanie jako wykonane | Zmienia się status i wartość postępu | Automatyczny |
| T-05 | Filtrować po przedmiocie | Widoczne są wyłącznie powiązane zadania i terminy | Automatyczny |
| T-06 | Zaimportować poprawną kopię | Plan zostaje odtworzony po potwierdzeniu | Test interfejsu |
| T-07 | Zaimportować uszkodzony plik lub niemożliwą datę | Komunikat błędu; dotychczasowe dane pozostają | Test interfejsu i walidatora |
| T-08 | Otworzyć na szerokości 360 px i klawiaturą | Bez przepełnienia; postęp i usuwanie widoczne; fokus w oknie | Chrome 360 px oraz test Tab/Escape/powrotu fokusu |
| T-09 | Anulować usuwanie, następnie je potwierdzić | Dopiero potwierdzenie usuwa wpisy; pojawia się pusty stan | Test interfejsu |
| T-10 | Liczyć dni przez zmianę czasu | Dni kalendarzowe, niezależnie od zmiany czasu | Test regresji i odczyt w Chrome |
| T-11 | Mieć przeszły i przyszły termin | Podsumowanie wybiera nadchodzący, lista pozostaje posortowana | Test interfejsu |

## Checklista jakości

- [x] npm ci w CI, npm test oraz npm run build kończą się powodzeniem.
- [x] Dodanie i oznaczanie elementów aktualizuje podsumowanie.
- [x] Import błędnego pliku nie zmienia danych.
- [x] Własne potwierdzenie poprzedza usuwanie, import i wczytanie demo na istniejącym planie.
- [x] Widok 360 px i desktop obejrzany w Chrome; fokus, Tab i Escape sprawdzone.
- [x] Wdrożony redesign Pages ładuje pliki spod ścieżki repozytorium.
- [x] Instrukcja obsługi i komunikaty odpowiadają aktualnej aplikacji.
- [ ] Zespół sprawdza plan na swoich fizycznych urządzeniach i przekazuje rzeczywisty feedback.

Wynik lokalny po poprawkach #18: **11/11 testów w czterech plikach**, build poprawny. Zakres i dowody: [ACCEPTANCE.md](ACCEPTANCE.md). Kontrole w Chrome i testy automatyczne nie są opinią członków zespołu ani testem na fizycznym telefonie.

## Bug tracking

Błędy zgłaszamy przez formularz Issue „Zgłoszenie błędu”: oczekiwany i rzeczywisty wynik, kroki odtworzenia i wpływ. Naprawa wiąże Issue z PR przez „Closes #ID”; test regresji i CI wchodzą do kryteriów ukończenia. Wartości przykładowe to puste szablony — nie sugerują, że konkretny błąd został rzeczywiście znaleziony.

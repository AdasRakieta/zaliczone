# Testy i jakość

Testy aplikacji uruchamia npm test; pipeline wykonuje je przed kompilacją i wdrożeniem. Wynik uruchomienia w repozytorium powinien być raportowany na podstawie realnego statusu CI.

| ID | Scenariusz | Oczekiwany wynik | Status |
|---|---|---|---|
| T-01 | Dodać przedmiot | Pojawia się na liście i w filtrze | Automatyczny |
| T-02 | Dodać zadanie do przedmiotu | Zadanie jest widoczne i zapisane po odświeżeniu | Automatyczny |
| T-03 | Dodać termin zaliczenia | Termin sortuje się po dacie | Automatyczny |
| T-04 | Oznaczyć zadanie jako wykonane | Zmienia się status i wartość postępu | Automatyczny |
| T-05 | Filtrować po przedmiocie | Widoczne są wyłącznie powiązane zadania i terminy | Automatyczny |
| T-06 | Zaimportować poprawną kopię | Plan zostaje odtworzony | Ręczny odbiór |
| T-07 | Zaimportować uszkodzony plik | Komunikat błędu; dotychczasowe dane pozostają | Walidacja jednostkowa |
| T-08 | Otworzyć na szerokości 360 px i klawiaturą | Bez poziomego przepełnienia; formularze i przyciski osiągalne | Ręczny odbiór |
| T-09 | Wyczyścić dane przeglądarki | Aplikacja pokazuje stan pusty i umożliwia nowy plan | Ręczny odbiór |

## Checklista jakości

- [ ] npm ci, npm test oraz npm run build kończą się powodzeniem.
- [ ] Dodanie i oznaczanie elementów aktualizuje podsumowanie.
- [ ] Import błędnego pliku nie zmienia danych.
- [ ] Potwierdzenie poprzedza usuwanie przedmiotu i czyszczenie całego planu.
- [ ] Strona działa na telefonie i komputerze oraz z klawiatury.
- [ ] Wdrożenie Pages ładuje pliki spod ścieżki repozytorium.
- [ ] Instrukcja obsługi i komunikaty odpowiadają aktualnej aplikacji.

## Bug tracking

Błędy zgłaszamy przez formularz Issue „Zgłoszenie błędu”: oczekiwany i rzeczywisty wynik, kroki odtworzenia i wpływ. Naprawa wiąże Issue z PR przez „Closes #ID”; test regresji i CI wchodzą do kryteriów ukończenia. Wartości przykładowe to puste szablony — nie sugerują, że konkretny błąd został rzeczywiście znaleziony.

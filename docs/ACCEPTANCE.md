# Odbiór techniczny — 24.10.2026

Odbiór wykonany przez Codex w imieniu Szymona. Nazwiska właścicieli w backlogu opisują plan odpowiedzialności; nie stanowią autorstwa kodu ani potwierdzenia spotkań. Rzeczywisty odbiór zespołu i feedback pozostają w Issue #8.

## Wygląd i własne komponenty

- Ciepłe tło papieru, szeryfowe nagłówki, oszczędne linie i autorska ilustracja SVG.
- Własne komponenty React i CSS, ikony SVG w `src/components/Icons.tsx`; brak bibliotek komponentów, ikon i fontów z CDN.
- Własny `Modal` i potwierdzenia w `src/components/Modal.tsx`. Fokus pozostaje w oknie; Escape anuluje; po zamknięciu fokus wraca do wywołującego przycisku. Tło jest nieaktywne przez `inert`.
- Przy 360 px brak poziomego przepełnienia. Postęp i usuwanie przedmiotu są dostępne. Układ obejrzano w Chrome; nie jest to test fizycznego telefonu ani audyt WCAG.

## Kontrole automatyczne

`npm test`: 11/11 testów w czterech plikach. `npm run build`: kompilacja TypeScript i paczka produkcyjna poprawne.

| Plik | Co faktycznie sprawdza |
|---|---|
| App.test.tsx | Dodawanie przedmiotu/zadania/terminu, zapis, zmiana postępu, filtrowanie zadań |
| App.workflow.test.tsx | Odtwarzanie stanu po ponownym otwarciu widoku, kolejność terminów, pomijanie przeszłych dat, fokus, Tab/Shift+Tab, Escape, anulowanie i kaskadowe usuwanie, import poprawny i błędny, ochrona przed zastąpieniem przez demo |
| types.test.ts | Wersja formatu, powiązania, duplikaty identyfikatorów, nazwy i rodzaje zaliczeń |
| dates.test.ts | Liczba dni przy obu zmianach czasu, dzień bieżący i przeszły |

Testy uruchamiają się również w CI przed publikacją. Scenariusz importu sprawdza prawdziwą ścieżkę formularza w środowisku DOM, z plikiem testowym; przeniesienie kopii między dwoma fizycznymi urządzeniami pozostaje do odbioru przez zespół.

## Rzeczywisty rejestr błędów

Issue [#18](https://github.com/AdasRakieta/zaliczone/issues/18) rejestruje problemy znalezione podczas odbioru: systemowe potwierdzenia, brak obsługi fokusu, zastępowanie planu bez pytania, błędne odliczanie przy zmianie czasu, niepoprawne daty importu oraz brak postępu i usuwania przedmiotu w mobilnym widoku. Testy regresji i kontrola przeglądarki obejmują poprawki.

## Publikacja i materiały

Redesign został scalony w [PR #17](https://github.com/AdasRakieta/zaliczone/pull/17). CI [40088853147](https://github.com/AdasRakieta/zaliczone/actions/runs/40088853147) i Pages [40088853150](https://github.com/AdasRakieta/zaliczone/actions/runs/40088853150) przeszły. Poprawki #18 mają odrębny PR i przebieg CI. Aktualny wynik jest dostępny w [Actions](https://github.com/AdasRakieta/zaliczone/actions).

Tablica GitHub odzwierciedla wykonane rezultaty techniczne. Udział członków zespołu, zaproszenia do repozytorium i rzeczywiste opinie są śledzone oddzielnie. Sprawozdanie PDF zawiera 10 rozdziałów; spotkania i sprinty są wyraźnie opisane jako symulacja.

## Sprawozdanie według wzorca UKW i praca zespołu

Nowy skład ma 20 stron, 10 rozdziałów i 11 numerowanych ilustracji. Zachowano oryginalne logo, style, numerowanie oraz dwie sekcje A4 z przekazanego DOCX; źródłowy plik i zachowane części pakietu porównano po SHA-256. DOCX i PDF zawierają tę samą treść, spisy, tabelę ról, backlog, Gantta, diagramy logiczne i fizyczne, wyniki testów, checklistę, SWOT, ryzyka, instrukcję i FAQ. Notatki oraz feedback wszystkich czterech osób są opracowaną symulacją zgodnie z zakresem ćwiczenia.

GitHub Projects ma widok Zespół z kolumnami Szymon Przybysz, Iwona Figas, Jarek Antczak i Emil Kosicki. Pole odpowiedzialności przedstawia plan, a przypisanie kont pozostaje osobną czynnością. `main` wymaga PR, aktualnej gałęzi, zielonego verify i rozwiązanych uwag, z ochroną administratora oraz historią liniową. Lokalne hooki sprawdzono w czterech przypadkach: commit na branchu, blokada commitu na main, blokada pushu do main i dozwolony push brancha.

# Zasady pracy nad projektem

Każda zmiana powstaje na osobnym branchu i trafia do `main` przez Pull Request. Dotyczy to kodu, dokumentacji i poprawek. Ochrona `main` obejmuje również administratora repozytorium.

## Praca nad zadaniem

1. Wybierz Issue i przenieś je do In Progress. Uzgodnij właściciela, kryteria oraz zakres.
2. Pobierz aktualny kod i utwórz branch:

~~~sh
git switch main
git pull --ff-only
git switch -c feature/123-krotka-nazwa
~~~

3. Zapisuj commity na tym branchu. Dla błędów używaj `fix/`, a dla dokumentacji `docs/`.
4. Uruchom kontrole adekwatne do zmiany, następnie wypchnij branch:

~~~sh
npm test
npm run build
git push -u origin feature/123-krotka-nazwa
~~~

5. Otwórz PR do `main`, powiąż Issue, opisz zmianę i jej sprawdzenie. Poproś inną osobę o przegląd. Uwagi rozwiązuj kolejnymi commitami na tym samym branchu.
6. Po zielonym CI i rozwiązaniu rozmów scal PR opcją Squash and merge. GitHub usuwa branch po scaleniu, a workflow publikuje aplikację w Pages. Sprawdź działanie wdrożenia i uaktualnij zadanie.

## Ochrona main

GitHub wymaga Pull Requesta, aktualnej gałęzi względem `main`, zielonej kontroli `verify` i rozwiązania wszystkich rozmów w przeglądzie. Włączono historię liniową, zakaz force push i zakaz usunięcia `main`. Reguły obowiązują administratora. Przegląd przez inną osobę jest zasadą zespołu; obecnie nie ma wymaganego minimum liczbowego akceptacji, żeby obsługa repozytorium nie zależała od oczekujących zaproszeń.

## Lokalne zabezpieczenia

Po sklonowaniu repozytorium wykonaj:

~~~sh
git config core.hooksPath .githooks
~~~

Hook `pre-commit` zatrzymuje commit na `main`, a `pre-push` zatrzymuje push do zdalnego `main`, także z innej lokalnej gałęzi. Hooki pomagają przestrzegać procesu; właściwą ochroną zdalnego repozytorium są reguły GitHub. `main` służy do pobrania aktualnej wersji, a pracę zaczynamy po przełączeniu na branch zadania.

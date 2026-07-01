# WordPress theme voorbeeld voor KV TOGO

Deze map laat zien hoe jouw huidige statische site eruitziet als een custom WordPress theme.

## Locatie

- Theme map: `wp-theme-kvtogo-preview/kvtogo`

## Belangrijkste bestanden

- `wp-theme-kvtogo-preview/kvtogo/functions.php`
- `wp-theme-kvtogo-preview/kvtogo/header.php`
- `wp-theme-kvtogo-preview/kvtogo/front-page.php`
- `wp-theme-kvtogo-preview/kvtogo/template-parts/home-clubnieuws.php`
- `wp-theme-kvtogo-preview/kvtogo/single.php`

## Wat dit voorbeeld toont

1. Homepage opgebouwd met template parts (hero, clubnieuws, agenda, social, sponsoren).
2. Clubnieuws dynamisch via WordPress posts uit categorie `clubnieuws`.
3. Detailpagina van nieuws via `single.php`.
4. Zelfde visuele stijl via een lokale theme-bundel (`theme.css` + `assets/css/*`).

## Zo test je dit lokaal in WordPress

1. Kopieer map `kvtogo` naar `wp-content/themes/`.
2. Activeer het theme in het WordPress dashboard.
3. Maak categorie `clubnieuws` aan.
4. Voeg 3 nieuwsberichten toe met uitgelichte afbeelding.
5. Stel een pagina in als homepage met template `front-page.php`.

## Volgende stap richting productie

- Verplaats ook `/assets/images`, `/assets/logos` en `/assets/social` naar de theme-map en update afbeeldingspaden in templates.

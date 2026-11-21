# Web SK Malá Skála

Web fotbalového klubu SK Malá Skála. Běží zdarma na GitHub Pages, obsah se upravuje v administraci **Pages CMS** (app.pagescms.org).

## Jak se web upravuje

Správce obsahu se přihlásí na **app.pagescms.org** (odkazem z pozvánky v e-mailu) a v levém menu vybere:

- **Články a reporty**: nový článek přes tlačítko pro přidání. U reportu vyplň i část **Zápas**. Výsledek a znaky se pak ukážou samy.
- **Program zápasů**: nadcházející zápasy, nejbližší nahoře. Odehraný zápas web sám schová v pondělí po zápase.
- **Výsledky**: odehrané zápasy, nejnovější nahoře.
- **Tabulka 7. ligy**: pořadí a čísla podle fotbal.cz.
- **Soupiska a statistiky**: hráči a jejich čísla.
- **Klub a kontakty**: realizační tým, telefony, odkazy.

Po uložení se web sám přestaví a změna je vidět asi do dvou minut.

### Týdenní postup po zápase
1. Ve **Výsledcích** přidej zápas nahoru (soupeř, góly, doma/venku, znak).
2. V **Tabulce** přepiš čísla podle fotbal.cz a seřaď kluby.
3. Ve **Soupisce** připiš zápasy, minuty, góly a karty.
4. Napiš **report** v Článcích a reportech.

## Struktura (pro správce webu)

| Soubor nebo složka | Co obsahuje |
|---|---|
| `index.html` | hlavní stránka (šablona) |
| `_layouts/` | šablona stránky a šablona článku |
| `_includes/` | menší kousky šablon (karta článku, infobox…) |
| `_posts/` | články, jeden soubor = jeden článek |
| `_data/` | tabulka, program, výsledky, soupiska, klub (JSON) |
| `assets/` | styly (`styl.css`) a skript (`skript.js`) |
| `fotky/` | fotky nahrané v administraci |
| `znaky/` | znaky klubů |
| `.pages.yml` | nastavení formulářů v administraci |

Adresu webu (včetně vlastní domény) si web zjistí sám, při přechodu na doménu se v kódu nic měnit nemusí.

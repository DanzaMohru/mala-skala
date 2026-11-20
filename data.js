// =====================================================================
//  DATA WEBU SK MALÁ SKÁLA
//
//  Po každém kole stačí upravit jen tenhle soubor.
//  Web si z něj sám poskládá:
//    - tabulku 7. ligy,
//    - program a výsledky áčka,
//    - kartu „Příští zápas“ a „Poslední výsledek“ v úvodu,
//    - čísla v úvodu (místo v tabulce, skóre, body).
//
//  PRAVIDLA ZÁPISU
//    - Text patří do uvozovek: "Malá Skála"
//    - Čísla jsou bez uvozovek: 13
//    - Za každou položkou je čárka. Za poslední v seznamu být nemusí.
//    - Hranaté závorky [ ] = seznam, složené závorky { } = jedna položka.
// =====================================================================


// Jméno našeho týmu. Podle něj web pozná náš řádek v tabulce
// a ví, jestli jsme v zápase domácí, nebo hosté.
var nasTym = "Malá Skála";


// ---------------------------------------------------------------------
//  TABULKA 7. LIGY VÝCHOD
//  Kluby piš v pořadí od prvního místa. Číslo místa se dopočítá samo.
//  z, v, r, p = zápasy, výhry, remízy, prohry
//  zmena = posun v tabulce od minulého kola (1 = o místo nahoru, -1 = o místo dolů, 0 = beze změny)
//  forma = posledních pět zápasů, nejnovější vlevo (V výhra, R remíza, P prohra)
// ---------------------------------------------------------------------
var tabulka = [
    { klub: "Albrechtice/Jiřetín",   znak: "znaky/albrechtice.png",               z: 13, v: 12, r: 1, p: 0,  skore: "45:11", body: 37, zmena: 0,  forma: "VVVVV" },
    { klub: "Turnov B",              znak: "znaky/turnovB.png",                   z: 13, v: 10, r: 0, p: 3,  skore: "66:18", body: 30, zmena: 0,  forma: "VVVPP" },
    { klub: "Plavy",                 znak: "znaky/plavy.png",                     z: 13, v: 9,  r: 0, p: 4,  skore: "42:24", body: 27, zmena: 1,  forma: "VVVVV" },
    { klub: "Lučany nad Nisou",      znak: "znaky/lucany.png",                    z: 13, v: 8,  r: 1, p: 4,  skore: "40:31", body: 25, zmena: -1, forma: "PPVVV" },
    { klub: "Železný Brod B",        znak: "znaky/zeleznybrodB.png",              z: 13, v: 8,  r: 0, p: 5,  skore: "52:41", body: 24, zmena: 0,  forma: "VPPPV" },
    { klub: "Smržovka",              znak: "znaky/smrzovka.png",                  z: 13, v: 7,  r: 0, p: 6,  skore: "38:30", body: 21, zmena: 0,  forma: "VPPPV" },
    { klub: "Harrachov",             znak: "znaky/tj-jiskra-harrachov.png",       z: 13, v: 7,  r: 0, p: 6,  skore: "32:27", body: 21, zmena: 0,  forma: "VPVVV" },
    { klub: "Hodkovice",             znak: "znaky/sk-hodkovice-nad-mohelkou.png", z: 13, v: 6,  r: 1, p: 6,  skore: "28:28", body: 19, zmena: 1,  forma: "VVVVV" },
    { klub: "Desná",                 znak: "znaky/desna.png",                     z: 13, v: 5,  r: 2, p: 6,  skore: "19:30", body: 17, zmena: -1, forma: "PVPVP" },
    { klub: "Malá Skála",            znak: "logo.png",                            z: 13, v: 5,  r: 1, p: 7,  skore: "27:39", body: 16, zmena: 0,  forma: "PVPVP" },
    { klub: "Jilemnice",             znak: "znaky/jilemnice.png",                 z: 13, v: 4,  r: 1, p: 8,  skore: "24:43", body: 13, zmena: 0,  forma: "PPVPP" },
    { klub: "Jenišovice",            znak: "znaky/jenisovice.png",                z: 13, v: 2,  r: 2, p: 9,  skore: "17:40", body: 8,  zmena: 0,  forma: "PRPPP" },
    { klub: "Rovensko pod Troskami", znak: "znaky/rovensko.png",                  z: 13, v: 1,  r: 2, p: 10, skore: "18:53", body: 5,  zmena: 0,  forma: "PRPPP" },
    { klub: "Pěnčín B",              znak: "znaky/pencinB.png",                   z: 13, v: 1,  r: 1, p: 11, skore: "15:48", body: 4,  zmena: 0,  forma: "PPPPP" }
];


// ---------------------------------------------------------------------
//  PROGRAM – zápasy, které nás čekají (nejbližší nahoře)
//  První zápas v seznamu se ukáže v úvodu jako „Příští zápas“.
//  Odehraný zápas web sám schová o půlnoci z neděle na pondělí v týdnu,
//  kdy se hrál, a karta se přepne na další zápas. Výsledek ale musíš
//  dopsat ručně do VÝSLEDKŮ níže. Odehrané zápasy odsud pak můžeš smazat.
//
//  den    = celý název dne malými písmeny ("sobota")
//  kolo   = krátký štítek ("18. kolo" nebo "MOL Cup")
//  soutez = soutěž ("7. liga VÝCHOD" nebo "skupina E")
//  misto  = "doma", "venku" nebo název hřiště
//  znak   = znak soupeře
//  pohar  = true u pohárových a přípravných zápasů (štítek bude červený)
// ---------------------------------------------------------------------
var program = [
    { den: "pátek",  datum: "12. 2. 2027", cas: "19:15", kolo: "MOL Cup",  soutez: "skupina E",      misto: "UMT Turnov", domaci: "Malá Skála",   hoste: "Turnov B",       znak: "znaky/turnovB.png",      pohar: true },
    { den: "sobota", datum: "20. 2. 2027", cas: "17:00", kolo: "MOL Cup",  soutez: "skupina E",      misto: "UMT Turnov", domaci: "Sedmihorky",   hoste: "Malá Skála",     znak: "znaky/sedmihorky.png",   pohar: true },
    { den: "sobota", datum: "27. 2. 2027", cas: "17:00", kolo: "MOL Cup",  soutez: "skupina E",      misto: "UMT Turnov", domaci: "Sokol Pěnčín", hoste: "Malá Skála",     znak: "znaky/sokolpencin.png",  pohar: true },
    { den: "neděle", datum: "21. 3. 2027", cas: "15:00", kolo: "18. kolo", soutez: "7. liga VÝCHOD", misto: "doma",       domaci: "Malá Skála",   hoste: "Železný Brod B", znak: "znaky/zeleznybrodB.png" },
    { den: "sobota", datum: "27. 3. 2027", cas: "15:30", kolo: "19. kolo", soutez: "7. liga VÝCHOD", misto: "venku",      domaci: "Plavy",        hoste: "Malá Skála",     znak: "znaky/plavy.png" },
    { den: "neděle", datum: "4. 4. 2027",  cas: "16:30", kolo: "20. kolo", soutez: "7. liga VÝCHOD", misto: "doma",       domaci: "Malá Skála",   hoste: "Desná",          znak: "znaky/desna.png" },
    { den: "sobota", datum: "10. 4. 2027", cas: "16:30", kolo: "21. kolo", soutez: "7. liga VÝCHOD", misto: "venku",      domaci: "Jilemnice",    hoste: "Malá Skála",     znak: "znaky/jilemnice.png" },
    { den: "neděle", datum: "18. 4. 2027", cas: "17:00", kolo: "22. kolo", soutez: "7. liga VÝCHOD", misto: "doma",       domaci: "Malá Skála",   hoste: "Jenišovice",     znak: "znaky/jenisovice.png" }
];


// ---------------------------------------------------------------------
//  VÝSLEDKY – odehrané zápasy (nejnovější nahoře)
//  PRVNÍ zápas v seznamu se ukáže v úvodu jako „Poslední výsledek“.
//  skore piš vždy jako domácí:hosté. Barvu (výhra, remíza, prohra)
//  web dopočítá sám podle toho, jestli jsme hráli doma, nebo venku.
//  Když neznáš čas výkopu, nech cas: "".
// ---------------------------------------------------------------------
var vysledky = [
    { den: "sobota", datum: "7. 11. 2026",  cas: "10:00", kolo: "1. kolo",  soutez: "7. liga VÝCHOD", misto: "venku", domaci: "Hodkovice",        hoste: "Malá Skála", znak: "znaky/sk-hodkovice-nad-mohelkou.png", skore: "5:2" },
    { den: "neděle", datum: "1. 11. 2026",  cas: "14:00", kolo: "13. kolo", soutez: "7. liga VÝCHOD", misto: "doma",  domaci: "Malá Skála",       hoste: "Harrachov",  znak: "znaky/tj-jiskra-harrachov.png",       skore: "2:1" },
    { den: "sobota", datum: "24. 10. 2026", cas: "15:00", kolo: "12. kolo", soutez: "7. liga VÝCHOD", misto: "venku", domaci: "Lučany nad Nisou", hoste: "Malá Skála", znak: "znaky/lucany.png",                    skore: "2:0" },
    { den: "neděle", datum: "18. 10. 2026", cas: "",      kolo: "11. kolo", soutez: "7. liga VÝCHOD", misto: "venku", domaci: "Pěnčín B",         hoste: "Malá Skála", znak: "znaky/pencinB.png",                   skore: "2:4" },
    { den: "neděle", datum: "11. 10. 2026", cas: "",      kolo: "10. kolo", soutez: "7. liga VÝCHOD", misto: "doma",  domaci: "Malá Skála",       hoste: "Smržovka",   znak: "znaky/smrzovka.png",                  skore: "2:3" }
];

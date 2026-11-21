// =====================================================================
//  SKRIPT WEBU SK MALÁ SKÁLA
//  Data (tabulka, zápasy) se upravují v administraci.
//  Tady je jen kód, který z nich skládá stránku. Po kole se tu nic nemění.
// =====================================================================


// ---------------------------------------------------------------------
//  MOBILNÍ MENU
// ---------------------------------------------------------------------
function menu() {
    // toggle = když třída je, sundej ji; když není, přidej ji
    var nabidka = document.getElementById("menu");
    nabidka.classList.toggle("otevrene");

    // ikonka: otevřené menu ukazuje křížek, zavřené tři čárky
    if (nabidka.classList.contains("otevrene")) {
        document.getElementById("menu-tlacitko").innerText = "✕";
    } else {
        document.getElementById("menu-tlacitko").innerText = "☰";
    }
}

// po kliknutí na odkaz v menu se menu zase zavře
function zavriMenu() {
    document.getElementById("menu").classList.remove("otevrene");
    document.getElementById("menu-tlacitko").innerText = "☰";
}


// ---------------------------------------------------------------------
//  PŘEPÍNACÍ ZÁLOŽKY (příští zápas / poslední výsledek, program / výsledky)
// ---------------------------------------------------------------------
function prepni(ukazat, schovat) {
    document.getElementById(ukazat).classList.remove("skryty");
    document.getElementById(schovat).classList.add("skryty");
    document.getElementById("tlacitko-" + ukazat).classList.add("aktivni");
    document.getElementById("tlacitko-" + schovat).classList.remove("aktivni");
}


// ---------------------------------------------------------------------
//  GALERIE AREÁLU (šipky mezi fotkami)
// ---------------------------------------------------------------------
var aktualni = 0;

function posun(smer) {
    var fotky = document.querySelectorAll(".fotka");
    fotky[aktualni].classList.add("skryty");

    aktualni = aktualni + smer;
    if (aktualni >= fotky.length) {
        aktualni = 0;
    }
    if (aktualni < 0) {
        aktualni = fotky.length - 1;
    }

    fotky[aktualni].classList.remove("skryty");
    document.getElementById("popisek").innerText = fotky[aktualni].alt + " • " + (aktualni + 1) + " / " + fotky.length;
}


// ---------------------------------------------------------------------
//  POMOCNÍCI PRO DATUM
//  Administrace ukládá datum jako "2027-02-12" (rok-měsíc-den).
// ---------------------------------------------------------------------
var dnyCele = ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"];
var dnyKratke = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];

// "2027-02-12" -> datum, se kterým umí JavaScript počítat
function prevedDatum(text) {
    var casti = String(text).split("-");
    return new Date(Number(casti[0]), Number(casti[1]) - 1, Number(casti[2]));  // měsíce se počítají od nuly
}

// -> "12. 2."
function datumKratky(datum) {
    return datum.getDate() + ". " + (datum.getMonth() + 1) + ".";
}

// -> "12. 2. 2027"
function datumDlouhy(datum) {
    return datumKratky(datum) + " " + datum.getFullYear();
}

// do kdy se má zápas v programu ukazovat:
// do půlnoci z neděle na pondělí v týdnu, kdy se hraje
function konecTydne(zapas) {
    var datum = prevedDatum(zapas.datum);
    var denVTydnu = datum.getDay();        // 0 = neděle, 1 = pondělí, ... 6 = sobota
    var doPondeli = 8 - denVTydnu;         // kolik dní zbývá do dalšího pondělí
    if (denVTydnu === 0) {
        doPondeli = 1;                     // z neděle je to do pondělí jen jeden den
    }
    return new Date(datum.getFullYear(), datum.getMonth(), datum.getDate() + doPondeli);
}


// ---------------------------------------------------------------------
//  POMOCNÍCI PRO ZÁPASY
//  Každý zápas má "doma" (true/false) a "souper". Kdo je domácí
//  a kdo hosté, se dopočítá.
// ---------------------------------------------------------------------
function domaci(zapas) {
    if (zapas.doma) {
        return nasTym;
    }
    return zapas.souper;
}

function hoste(zapas) {
    if (zapas.doma) {
        return zapas.souper;
    }
    return nasTym;
}

// znak týmu: náš tým má klubové logo, soupeř znak uvedený u zápasu
function znakTymu(tym, zapas) {
    if (tym === nasTym) {
        return zaklad + "/logo.png";
    }
    return zaklad + zapas.znak;
}

// kde se hraje: vyplněné hřiště, nebo "doma" / "venku"
function kdeSeHraje(zapas) {
    if (zapas.misto) {
        return zapas.misto;
    }
    if (zapas.doma) {
        return "doma";
    }
    return "venku";
}

// skóre ve tvaru domácí:hosté, např. "5:2"
function skoreZapasu(zapas) {
    if (zapas.doma) {
        return zapas.nase_goly + ":" + zapas.goly_soupere;
    }
    return zapas.goly_soupere + ":" + zapas.nase_goly;
}

// výsledek z našeho pohledu: "vyhra", "remiza", nebo "prohra"
function nasVysledek(zapas) {
    var nase = Number(zapas.nase_goly);
    var souper = Number(zapas.goly_soupere);
    if (nase > souper) {
        return "vyhra";
    }
    if (nase === souper) {
        return "remiza";
    }
    return "prohra";
}


// ---------------------------------------------------------------------
//  TABULKA
// ---------------------------------------------------------------------
function vykresliTabulku() {
    var html = "";

    for (var i = 0; i < tabulka.length; i++) {
        var t = tabulka[i];
        var misto = i + 1;                  // seznam se čísluje od nuly, tabulka od jedničky

        if (t.klub === nasTym) {
            html += '<tr class="nas-tym">';
            // náš řádek zároveň vyplní čísla v úvodu stránky
            document.getElementById("nase-misto").innerText = misto + ".";
            document.getElementById("nase-skore").innerText = t.skore;
            document.getElementById("nase-body").innerText = t.body;
        } else {
            html += "<tr>";
        }

        // místo a šipka posunu
        var sipka = "";
        if (t.zmena > 0) {
            sipka = ' <span class="nahoru">▲' + t.zmena + "</span>";
        }
        if (t.zmena < 0) {
            sipka = ' <span class="dolu">▼' + (-t.zmena) + "</span>";
        }
        html += "<td>" + misto + "." + sipka + "</td>";

        // klub se znakem (za lomítkem se na mobilu smí zalomit řádek)
        html += '<td class="klub"><img class="znak" src="' + zaklad + t.znak + '" alt="">' + t.klub.replace("/", "/<wbr>") + "</td>";
        html += "<td>" + t.z + "</td><td>" + t.v + "</td><td>" + t.r + "</td><td>" + t.p + "</td>";
        html += "<td>" + t.skore + '</td><td class="bod">' + t.body + "</td>";

        // forma: z textu "VVVPP" udělá pět barevných čtverečků
        html += '<td><div class="forma">';
        var forma = String(t.forma || "").toUpperCase();
        for (var j = 0; j < forma.length; j++) {
            var pismeno = forma.charAt(j);
            var trida = "prohra";
            if (pismeno === "V") {
                trida = "vyhra";
            }
            if (pismeno === "R") {
                trida = "remiza";
            }
            html += '<span class="' + trida + '">' + pismeno + "</span>";
        }
        html += "</div></td></tr>";
    }

    document.getElementById("tabulka-radky").innerHTML = html;
}


// ---------------------------------------------------------------------
//  PROGRAM A VÝSLEDKY
//  Všechny zápasy jsou v jednom seznamu. Zápas s vyplněnými góly
//  je odehraný (patří do výsledků), zápas bez gólů je v programu.
// ---------------------------------------------------------------------

// má zápas vyplněný výsledek? (obě čísla gólů)
function maVysledek(zapas) {
    return zapas.nase_goly !== null && zapas.nase_goly !== undefined && zapas.nase_goly !== "" &&
           zapas.goly_soupere !== null && zapas.goly_soupere !== undefined && zapas.goly_soupere !== "";
}

// pomocník pro řazení: "2027-02-12" + "19:15" -> "2027-02-12 19:15"
function klicRazeni(zapas) {
    return String(zapas.datum) + " " + String(zapas.cas || "");
}

// program: zápasy bez výsledku, jejichž týden ještě neskončil, od nejbližšího
function nadchazejiciZapasy() {
    var ted = new Date();                  // dnešní datum a čas na zařízení návštěvníka
    var vybrane = [];
    for (var i = 0; i < zapasy.length; i++) {
        if (!maVysledek(zapasy[i]) && ted < konecTydne(zapasy[i])) {
            vybrane.push(zapasy[i]);       // push = přidej na konec seznamu
        }
    }
    // sort = seřaď; tady od nejstaršího data po nejnovější
    vybrane.sort(function (a, b) {
        return klicRazeni(a) < klicRazeni(b) ? -1 : 1;
    });
    return vybrane;
}

// výsledky: zápasy s vyplněnými góly, od nejnovějšího
function odehraneZapasy() {
    var vybrane = [];
    for (var i = 0; i < zapasy.length; i++) {
        if (maVysledek(zapasy[i])) {
            vybrane.push(zapasy[i]);
        }
    }
    vybrane.sort(function (a, b) {
        return klicRazeni(a) > klicRazeni(b) ? -1 : 1;
    });
    return vybrane;
}

// jeden řádek zápasu; "vpravo" je čas výkopu, nebo skóre
function radekZapasu(zapas, vpravo) {
    var datum = prevedDatum(zapas.datum);
    var stitek = zapas.kolo;
    if (zapas.pohar) {
        stitek = '<span class="pohar">' + zapas.kolo + "</span>";
    }

    return '<div class="zapas-radek">' +
               '<img class="znak" src="' + zaklad + zapas.znak + '" alt="">' +
               '<div class="zapas-text">' +
                   '<p class="zapas-info">' + dnyKratke[datum.getDay()] + " " + datumKratky(datum) + " • " + stitek + " • " + kdeSeHraje(zapas) + "</p>" +
                   '<p class="zapas-tymy">' + domaci(zapas) + " – " + hoste(zapas) + "</p>" +
               "</div>" +
               vpravo +
           "</div>";
}

function vykresliZapasy(nadchazejici, vysledky) {
    var html = "";
    for (var i = 0; i < nadchazejici.length; i++) {
        html += radekZapasu(nadchazejici[i], '<span class="cas">' + nadchazejici[i].cas + "</span>");
    }
    if (nadchazejici.length === 0) {
        html = '<p class="poznamka">Další zápasy zatím nejsou v programu.</p>';
    }
    document.getElementById("program").innerHTML = html;

    // ve výsledcích se ukáže pět posledních zápasů
    html = "";
    for (var k = 0; k < vysledky.length && k < 5; k++) {
        var z = vysledky[k];
        html += radekZapasu(z, '<span class="vysledek ' + nasVysledek(z) + '">' + skoreZapasu(z) + "</span>");
    }
    document.getElementById("vysledky").innerHTML = html;
}


// ---------------------------------------------------------------------
//  ÚVOD: velká karta zápasu ("uprostred" je nápis VS, nebo skóre)
// ---------------------------------------------------------------------
function kartaZapasu(zapas, uprostred) {
    var datum = prevedDatum(zapas.datum);
    var misto = kdeSeHraje(zapas);
    if (misto === "doma") {
        misto = "domácí hřiště";
    }

    var kdy = dnyCele[datum.getDay()] + " " + datumDlouhy(datum);
    if (zapas.cas) {
        kdy += " • " + zapas.cas;
    }
    kdy += " • " + misto;

    return '<p class="kolo">' + zapas.kolo + " • " + zapas.soutez + "</p>" +
           '<div class="souperi">' +
               '<div class="tym"><img src="' + znakTymu(domaci(zapas), zapas) + '" alt="Znak ' + domaci(zapas) + '"><span>' + domaci(zapas) + "</span></div>" +
               uprostred +
               '<div class="tym"><img src="' + znakTymu(hoste(zapas), zapas) + '" alt="Znak ' + hoste(zapas) + '"><span>' + hoste(zapas) + "</span></div>" +
           "</div>" +
           '<p class="kdy">' + kdy + "</p>";
}

function vykresliUvod(nadchazejici, vysledky) {
    // příští zápas = první zápas, jehož týden ještě neskončil
    if (nadchazejici.length > 0) {
        document.getElementById("pristi").innerHTML = kartaZapasu(nadchazejici[0], '<div class="vs">VS</div>');
    } else {
        document.getElementById("pristi").innerHTML = '<p class="kdy">Další zápasy zatím nejsou v programu.</p>';
    }

    // poslední výsledek = nejnovější odehraný zápas
    if (vysledky.length > 0) {
        document.getElementById("posledni").innerHTML = kartaZapasu(vysledky[0], '<div class="skore">' + skoreZapasu(vysledky[0]) + "</div>");
    }
}

// u hlavního článku bez fotky a bez zápasu ukáže vpravo nejbližší tři zápasy
function vykresliZapasyKClanku(nadchazejici) {
    var misto = document.getElementById("hlavni-zapasy");
    if (!misto) {
        return;
    }
    var html = "";
    for (var i = 0; i < nadchazejici.length && i < 3; i++) {
        html += radekZapasu(nadchazejici[i], '<span class="cas">' + nadchazejici[i].cas + "</span>");
    }
    if (html === "") {
        misto.style.display = "none";
    } else {
        misto.innerHTML = html;
    }
}


// ---------------------------------------------------------------------
//  SPUŠTĚNÍ – jen na hlavní stránce, kde jsou tabulka a zápasy
// ---------------------------------------------------------------------
if (document.getElementById("tabulka-radky")) {
    var nadchazejici = nadchazejiciZapasy();
    var vysledky = odehraneZapasy();
    vykresliTabulku();
    vykresliZapasy(nadchazejici, vysledky);
    vykresliUvod(nadchazejici, vysledky);
    vykresliZapasyKClanku(nadchazejici);
}

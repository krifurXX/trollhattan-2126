# Trollhättan 2126

En lokal, interaktiv framtidsbild av Trollhättan byggd med sustainable-builder. Här kombineras en 3D-modell av centrum med kommunstatistik, lokala källor och en utforskande modell för 2026–2126. Webbplatsen finns på svenska och engelska. Den är inte en kommunal plan eller prognos.

## Överenskomna val

Projektet använder OpenStreetMap och Copernicus DEM GLO-30. Leveransen omfattar en planerad film på 90 sekunder utan betald berättarröst. Ingen publicering ingår. Uppgifterna om filmen beskriver beställningen, inte att rendering eller slutkontroll är klar.

## Starta lokalt

Kör från projektets rotkatalog:

```sh
python3.12 sustainable.py site trollhattan
```

Kommandot startar utvecklingsservern i bakgrunden. Öppna den lokala adress som kommandot visar, normalt `http://localhost:5230`.

För webbplatsens granskningsbilder används installerad Google Chrome på denna Mac:

```sh
CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' python3.12 sustainable.py look trollhattan
```

Dessa kommandon är arbetsinstruktioner. De utgör ingen redovisning av vilka slutkontroller som har genomförts.

## Vad kartan och siffrorna visar

3D-modellen visar en ruta på 1,6 × 1,6 kilometer kring centrum, med mittpunkt 58,2827931° N, 12,2908612° E. Kommunens befolkning, hälsa och utsläpp gäller däremot hela Trollhättans kommun. Andra källor avser exempelvis Högskolan Väst eller ett avgränsat industriprojekt. Varje datapost anger omfattning och år; dessa nivåer ska inte blandas ihop.

Startåret 2026 visar senast tillgängliga observationer från olika år. Det betyder inte att samtliga värden har mätts 2026. Den sammanslagna källsamlingen innehåller 168 poster: 70 från Kolada, 62 från lokal fördjupning och 36 nationella poster. Den lokala fördjupningen består av 24 poster om klimat och energi, 22 om samhälle och ekonomi samt 16 om plats och natur.

Kommunens befolkningsprognos slutar 2035. Modellens mittscenario håller därefter befolkningen konstant. Osäkerhetskörningar kan avvika från mittscenariot, men de förlänger inte den officiella prognosen. Familjen Berg och framtida dilemman är fiktiva; familjens fasta livsspann är berättargrepp.

## Modellens begränsningar

De tolv reglagen representerar lokala prioriteringar inom industri, lärande, boende, omsorg, centrum, resor, byggnader, solenergi, natur, klimatanpassning, vattenberedskap och delaktighet. Effekternas storlek och fördröjning är antaganden. Källor som visar ett nuläge bevisar inte att ett reglage orsakar en viss förändring.

Genomförandekapacitet, beredskap och värmeexponering är modellerade mått. SDG-poäng och munkdiagrammets gränser är pedagogiska modellval, inte officiella hållbarhetsbetyg eller en fullständig bedömning av planetära gränser. Dimensioner som saknar modell visas som ej modellerade. Kommunen råder inte ensam över exempelvis industriinvesteringar, regional kollektivtrafik, elnät eller älvens reglering.

Copernicus GLO-30 är en ytmodell med omkring 30 meters upplösning. Den beskriver inte marken, kajerna, byggnaderna eller vattennivåerna med den precision som behövs för projektering. Modellen innehåller ingen hydrologisk översvämningsberäkning eller geoteknisk skredanalys. Varken skyfallsreglaget eller den visuella älven får användas som karta över säker eller osäker mark.

## Redigera och återskapa

Författad kod och text ligger i denna `vision/`-katalog. Börja med `config.js` för plats och visning, `model.js` för beräkningar, `levers.js` för reglage, `indicators.js` för mått och `presets.js` för scenarier. Berättelser och användartexter ligger bland annat i `family.js`, `decisions.js`, `people.js`, `vision-text.js` och översättningsfilerna under `en/`.

Källposter redigeras i `research/deep/`, med svensk och engelsk version samt metodanteckningar. `research/story.json` innehåller platsens utgångspunkter och `research/evidence.json` redovisar modellantaganden. Återskapa den sammanställda källsamlingen med:

```sh
python3.12 sustainable.py research trollhattan merge
```

Ändra inte den genererade `research/baseline.json` för hand. Detsamma gäller stadsmodellens `city.json`, `city.blend`, `build/` och `pack/`. Geografiska ändringar ska göras i avsedda källor, exempelvis `overrides.json` och eventuella skript i `custom/`, och sedan byggas om genom pipelinen. Bevara källhänvisningarna till OpenStreetMap och Copernicus.

## Lokala rättningar i byggkedjan

`pipeline/fetch_osm.py` kan komplettera ofullständiga multipolygoner via OpenStreetMaps endpoint för hela relationer när Overpass inte har levererat full geometri. En ofullständig nodkedja ska inte omvandlas till en till synes komplett polygon. Misslyckad komplettering ger en varning som behöver följas upp.

`pipeline/blender/render_splash.py` identifierar materialets utgångsnod efter nodtyp och skapar den vid behov. Dimvolymen är därmed inte beroende av att standardnoderna har vissa namn eller redan finns i Blender. Återställ inte detta till hårdkodade uppslag av `Principled BSDF` och `Material Output`.

## Kontroller vid fortsatt arbete

Kör relevanta kontroller efter ändringar: platsens källkontroll, modelltester och vid ändringar i motorn även Kalmars referenstest. Granska webbplatsen visuellt när visning eller geometri ändras. Kontrollera en färdigrenderad films längd och bild separat innan den levereras. Aktuell test- och filmstatus ska rapporteras utifrån verkliga körningar, inte härledas ur denna instruktion.

## Svensk berättarröst

Gemini 2.5 Flash Preview TTS, rösten Zephyr, genererades i Google AI Studio den 12 oktober 2026 utan att koppla en API-nyckel eller aktivera fakturering. Originalklipp, manus och tidsplacering finns i `narration/`. Efter filmrendering och film-web körs `python3 cities/trollhattan/vision/narration/mix.py` från projektroten. Skriptet lägger rösten i den svenska MP4-filen och uppdaterar svensk textning. Engelska filmen påverkas inte.

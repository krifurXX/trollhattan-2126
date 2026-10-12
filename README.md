# Trollhättan 2126

En lokal, interaktiv modell för att utforska Trollhättans möjliga utveckling 2026–2126. Byggd från [Sustainable Builder](https://github.com/fltman/sustainable-builder) av Anders Bjarby.

## Innehåll

- En förenklad 3D-modell av centrum, 1,6 × 1,6 kilometer och 858 byggnadsvolymer.
- 168 källposter, tolv reglage och tre framtidsscenarier.
- Svenska och engelska, diagram, dilemman och den fiktiva familjen Berg.
- Två filmer på 90 sekunder. Den svenska filmen har berättarröst från Gemini TTS.

## Starta

Använd Python 3.12 och Node.js 20 eller senare. Kör från projektets rot:

```sh
python3.12 sustainable.py site trollhattan
```

Öppna adressen som kommandot visar. Det färdiga kartpaketet ingår. Blender behövs när stadsgeometrin ska byggas om.

## Filer

- `cities/trollhattan/vision/`: modell, reglage, texter, scenarier och källor.
- `cities/trollhattan/pack/`: färdiga kartdelar och filmer.
- `cities/trollhattan/pack/film/trollhattan-2126.mp4`: svensk film med berättarröst.
- `cities/trollhattan/pack/film/trollhattan-2126-en.mp4`: engelsk film.
- `cities/trollhattan/vision/narration/`: röstklipp, manus och skript för ljudläggning.
- `cities/trollhattan/vision/README.md`: metod, begränsningar och vidareutveckling.
- `README-sustainable-builder.md`: originalprojektets dokumentation.

## Begränsningar

Modellen är ett underlag för samtal, inte en kommunal prognos. Framtida effekter är scenarioantaganden. Kartan visar centrum, medan de flesta statistiska värden gäller hela kommunen. Ingen beräkning av översvämningar eller skredrisker ingår.

## Ursprung och licenser

Programvarans MIT-licens finns i `LICENSE`. Kartdata kommer från OpenStreetMap (ODbL). Höjddata kommer från Copernicus GLO-30. Behåll källhänvisningarna. Se `THIRD_PARTY.md` för separata villkor för medföljande tillgångar.

Detta arkiv är en fristående projektkopia. Ingen webbpublicering ingår.

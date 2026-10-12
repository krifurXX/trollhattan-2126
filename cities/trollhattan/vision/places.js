import { LANG, L } from '@engine/i18n.js';
// OSM anchors documented in research/deep/plats-natur-notes.md. Futures are proposals.
export const PLACES=[
  {
    "id": "torget",
    "name": "Drottningtorget",
    "x": -113,
    "z": -67,
    "kind": "torg",
    "now": "Drottningtorget är en mötesplats i centrum.",
    "future": "Scenario: fler sittplatser, skugga och ytor för torghandel prövas med plats för tillgängliga resor.",
    "lever": "centrum"
  },
  {
    "id": "hogskolan",
    "name": "Högskolan Väst",
    "x": 96,
    "z": 7,
    "kind": "kunskap",
    "now": "Högskolan Västs campus ligger nära stadskärnan.",
    "future": "Scenario: campus och stadens arbetsplatser samverkar mer kring vidareutbildning och omställning.",
    "lever": "larande",
    "school": true,
    "work": true
  },
  {
    "id": "biblioteket",
    "name": "Trollhättans Stadsbibliotek",
    "x": 56,
    "z": -386,
    "kind": "kunskap",
    "now": "Stadsbiblioteket är en offentlig mötesplats för läsning och kunskap.",
    "future": "Scenario: biblioteket används för öppna samtal där invånare granskar underlag till stadens beslut.",
    "lever": "delaktighet",
    "library": true
  },
  {
    "id": "folkets_hus",
    "name": "Folkets hus",
    "x": 11,
    "z": -384,
    "kind": "kultur",
    "now": "Folkets hus ligger i stadskärnan.",
    "future": "Scenario: fler föreningar delar lokaler och ordnar aktiviteter som knyter samman stadsdelarna.",
    "lever": "stadsdelar"
  },
  {
    "id": "stadshuset",
    "name": "Trollhättans Stadshus",
    "x": 75,
    "z": 162,
    "kind": "demokrati",
    "now": "Stadshuset är en plats för kommunens verksamhet.",
    "future": "Scenario: invånare deltar i återkommande prioriteringar och får följa hur förslagen genomförs.",
    "lever": "delaktighet",
    "work": true
  },
  {
    "id": "resecentrum",
    "name": "Trollhättan resecentrum",
    "x": 497,
    "z": -447,
    "kind": "rorlighet",
    "now": "Resecentrum knyter samman järnväg och lokala resor.",
    "future": "Scenario: sammanhängande gång- och cykelvägar samt bättre byten gör fler resor möjliga utan egen bil.",
    "lever": "resor"
  },
  {
    "id": "spikon",
    "name": "Spikön",
    "x": -317,
    "z": -512,
    "kind": "natur",
    "now": "Spikön ligger i älven nära centrum och rymmer rekreation.",
    "future": "Scenario: befintliga natur- och vistelsevärden vårdas med tydliga gångstråk. Vattenmiljön behöver utredas separat.",
    "lever": "alvnatur"
  },
  {
    "id": "skrotnisse",
    "name": "Skrotnisses lekplats",
    "x": -241,
    "z": -614,
    "kind": "lek",
    "now": "Skrotnisses lekplats ligger på Spikön.",
    "future": "Scenario: skuggade viloplatser gör det lättare för flera generationer att besöka lekmiljön tillsammans.",
    "lever": "omsorg"
  },
  {
    "id": "hamnkontoret",
    "name": "Hamnkontoret",
    "x": -293,
    "z": -350,
    "kind": "kulturarv",
    "now": "Hamnkontoret ligger vid Strandgatan.",
    "future": "Scenario: varsam renovering och återbruk prövas före rivning och nybyggnad.",
    "lever": "hus"
  },
  {
    "id": "karl_johan",
    "name": "Karl Johans Torg",
    "x": -311,
    "z": -111,
    "kind": "torg",
    "now": "Karl Johans torg ligger nära kanalpassagen.",
    "future": "Scenario: lugna gångytor och platser att stanna på stärker sambandet mellan centrum och älven.",
    "lever": "centrum"
  },
  {
    "id": "kanaltorget",
    "name": "Kanaltorget",
    "x": -46,
    "z": -702,
    "kind": "torg",
    "now": "Kanaltorget ligger vid den norra delen av centrum.",
    "future": "Scenario: tillgängliga gångstråk och mer skugga binder samman torget med vardagens målpunkter.",
    "lever": "centrum"
  },
  {
    "id": "kyrkan",
    "name": "Trollhättans kyrka",
    "x": -681,
    "z": 422,
    "kind": "kulturarv",
    "now": "Trollhättans kyrka ligger vid fallområdet.",
    "future": "Kyrkan och dess omgivning bevaras i scenariot."
  },
  {
    "id": "oskar",
    "name": "Oskarsbron",
    "x": -713,
    "z": 324,
    "kind": "kulturarv",
    "now": "Oskarsbron ger en passage vid fallområdet.",
    "future": "Brons historiska sammanhang bevaras i scenariot."
  },
  {
    "id": "stromkarl",
    "name": "Strömkarlsbron",
    "x": -556,
    "z": -120,
    "kind": "kulturarv",
    "now": "Strömkarlsbron är en del av fallmiljön.",
    "future": "Fallmiljön bevaras. Modellen beräknar inte brokonstruktion eller älvens reglering."
  },
  {
    "id": "klaffbron",
    "name": "Klaffbron",
    "x": -439,
    "z": -157,
    "kind": "rorlighet",
    "now": "Klaffbron binder samman centrum och älvens västra sida.",
    "future": "Scenario: tryggare anslutningar för gående och cyklister prövas utan att lova en ny bro.",
    "lever": "resor"
  },
  {
    "id": "maria_park",
    "name": "Maria Alberts Park",
    "x": 125,
    "z": -105,
    "kind": "natur",
    "now": "Maria Alberts park är en grönyta nära campus.",
    "future": "Scenario: träd och genomsläpplig mark får mer omsorg. Verkliga dagvattenåtgärder kräver lokal projektering.",
    "lever": "skyfall"
  },
  {
    "id": "dahlof",
    "name": "Dahlöfs park",
    "x": -17,
    "z": 219,
    "kind": "natur",
    "now": "Dahlöfs park ligger i den södra delen av centrum.",
    "future": "Scenario: viloplatser, skugga och tillgängliga promenadvägar stödjer vardagsrörelse.",
    "lever": "omsorg"
  },
  {
    "id": "betty",
    "name": "Betty Backs Park",
    "x": -43,
    "z": -447,
    "kind": "natur",
    "now": "Betty Backs park är en mindre park i stadskärnan.",
    "future": "Scenario: befintliga träd vårdas och kopplingen till närliggande grönytor stärks.",
    "lever": "alvnatur"
  }
];
if(LANG==='en') for(const p of PLACES){p.name=L(p.name);p.now=L(p.now);p.future=L(p.future);}

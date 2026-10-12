// Trollhättan: names, where things are in the 3D model (metres, x east, z south, the centre of place.json at
// the origin: 58.2827931 N, 12.2908612 E) and what the site says about itself. Written by
// tools/init-vision.mjs – check every field; the examples (Kalmar, Rättvik, Venice) show what each one does.
export const CITY={
  slug:"trollhattan",
  sv:{name:"Trollhättan",genitive:"Trollhättans",kommun:"Trollhättans kommun",kommunGenitive:"Trollhättans kommuns",region:"Västra Götalands län",country:'Sverige',
    centre:"Trollhättans centrum",onCentre:"i Trollhättans centrum",centreGenitive:"Trollhättans centrums",tagline:'Ett sekel av vägval vid Göta älv',waters:'Göta älv',
    model:"Trollhättan",modelOf:"en 3D-modell av Trollhättan byggd ur OpenStreetMap",rise:"högvattnet står {m} m högre år 2126"},
  en:{name:"Trollhättan",genitive:"Trollhättan's",kommun:"Trollhättan Municipality",kommunGenitive:"Trollhättan Municipality's",region:"Västra Götalands län",country:'Sweden',
    centre:"central Trollhättan",onCentre:"in central Trollhättan",centreGenitive:"central Trollhättan's",tagline:'A century ahead – a sustainable vision',waters:'Göta älv',
    model:"Trollhättan",modelOf:"a 3D model of Trollhättan built from OpenStreetMap",rise:"the high water is {m} m higher by 2126"},
  title:"TROLLHÄTTAN 2126",
  url:"./",
  meta:{pageTitle:"Trollhättan 2126",description:"Utforska Trollhättan 2026–2126 med lokala fakta och öppna scenarioantaganden. Explore a century of choices using local facts and explicit assumptions.",
    ogTitle:"Trollhättan 2126 – ett sekel framåt",ogDescription:"Välj Trollhättans väg de kommande hundra åren. Choose Trollhättan's path for the next hundred years.",ogImageAlt:"Trollhättan år 2126."},
  hotDaysToday:null,   // TODO research: days above 25 °C a year today (SMHI)
  lat:58.2827931,lon:12.2908612,
  // The model's water surface (y) and the real level it stands for (m RH 2000) – the main water in the elevation model.
  water:{y:-1.2,level:38.3175,kind:"river"},   // TODO: 'sea' or 'lake'
  camera:{position:[462,521,521],target:[0,0,0],home:{distance:840,polar:.9,azimuth:.7},bounds:{minX:-800,maxX:800,minZ:-800,maxZ:800},maxDistance:1760},
  planRect:{minX:-830,minZ:-830,maxX:830,maxZ:830},
  heritage:[{"x":-81,"z":113,"r":29},{"x":-681,"z":423,"r":23},{"x":-220,"z":54,"r":22},{"x":796,"z":-530,"r":15},{"x":-232,"z":-412,"r":15}],   // the map's churches; add other protected landmarks
  squares:[{x:-113,z:-67,r:32}],   // TODO: the main square(s) {x,z,r}
  station:{x:456,z:-522},
  floodWall:false,
  boats:{},   // TODO when the place has open water: ferries {a,b} and loops [[x,z]…] on the water
  hide:/^M_Container/,
  tintMask:true,
  materialAlias:{M_Ground_Ground:'M_Ground_Grass'},
  rideSkip:/^$/,
  alwaysPinned:[],
  credits:{
    about:{sv:'Stadsmodellen är byggd med sustainable-builder ur OpenStreetMap (kartdata © OpenStreetMap contributors, ODbL) och Terrain: Copernicus DEM GLO-30 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018, provided under COPERNICUS by the European Union and ESA.',
      en:'The town model is built with sustainable-builder from OpenStreetMap (map data © OpenStreetMap contributors, ODbL) and Terrain: Copernicus DEM GLO-30 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018, provided under COPERNICUS by the European Union and ESA.'},
    short:{sv:'Kartdata © OpenStreetMap-bidragsgivare',en:'Map data © OpenStreetMap contributors'},
  },
  film:null,
  sources:{sv:'SCB, Kolada och Trollhättans kommun',en:'Statistics Sweden, Kolada and Trollhättan Municipality'},
};

CITY.langs=['sv','en'];
CITY.sv.intro='Hur vill du forma Trollhättan vid Göta älv? Lokala fakta möter öppna scenarioantaganden för 2026–2126.';
CITY.en.intro='How would you shape Trollhättan on Göta älv? Local facts meet explicit scenario assumptions for 2026–2126.';
CITY.sv.rise='Älvens reglerade vattennivå modelleras inte som havsnivåhöjning';
CITY.en.rise='The regulated river is not modelled as a rising sea';
CITY.sv.crises='värme, skyfall och störningar i arbete och försörjning';
CITY.en.crises='heat, heavy rain and disruptions to work and essential services';
CITY.housingFloors=[3,5];

CITY.modelAssumptions=true;

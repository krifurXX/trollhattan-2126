// Ninety-second overview. Swedish Gemini narration is applied by narration/mix.py after export.
// Scenario effects are assumptions; camera paths stay well above the model's terrain.
const shot=(d,preset,year,cam,target,t,s,en)=>({d,preset,year,hour:14,cam,target,y:'year',t,s,en,amb:{}});
export const SCENES=[
  shot(12,'dagens',[2026,2026],[[460,520,520],[410,495,565]],[[0,15,0],[0,15,0]],
    'Trollhättan idag','En förenklad stadsmodell med lokala data och öppna kartor.',
    {t:'Trollhättan today',s:'A simplified city model with local data and open maps.'}),
  shot(12,'dagens',[2026,2026],[[410,495,565],[300,520,630]],[[0,15,0],[-60,15,20]],
    'Älven, industrin och vardagen','Göta älvs fall, stadens arbetsplatser och människors liv hör samman.',
    {t:'The river, industry and daily life',s:'The river falls, the city’s workplaces and everyday lives are connected.'}),
  shot(15,'alvstaden',[2026,2126],[[300,520,630],[210,550,670]],[[-60,15,20],[-60,15,20]],
    'Älvstaden','Pröva mer grönska, resor utan egen bil och beredskap för regn och värme.',
    {t:'The river city',s:'Explore greenery, alternatives to private cars and preparation for rain and heat.'}),
  shot(13,'industristaden',[2126,2126],[[210,550,670],[95,570,700]],[[-60,15,20],[0,15,0]],
    'Industristaden','Kompetens, återbruk och industrisamarbete. Effekterna är scenarioantaganden.',
    {t:'The industrial city',s:'Skills, reuse and industrial collaboration. Effects are scenario assumptions.'}),
  shot(13,'nara',[2126,2126],[[95,570,700],[-30,560,705]],[[0,15,0],[0,15,0]],
    'Den nära staden','Mötesplatser, omsorg och stadsdelar där fler kan delta.',
    {t:'The neighbourhood city',s:'Meeting places, care and neighbourhoods where more people can participate.'}),
  shot(13,'alvstaden',[2126,2126],[[-30,560,705],[-145,560,680]],[[0,15,0],[0,15,0]],
    'Vägval med osäkerhet','En utforskande modell, inte en prognos eller en beräkning av skred och vattennivåer.',
    {t:'Choices under uncertainty',s:'An exploratory model, not a forecast or a landslide and water-level calculation.'}),
  {...shot(12,'alvstaden',[2126,2126],[[-145,560,680],[-210,580,690]],[[0,15,0],[0,15,0]],'','',{t:'',s:''}),
    y:'',endCard:{title:[.5,2],q:[2.5,4],black:[7,9],out:[10.5,12]}},
];
export const END_CARD={
  poster:73,
  sv:{sub:'Ett sekel av möjliga vägval',q:'Vilket Trollhättan vill du bygga?',
    small:'Lokala källor och tydliga antaganden · Kartdata © OpenStreetMap contributors, ODbL · Sustainable Builder: Anders Bjarby, MIT'},
  en:{sub:'A century of possible choices',q:'Which Trollhättan do you want to build?',
    small:'Local sources and explicit assumptions · Map data © OpenStreetMap contributors, ODbL · Sustainable Builder: Anders Bjarby, MIT'},
};
// THIRD_PARTY.md does not confirm redistribution rights for the bundled generated audio.
export const MUSIC={enabled:false,start:0};
export const LINES={};
export const SPOKEN={sv:{},en:{}};

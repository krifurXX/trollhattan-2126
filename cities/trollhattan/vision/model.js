// A transparent exploratory model, not a municipal forecast or hydraulic model.
export const BASE={pop:59265,ghg:2.079,unemployment:.07062,education:.72109,trust:.709,selfHealth:.725,overcrowding:.16072,waste:377,recycling:.46,elUsePerCap:8.108,solarMW:22.17,protectedNature:.01338,preparedness:.35,heatExposure:1};
export const FACTS={pop:'befolkning_total',ghg:'vaxthusgaser_per_inv',unemployment:'arbetsloshet_20_64',education:'gymnasieexamen_4ar',trust:'avsaknad_tillit',selfHealth:'sjalvskattad_god_halsa',overcrowding:'trangboddhet_norm2',waste:'kommunalt_avfall_kg_per_inv',recycling:'materialatervinning_andel',elUsePerCap:'elanvandning_per_inv',solarMW:'solceller_installerad_effekt',protectedNature:'skyddad_natur_total'};
export const BASE_UNCERTAIN=['preparedness'];
export const PARAMS={};
export const FLOOD=null;
export const SYSTEM_SPREAD={pace:[.75,1.33],reach:[.8,1.2],stress:[.75,1.25],population:[.65,1.35],trend:[.6,1.4],effect:[.65,1.35]};
export const VARY={population:1,trend:1,effect:1};
export const BAND_CHECK=['ghg'];
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
export function init(B){return {...B,shock:0};}
export function capacity(s){return 7+4*clamp((s.trust-.5)/.4);}
export function step(c){
 const {s,I,B,V,held,t,year,stress,capacity,demand,strain,events}=c;
 if(held)return {...B,capacity,demand,strain};
 const e=V.effect,lag=(k,v,tau=12)=>{s[k]+=(v-s[k])*(1-Math.exp(-1/tau));};
 // The published projection is 59,328 (2026), 60,930 (2030), 62,430 (2035).
 // 2026 displays the latest observed baseline (2025); subsequent points interpolate the projection.
 const official=year<=2030?59328+(60930-59328)*(year-2026)/4:60930+(62430-60930)*Math.min(5,year-2030)/5;
 // Beyond 2035, constant population is the neutral scenario, not an extrapolated official forecast.
 const after=Math.max(0,year-2035);
 s.pop=official*(1+after*.00055*(V.population-1));
 lag('education',clamp(B.education+e*(.14*I.larande+.035*I.stadsdelar)-.025*stress,.3,.98));
 lag('unemployment',clamp(B.unemployment-e*(.018*I.larande+.012*I.industrikretslopp+.007*I.stadsdelar)+s.shock,.02,.25));
 lag('trust',clamp(B.trust+e*(.11*I.delaktighet+.065*I.stadsdelar)-.035*stress-.012*Math.max(0,strain-1),.25,.95));
 lag('selfHealth',clamp(B.selfHealth+e*(.09*I.omsorg+.035*I.resor+.025*I.stadsdelar)-.035*stress,.4,.93));
 lag('overcrowding',clamp(B.overcrowding*(1-e*(.48*I.stadsdelar+.15*I.hus)),.035,.35),18);
 lag('waste',B.waste*(1-e*(.23*I.industrikretslopp+.12*I.hus)),14);
 lag('recycling',clamp(B.recycling+e*(.25*I.industrikretslopp+.09*I.hus),0,.9));
 // Efficiency reduces demand; industrial electrification adds demand. Hydro output is not municipal policy.
 lag('elUsePerCap',B.elUsePerCap*(1-e*.22*I.hus+e*.12*I.industrikretslopp),16);
 lag('solarMW',B.solarMW+95*I.takenergi*e,15);
 lag('protectedNature',clamp(B.protectedNature+.045*I.alvnatur*e,0,.15),22);
 lag('preparedness',clamp(B.preparedness+e*(.36*I.reservvatten+.20*I.skyfall)-.12*stress,.05,.98),14);
 lag('heatExposure',Math.max(.2,(1+.55*stress)*(1-e*(.24*I.skyfall+.18*I.centrum+.10*I.alvnatur))),12);
 // Territorial emissions, not a consumption footprint. Transport dominates the observed inventory.
 const trend=Math.exp(-Math.min(t,35)*.009*V.trend);
 lag('ghg',Math.max(.2,B.ghg*trend*(1-e*(.38*I.resor+.12*I.centrum+.09*I.hus+.05*I.industrikretslopp))),14);
 events({s,I,year,stress});s.shock*=.78;
 return {pop:s.pop,ghg:s.ghg,unemployment:s.unemployment,education:s.education,trust:s.trust,selfHealth:s.selfHealth,overcrowding:s.overcrowding,waste:s.waste,recycling:s.recycling,elUsePerCap:s.elUsePerCap,solarMW:s.solarMW,protectedNature:s.protectedNature,preparedness:s.preparedness,heatExposure:s.heatExposure,capacity,demand,strain};
}
export function vision(d,I){return {roofCover:.35*I.takenergi+.1*I.hus,greenRatio:.2+.35*I.skyfall,depave:.42*I.centrum,verge:.6*I.skyfall,maturity:.35+.6*I.alvnatur,gardens:.25*I.stadsdelar,shade:.7*I.centrum,cars:1-.5*I.resor-.18*I.centrum,bikes:.5+1.5*I.resor,people:1+.45*I.centrum,ev:.08751+.75*I.resor};}
// Only the goals actually represented by local indicators receive model parts; others remain neutral.
export const SDG_PARTS={1:[['unemployment',.12,.03]],3:[['selfHealth',.6,.9]],4:[['education',.6,.95]],6:[['preparedness',.15,.9]],7:[['solarMW',10,120]],8:[['unemployment',.12,.03]],9:[['recycling',.35,.8]],10:[['overcrowding',.25,.05]],11:[['heatExposure',1.5,.45],['overcrowding',.25,.05]],12:[['waste',450,230],['recycling',.35,.8]],13:[['ghg',2.8,.4]],15:[['protectedNature',0,.07]],16:[['trust',.5,.9]],17:[['education',.6,.95],['trust',.5,.9]]};
export function doughnut(d){return {social:{health:clamp((.9-d.selfHealth)/.3),education:clamp((.95-d.education)/.35),income:clamp(d.unemployment/.12),voice:clamp((.9-d.trust)/.4),housing:clamp(d.overcrowding/.25),water:1-d.preparedness},ecological:{climate:Math.max(0,d.ghg/.4-1),land:clamp((.07-d.protectedNature)/.07),biodiversity:clamp((.07-d.protectedNature)/.07)}};}
export const EXPECT=[{lever:'resor',ind:'ghg',delta:-.25},{lever:'larande',ind:'education',delta:.06},{lever:'reservvatten',ind:'preparedness',delta:.15},{lever:'alvnatur',ind:'protectedNature',delta:.015},{lever:'industrikretslopp',ind:'waste',delta:-35}];
export const VALIDATION={minimumVisionGain:5};

// Explicit optional exports preserve the engine fallback behaviour.
export const P=PARAMS;
export const SPREAD={};
export const residents=()=>({});

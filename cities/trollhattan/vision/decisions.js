import { t } from '@engine/i18n.js';
// Every future situation is a fictional decision exercise. Source records describe today's evidence,
// not the eventual outcome or the effect size of a proposed policy.
const text=p=>t(p[0],p[1]);
const themes={
  larande:{ev:['base:hv_helarsstudenter'],options:[
    [['Behåll dagens insatser','Maintain current provision'],['Fortsätt befintliga samarbeten och prioritera att de fungerar.','Continue existing partnerships and prioritise their operation.'],0],
    [['Utbildningsvägar nära jobbet','Learning alongside work'],['Samordna fortbildning med arbetsgivare och utbildningsanordnare.','Coordinate continuing education with employers and education providers.'],2],
    [['Bred omställningssatsning','A broad skills transition'],['Ge fler tid och stöd att utbilda sig. Insatsen kräver handledare och samarbete.','Give more people time and support to study. This requires mentors and cooperation.'],3]]},
  industrikretslopp:{ev:['base:gkn_additiv_investering','base:gkn_titan_besparing'],options:[
    [['Följ företagens egna initiativ','Follow company initiatives'],['Kommunen prioriterar löpande företagsservice.','The municipality prioritises routine business support.'],0],
    [['Gemensamma testmiljöer','Shared test facilities'],['Stöd samverkan kring återtillverkning och materialspårning.','Support collaboration on remanufacturing and material tracking.'],2],
    [['Skala upp samverkan','Scale up collaboration'],['Samordna testmiljöer, kompetens och upphandling; företagen fattar sina egna investeringsbeslut.','Coordinate test facilities, skills and procurement; companies retain their investment decisions.'],3]]},
  stadsdelar:{ev:[],options:[
    [['Underhåll först','Maintenance first'],['Prioritera det befintliga bostadsbeståndets löpande behov.','Prioritise routine needs of existing housing.'],1],
    [['Bostäder och mötesplatser','Homes and meeting places'],['Planera tillgängliga bostäder och gemensamma lokaler tillsammans.','Plan accessible housing and shared spaces together.'],2],
    [['Samlad stadsdelssatsning','A coordinated neighbourhood programme'],['Fördela resurser till boendemiljö, service och inflytande. Det kräver uthållig drift.','Allocate resources to housing, services and participation. This requires sustained operation.'],3]]},
  omsorg:{ev:['base:aldre_80_2035'],options:[
    [['Löpande anpassning','Incremental adaptation'],['Anpassa stödet när behov uppstår.','Adapt support as needs arise.'],1],
    [['Tillgänglig vardag','Accessible everyday life'],['Samordna bostadsanpassning, närservice och omsorg.','Coordinate home adaptation, local services and care.'],2],
    [['Förebygg tillsammans','Joint preventive action'],['Satsa på personal, tillgänglighet och sociala möten. Avsätt resurser också till uppföljning.','Invest in staff, accessibility and social contact. Reserve resources for evaluation.'],3]]},
  centrum:{ev:[],options:[
    [['Små förbättringar','Small improvements'],['Behåll huvudinriktningen och åtgärda brister.','Retain the current approach and address deficiencies.'],1],
    [['Fler vardagsärenden','More everyday destinations'],['Gör plats för service, återbruk och vistelse.','Make room for services, reuse and spending time.'],2],
    [['Omvandla med verksamheterna','Transform with local businesses'],['Samordna lokaler och gaturum med tillgängliga leveranser och drift.','Coordinate premises and streets with accessible deliveries and operation.'],3]]},
  resor:{ev:[],options:[
    [['Punktinsatser','Targeted improvements'],['Förbättra enskilda hållplatser och korsningar.','Improve individual stops and crossings.'],1],
    [['Sammanhängande reskedjor','Connected journeys'],['Knyt ihop gång, cykel och kollektivtrafik tillsammans med regionen.','Connect walking, cycling and public transport with the region.'],2],
    [['Prioritera om gaturummet','Reallocate street space'],['Ge mer plats åt hållbara resor, med lösningar för leveranser och personer som behöver bil.','Provide more space for sustainable travel, including delivery access and people who need cars.'],3]]},
  hus:{ev:[],options:[
    [['Underhåll enligt plan','Maintain as planned'],['Fortsätt det planerade underhållet.','Continue planned maintenance.'],1],
    [['Renovera samordnat','Coordinate renovation'],['Samordna energiarbete med underhåll och boendes behov.','Coordinate energy improvements with maintenance and residents’ needs.'],2],
    [['Omfattande upprustning','Extensive refurbishment'],['Genomför mer samtidigt, med uppföljning av kostnader och boendes möjlighet att bo kvar.','Do more at once, monitoring costs and residents’ ability to remain.'],3]]},
  takenergi:{ev:[],options:[
    [['Pröva enstaka tak','Assess individual roofs'],['Utred lämplighet i samband med underhåll.','Assess suitability during maintenance.'],1],
    [['Samordna lämpliga tak','Coordinate suitable roofs'],['Pröva bärighet, kulturvärden och nätanslutning före investering.','Check structural capacity, heritage and grid connection before investment.'],2],
    [['Tak och effektstyrning','Roofs and demand management'],['Samordna lokal elproduktion med förbrukning och lagring där det är lämpligt.','Coordinate local generation with consumption and storage where suitable.'],3]]},
  alvnatur:{ev:[],options:[
    [['Sköt befintliga grönytor','Maintain existing green spaces'],['Prioritera skötsel och säker tillgång.','Prioritise maintenance and safe access.'],1],
    [['Bind ihop grönskan','Connect green spaces'],['Utveckla skugga och livsmiljöer där mark och naturvärden tillåter.','Develop shade and habitats where land and ecological values permit.'],2],
    [['Långsiktig naturvård','Long-term ecological care'],['Samordna skydd, skötsel och tillgänglighet; känsliga miljöer behöver ibland färre besökare.','Coordinate protection, maintenance and access; sensitive habitats may need fewer visitors.'],3]]},
  skyfall:{ev:[],options:[
    [['Åtgärda kända brister','Address known deficiencies'],['Prioritera löpande underhåll av avrinning.','Prioritise maintenance of drainage.'],1],
    [['Ge regnet utrymme','Make room for rainfall'],['Pröva fördröjning, säkra rinnvägar och skydd av viktiga lokaler.','Assess retention, safe flow paths and protection of essential premises.'],2],
    [['Samordnad skyfallsplan','Coordinated rainfall resilience'],['Planera mark och ledningar tillsammans; lokala analyser avgör var åtgärder fungerar.','Plan land and drainage together; local analysis determines suitable measures.'],3]]},
  reservvatten:{ev:[],options:[
    [['Underhåll beredskapen','Maintain preparedness'],['Fortsätt befintliga rutiner och kontrollera ansvar.','Continue existing procedures and verify responsibilities.'],1],
    [['Öva försörjningen','Practise water provision'],['Öva distribution och stöd till verksamheter och invånare.','Practise distribution and support for services and residents.'],2],
    [['Stärk redundansen','Strengthen redundancy'],['Utred reservlösningar, säkra drift och öva längre avbrott.','Assess backup solutions, secure operation and exercise prolonged outages.'],3]]},
  delaktighet:{ev:[],options:[
    [['Ordinarie dialog','Existing consultation'],['Använd befintliga former för samråd.','Use established consultation procedures.'],1],
    [['Dialog med återkoppling','Consultation with feedback'],['Visa vilka förslag som påverkat beslut och varför andra valts bort.','Show which proposals influenced decisions and why others were rejected.'],2],
    [['Breddat inflytande','Broader participation'],['Nå grupper som sällan deltar och ge dem stöd att granska alternativen. Folkvalda behåller ansvaret.','Reach seldom-heard groups and support assessment of alternatives. Elected representatives retain responsibility.'],3]]},
};
const rows={
  2026:[
    ['larande','Utbildning mitt i industristaden','Learning in an industrial city','Högskolan Väst redovisar 5 640 helårsstudenter 2025. Det avser hela lärosätet, även distans. Hur ska lokala utbildningsvägar utvecklas?','University West reports 5,640 full-time equivalent students in 2025, including distance learning. How should local pathways develop?'],
    ['omsorg','Planera för fler äldre','Planning for more older residents','Kommunens prognos anger 4 533 invånare i gruppen 80–100 år 2035. Prognosen är ett planeringsunderlag. Vilken förberedelse prioriterar du?','The municipal projection gives 4,533 residents aged 80–100 in 2035. It is a planning basis. Which preparation do you prioritise?'],
    ['industrikretslopp','Från test till användning','From testing to use','GKN:s investering och Innovatums verksamhet ger lokala exempel på additiv tillverkning. De visar möjligheter, men bevisar inte effekter för hela kommunen.','GKN’s investment and Innovatum provide local examples of additive manufacturing. They show possibilities, not proven effects for the entire municipality.']],
  2036:[
    ['resor','Vardagsresan hänger ihop','Connecting the everyday journey','Scenario: resenärer efterfrågar bättre byten och säkrare sista sträckor till jobbet. Vilken omfattning väljer du?','Scenario: travellers seek better connections and safer final journeys to work. What scale do you choose?'],
    ['stadsdelar','Vem får plats i bostadsområdet?','Who has a place in the neighbourhood?','Scenario: en områdesplan ska förena bostäder, service och mötesplatser. Resurserna räcker inte till allt samtidigt.','Scenario: a neighbourhood plan must combine homes, services and meeting places. Resources cannot cover everything at once.'],
    ['skyfall','Regnet och gaturummet','Rainfall and street space','Scenario: vid en gatuombyggnad behöver kommunen välja hur mycket utrymme regnvattnet ska få. Det är ingen prognos om en viss översvämning.','Scenario: street reconstruction requires a decision about space for rainwater. This does not predict a particular flood.']],
  2046:[
    ['hus','Renovera utan att förlora grannarna','Renovating while retaining neighbours','Scenario: flera hus behöver underhåll samtidigt. Hur förenar du energiåtgärder med boendes villkor?','Scenario: several buildings need maintenance together. How do you combine energy measures with residents’ needs?'],
    ['larande','Ny teknik, nya kunskapsbehov','New technology, new skills','Scenario: arbetsuppgifter förändras. Företag, lärosäte och vuxenutbildning diskuterar hur yrkesverksamma kan fortsätta lära.','Scenario: tasks change. Employers, the university and adult education discuss continuing learning.'],
    ['alvnatur','Skugga på vägen till älven','Shade on the way to the river','Scenario: ett stråk behöver både skötsel och bättre skugga. Naturvärden och tillgänglighet måste bedömas tillsammans.','Scenario: a route needs maintenance and better shade. Ecology and accessibility must be assessed together.']],
  2056:[
    ['takenergi','När taken ändå ska läggas om','When roofs need replacing','Scenario: fastighetsägare vill samordna takunderhåll och lokal el. Alla tak är inte lämpliga.','Scenario: owners want to coordinate roof maintenance and local electricity. Not every roof is suitable.'],
    ['delaktighet','Vilka hörs i planeringen?','Who is heard in planning?','Scenario: många svarar på en enkät, men några grupper saknas. Hur utformas nästa dialog?','Scenario: many answer a survey, but some groups are absent. How should the next consultation work?'],
    ['reservvatten','Övningen som kostar tid','The exercise that takes time','Scenario: en gemensam vattenövning behöver personal och planering. Inget visst avbrott förutsägs.','Scenario: a joint water exercise needs staff and planning. No particular outage is predicted.']],
  2066:[
    ['industrikretslopp','Nästa liv för komponenten','A component’s next life','Scenario: lokala företag vill dela provning och materialinformation. Vem samordnar stödet?','Scenario: local companies want shared testing and material information. Who coordinates support?'],
    ['centrum','Centrum efter arbetsdagen','The centre after work','Scenario: invånare och verksamheter föreslår nya användningar för lokaler och gaturum.','Scenario: residents and businesses propose new uses for premises and streets.'],
    ['omsorg','Nära stöd i vardagen','Support close to home','Scenario: omsorg, service och bostäder behöver planeras tillsammans. Vilken ambitionsnivå kan bäras över tid?','Scenario: care, services and homes need joint planning. What ambition can be sustained?']],
  2076:[
    ['stadsdelar','Förnya med dem som bor där','Renewing with existing residents','Scenario: ett bostadsområde behöver förnyas. De boende har olika ekonomi och behov.','Scenario: a neighbourhood needs renewal. Residents have different resources and needs.'],
    ['resor','Tillgänglighet över hela dagen','Access throughout the day','Scenario: arbetstiderna varierar. Resor måste fungera även när få reser samtidigt.','Scenario: working hours vary. Travel must work even when few people travel together.'],
    ['alvnatur','Vård av äldre träd','Caring for mature trees','Scenario: träd som planterats tidigare behöver skötsel och successiv ersättning.','Scenario: trees planted earlier need care and gradual replacement.']],
  2086:[
    ['hus','Bygga nytt eller ta hand om det gamla?','Build new or care for existing buildings?','Scenario: fastigheter har olika återstående livslängd. Undersökning måste föregå valet av åtgärder.','Scenario: buildings have different remaining lifespans. Investigation must precede intervention.'],
    ['skyfall','Håll skyddet fungerande','Keeping protection functional','Scenario: äldre dagvattenåtgärder kräver skötsel. Investering och underhåll konkurrerar om samma resurser.','Scenario: older drainage measures need maintenance. Investment and upkeep compete for resources.'],
    ['larande','Lärande mellan generationer','Learning across generations','Scenario: erfarenhet från tidigare teknikskiften behöver förenas med nya metoder.','Scenario: experience from earlier technology transitions must be combined with new methods.']],
  2096:[
    ['reservvatten','Beredskap som håller över tid','Preparedness that lasts','Scenario: reservrutiner ska förnyas efter en lång period utan större avbrott.','Scenario: backup procedures need renewal after a long period without major disruption.'],
    ['delaktighet','Granska det tidigare beslutet','Reviewing an earlier decision','Scenario: invånare vill veta om en äldre satsning gav avsedd nytta. Hur görs granskningen tillgänglig?','Scenario: residents want to know whether an earlier programme delivered. How can its review be accessible?'],
    ['takenergi','Ersätta den första anläggningen','Replacing the earlier installation','Scenario: utrustning på taken behöver förnyas. Pröva hela systemet på nytt före investering.','Scenario: rooftop equipment needs renewal. Reassess the whole system before investing.']],
  2106:[
    ['industrikretslopp','Industrins nästa omställning','Industry’s next transition','Scenario: efterfrågan och teknik har förändrats. Befintlig kompetens är en tillgång men räcker inte för alla nya behov.','Scenario: demand and technology have changed. Existing skills are valuable but cannot meet every new need.'],
    ['omsorg','Omsorgens arbetsvillkor','Working conditions in care','Scenario: ett nytt omsorgsprogram måste fungera för både dem som får stöd och dem som arbetar där.','Scenario: a new care programme must work for recipients and staff alike.'],
    ['centrum','Behåll platser för möten','Keeping places to meet','Scenario: gemensamma lokaler behöver en långsiktig driftform. Vem får tillgång och vem tar ansvar?','Scenario: shared spaces need a long-term operating model. Who has access and who takes responsibility?']],
  2116:[
    ['stadsdelar','Nästa generations bostad','Housing for the next generation','Scenario: den kommande generationen har egna önskemål. Hur mycket ska dagens plan låsa fast?','Scenario: the next generation has its own preferences. How much should today’s plan fix in place?'],
    ['alvnatur','Förvalta det som vuxit fram','Caring for what has grown','Scenario: naturmiljöer har utvecklats under seklet. Skötsel och användning behöver omprövas.','Scenario: habitats have evolved during the century. Maintenance and use need reassessment.'],
    ['delaktighet','Lämna över besluten','Handing over decisions','Scenario: de som lever efter 2126 behöver förstå både resultaten och osäkerheten i det ni beslutat.','Scenario: people living after 2126 need to understand results and uncertainties in your decisions.']],
};
export const DECISIONS=Object.fromEntries(Object.entries(rows).map(([year,list])=>[year,list.map(([lever,sv,en,ctx,ctxEn],i)=>({
  id:`${year}_${lever}_${i}`,title:t(sv,en),ctx:t(ctx,ctxEn),ev:themes[lever].ev,
  options:themes[lever].options.map(([label,body,level])=>({label:text(label),text:text(body),set:{[lever]:level},note:t('En scenarioåtgärd. Effekten beror på genomförande, resurser och samverkan.','A scenario intervention. Effects depend on implementation, resources and cooperation.')})),
}))]));
export const JOURNEY_INTRO={sv:'Du följer Trollhättan från 2026 till 2126. Kommunens befolkningsprognos når till 2035. Senare situationer är uttryckligen påhittade beslutsövningar, och modellen visar möjliga samband. Familjen Berg är fiktiv. Du fattar lokala prioriteringar; andra aktörer behåller sina beslut.',en:'Follow Trollhättan from 2026 to 2126. The municipal population projection ends in 2035. Later situations are explicitly fictional decision exercises, and the model explores possible relationships. The Berg family is fictional. You set local priorities; other actors retain their decisions.'};
export function JOURNEY_SUMMARY({d,I}) {
  const pop=Math.round(d.ind.pop).toLocaleString('sv-SE');
  return [t(`Scenariots befolkning 2126: ${pop}. Det är modellens utfall, inte en officiell prognos.`,`Scenario population in 2126: ${pop}. This is a model outcome, not an official forecast.`),
    (I.larande||0)>.5?t('Du har prioriterat utbildningsvägar genom arbetslivet.','You prioritised learning throughout working life.'):t('Utbildningssatsningarna har haft en mer begränsad omfattning.','Education initiatives remained more limited.'),
    (I.delaktighet||0)>.5?t('Breddat inflytande är en del av scenariot. Tillit måste ändå följas upp, inte tas för given.','Broader participation is part of the scenario. Trust must still be evaluated, not assumed.'):t('Frågan om vilka som kommer till tals behöver fortsatt uppmärksamhet.','Who gets heard remains a question for further attention.'),
    t('Jämför resultat, resursbehov och osäkerhet innan du tar nästa beslut.','Compare outcomes, resource needs and uncertainty before the next decision.')];
}

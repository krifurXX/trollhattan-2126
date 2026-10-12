import { t } from '@engine/i18n.js';

// Fictional stress tests, not forecasts. Dates, severities and effect sizes are scenario assumptions.
// No hydraulic levels or slope stability are inferred from these events.
const clamp = value => Math.max(0, Math.min(1, value));
const lever = (I, key) => clamp(I[key] || 0);
const band = (severity, low, medium, high) => severity < .3 ? low : severity < .6 ? medium : high;
const healthLoss = (s, amount) => { s.selfHealth = clamp(s.selfHealth - amount); };
const trustLoss = (s, amount) => { s.trust = clamp(s.trust - amount); };

export const EVENTS = [
  {id:'varme_2034',year:2034,icon:'☀',title:'Scenario: en varm sommar',
    resolve:({I,stress},r) => {
      const severity=clamp((.4+.25*stress+.1*r)*(1-.35*lever(I,'omsorg')-.3*lever(I,'centrum')-.15*lever(I,'skyfall')));
      return {severity,text:band(severity,
        t('Skugga, svala mötesplatser och omsorgens kontaktkedjor begränsar värmens följder.','Shade, cool meeting places and care contact networks limit the effects of heat.'),
        t('Värmen anstränger vardagen. Omsorgen behöver ändra rutiner och fler söker svalka.','Heat strains everyday life. Care services change routines and more residents seek cool places.'),
        t('Flera miljöer saknar svalka. Omsorgen får svårt att nå alla som behöver stöd.','Several places lack cooling. Care services struggle to reach everyone needing support.')),
        apply:s => healthLoss(s,.018*severity)};
    }},
  {id:'vatten_2042',year:2042,icon:'💧',title:'Scenario: avbrott i vattenförsörjningen',
    resolve:({s,I},r) => {
      const severity=clamp((.6+.15*r)*(1-.45*s.preparedness-.3*lever(I,'reservvatten')));
      return {severity,text:band(severity,
        t('Reservrutiner och övad nödvattenutdelning håller viktiga verksamheter igång.','Backup procedures and rehearsed emergency distribution keep essential services running.'),
        t('Ett tekniskt avbrott kräver nödvatten. Information och utdelning når inte alla lika snabbt.','A technical failure requires emergency water. Information and distribution do not reach everyone equally quickly.'),
        t('Avbrottet belastar hushåll och verksamheter. Bristande förberedelser fördröjer hjälpen.','The disruption strains homes and workplaces. Inadequate preparation delays assistance.')),
        apply:state => {trustLoss(state,.018*severity);healthLoss(state,.008*severity);}};
    }},
  {id:'industri_2051',year:2051,icon:'⚙',title:'Scenario: industrins efterfrågan faller',
    resolve:({I},r) => {
      const severity=clamp((.55+.2*r)*(1-.4*lever(I,'larande')-.25*lever(I,'industrikretslopp')));
      return {severity,text:band(severity,
        t('Efterfrågan minskar, men vidareutbildning och fler verksamheter underlättar byten till nya arbeten.','Demand falls, but further education and a broader business base support transitions to new jobs.'),
        t('Företag minskar bemanningen. Utbildning och nya beställningar tar tid att få på plats.','Companies reduce staffing. Training and new orders take time to arrange.'),
        t('Färre beställningar slår hårt mot arbetstillfällena. Många behöver stöd för att byta yrkesinriktning.','Fewer orders hit employment hard. Many people need help changing career direction.')),
        apply:s => {s.shock+=.025*severity;trustLoss(s,.01*severity);}};
    }},
  {id:'skyfall_2063',year:2063,icon:'☂',title:'Scenario: skyfall över staden',
    resolve:({I,stress},r) => {
      const severity=clamp((.45+.25*stress+.15*r)*(1-.6*lever(I,'skyfall')-.1*lever(I,'alvnatur')));
      return {severity,text:band(severity,
        t('Planerade avrinningsvägar och ytor som tar emot regn begränsar störningarna.','Planned runoff routes and rainwater storage areas limit disruption.'),
        t('Regnet försvårar framkomligheten och kräver tillfälliga omledningar och stöd.','Rain hampers access and requires temporary diversions and support.'),
        t('Staden får omfattande störningar. Flera verksamheter behöver ordna tillfälliga lösningar.','The city faces extensive disruption. Several services need temporary arrangements.')),
        apply:s => {s.shock+=.006*severity;trustLoss(s,.012*severity);}};
    }},
  {id:'energi_2075',year:2075,icon:'⚡',title:'Scenario: dyr energi och effektbrist',
    resolve:({I},r) => {
      const severity=clamp((.5+.2*r)*(1-.45*lever(I,'hus')-.15*lever(I,'industrikretslopp')-.1*lever(I,'takenergi')));
      return {severity,text:band(severity,
        t('Lägre energibehov och samordnad användning dämpar kostnadsökningen.','Lower energy demand and coordinated use soften the cost increase.'),
        t('Högre kostnader pressar hushåll och företag trots lokal elproduktion.','Higher costs strain households and businesses despite local electricity production.'),
        t('Energikostnaderna tvingar fram svåra prioriteringar i hushåll och verksamheter.','Energy costs force difficult choices in households and organisations.')),
        apply:s => {s.shock+=.012*severity;healthLoss(s,.008*severity);}};
    }},
  {id:'information_2086',year:2086,icon:'◌',title:'Scenario: tilliten prövas',
    resolve:({s,I},r) => {
      const severity=clamp((.55+.15*r)*(1-.35*s.trust-.4*lever(I,'delaktighet')-.1*lever(I,'stadsdelar')));
      return {severity,text:band(severity,
        t('Motstridiga uppgifter får spridning, men öppna möten och tydliga besked hjälper invånarna att kontrollera dem.','Conflicting claims spread, but open meetings and clear information help residents verify them.'),
        t('Motstridiga besked skapar oro. Lokala mötesplatser får samla frågor och reda ut vad som gäller.','Conflicting messages create concern. Local meeting places collect questions and clarify the situation.'),
        t('Bristande insyn förstärker misstänksamheten. Det tar tid att bygga upp förtroendet igen.','Poor transparency strengthens distrust. Rebuilding confidence takes time.')),
        apply:s => trustLoss(s,.03*severity)};
    }},
  {id:'kompetens_2100',year:2100,icon:'✦',title:'Scenario: nya industrikompetenser efterfrågas',
    resolve:({I},r) => {
      const severity=clamp((.5+.15*r)*(1-.55*lever(I,'larande')-.2*lever(I,'industrikretslopp')));
      return {severity,good:severity<.3,text:band(severity,
        t('Utbildning och arbetsgivare har förberett omställningen. Fler kan ta de nya arbetena.','Education providers and employers have prepared for the transition. More residents can take the new jobs.'),
        t('Det finns nya arbeten, men många behöver komplettera sin utbildning innan de kan söka dem.','New jobs are available, but many residents need additional training before applying.'),
        t('Kompetenskraven ändras snabbare än utbildningsvägarna. Lediga arbeten och arbetslöshet finns samtidigt.','Skill requirements change faster than training pathways. Vacancies coexist with unemployment.')),
        apply:s => {s.shock+=.016*severity;}};
    }},
  {id:'varme_2113',year:2113,icon:'🌡',title:'Scenario: långvarig sommarvärme',
    resolve:({I,stress},r) => {
      const severity=clamp((.45+.3*stress+.1*r)*(1-.35*lever(I,'omsorg')-.25*lever(I,'centrum')-.2*lever(I,'skyfall')));
      return {severity,text:band(severity,
        t('Svala bostäder, skugga och kontakt mellan grannar gör sommaren lättare att klara.','Cool homes, shade and contact between neighbours make the summer easier to manage.'),
        t('Den långvariga värmen märks i hälsa och vardagsliv. Stöd och svala lokaler behövs oftare.','Prolonged heat affects health and everyday life. Support and cool indoor spaces are needed more often.'),
        t('Bristen på svalka belastar hälsan. Omsorgen behöver prioritera stöd till särskilt utsatta.','Lack of cooling strains health. Care services must prioritise particularly vulnerable residents.')),
        apply:s => healthLoss(s,.025*severity)};
    }},
];

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';

// A small DOM fixture keeps these tests focused on the SVG and its interactive text.
class Element {
  constructor(tag){this.tag=tag;this.attrs={};this.children=[];this.listeners={};this.style={};this.offsetWidth=100;this.offsetHeight=30;}
  setAttribute(k,v){this.attrs[k]=String(v);}
  append(...nodes){this.children.push(...nodes);}
  replaceChildren(...nodes){this.children=nodes;}
  addEventListener(name,fn){this.listeners[name]=fn;}
}
async function chart(lang='sv'){
  const body=new Element('body');
  globalThis.document={body,createElementNS:(_,tag)=>new Element(tag),createElement:tag=>new Element(tag)};
  globalThis.innerWidth=800;
  const source=(await readFile(new URL('../src/ui/charts.js',import.meta.url),'utf8'))
    .replace("import { t } from '../i18n.js';",`const t=(sv,en)=>${JSON.stringify(lang)}==='sv'?sv:en;`)
    .replace("import { CITY, PLACE } from '../city-config.js';","const PLACE={name:'Test'};");
  const {doughnutChart}=await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  return {doughnutChart,body};
}
const dims={social:[['health','Health'],['housing','Housing']],ecological:[['climate','Climate'],['water','Water']]};
const allNodes=n=>[n,...n.children.flatMap(allNodes)];
const text=n=>[n.textContent||'',...n.children.map(text)].join(' ');

test('missing social and ecological values are neutral and never presented as zero',async()=>{
  const {doughnutChart,body}=await chart();
  const svg=doughnutChart({social:{health:0},ecological:{climate:0.2,water:null}},dims);
  const missing=allNodes(svg).filter(n=>n.attrs['aria-label']?.includes('Ej modellerat'));
  assert.equal(missing.length,4,'both missing dimensions mark their wedge and their half of the green band');
  assert.ok(missing.every(n=>n.attrs.fill==='#c4c8c5'));
  for(const n of missing){
    n.listeners.pointermove({clientX:20,clientY:50});
    assert.match(text(body),/Ej modellerat/);
    assert.doesNotMatch(text(body),/0 %/);
  }
  assert.match(text(svg),/Grått: ej modellerat/);
});

test('numeric zero remains modelled, while NaN and Infinity are missing in English',async()=>{
  const {doughnutChart,body}=await chart('en');
  const svg=doughnutChart({social:{health:0,housing:NaN},ecological:{climate:0,water:Infinity}},dims);
  const missing=allNodes(svg).filter(n=>n.attrs['aria-label']?.includes('Not modelled'));
  assert.equal(missing.length,4);
  assert.ok(missing.every(n=>!n.attrs['aria-label'].startsWith('Health:')&&!n.attrs['aria-label'].startsWith('Climate:')));
  missing[0].listeners.pointermove({clientX:20,clientY:50});
  assert.match(text(body),/Not modelled/);
  assert.match(text(svg),/Grey: not modelled/);
});

test('absent dimension groups do not throw and all sectors are marked',async()=>{
  const {doughnutChart}=await chart('missing-groups');
  const svg=doughnutChart({},dims);
  assert.equal(allNodes(svg).filter(n=>n.attrs['aria-label']?.includes('Not modelled')).length,8);
});

"""Rebuild Swedish narration and mux onto the existing Swedish film (no video re-encode)."""
from pathlib import Path
import subprocess, json, re, shutil
HERE=Path(__file__).resolve().parent
CITY=HERE.parent.parent
PACK=CITY/'pack/film'
clips=[
 ('01-intro',1,21,'Välkommen till Trollhättan. Här möts Göta älv, industrin och människors vardag. I den här förenklade stadsmodellen kan vi utforska möjliga vägval för nästa sekel.'),
 ('03-alvstaden',24.5,13.5,'I Älvstaden prövar vi mer grönska, resor utan egen bil och bättre beredskap för regn och värme. Hur kan livet längs älven utvecklas?'),
 ('04-industristaden',39.3,12,'Industristaden bygger vidare på kompetens, återbruk och samarbete. Här undersöker vi hur industrins omställning kan samspela med stadens utveckling.'),
 ('05-nara',52.3,12,'Den nära staden sätter vardagen i centrum. Mötesplatser, omsorg och närhet till service kan skapa stadsdelar där fler människor får möjlighet att delta.'),
 ('06-osakerhet',65.3,12,'Framtiden är osäker. Effekterna du ser bygger på scenarioantaganden. Modellen är ett underlag för samtal, inte en prognos eller en beräkning av skred och vattennivåer.'),
 ('07-slut',80.2,7,'Ett sekel av möjliga vägval. Vilket Trollhättan vill du bygga?'),
]
def run(args): subprocess.run(args,check=True)
def stamp(t): return f'00:{int(t//60):02}:{t%60:06.3f}'
inputs=[]; filters=[]; cues=[]; manifest=[]
for i,(name,start,slot,text) in enumerate(clips):
 f=HERE/(name+'.wav')
 duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(f)]))
 speed=max(1,duration/slot); actual=duration/speed
 inputs+=['-i',str(f)]
 filters.append(f'[{i}:a]atempo={speed:.8f},adelay={round(start*1000)}:all=1[a{i}]')
 sentences=re.findall(r'[^.!?]+[.!?]',text); t=start
 for s in sentences:
  end=t+actual*len(s)/sum(map(len,sentences))
  cues.append((t,end,s.strip())); t=end
 manifest.append(dict(file=name+'.wav',start=start,duration=actual,speed=speed,text=text))
filters.append(''.join(f'[a{i}]' for i in range(len(clips)))+f'amix=inputs={len(clips)}:normalize=0,apad,atrim=duration=90,loudnorm=I=-16:TP=-1.5:LRA=11[out]')
audio=PACK/'berattarroster-sv.wav'
run(['ffmpeg','-y','-loglevel','error',*inputs,'-filter_complex',';'.join(filters),'-map','[out]','-ar','48000',str(audio)])
film=PACK/'trollhattan-2126.mp4'; temp=PACK/'trollhattan-2126-narrated.mp4'
run(['ffmpeg','-y','-loglevel','error','-i',str(film),'-i',str(audio),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','160k','-t','90','-metadata:s:a:0','language=swe','-movflags','+faststart',str(temp)])
temp.replace(film)
(PACK/'trollhattan-2126.sv.vtt').write_text('WEBVTT\n\n'+'\n'.join(f'{i+1}\n{stamp(a)} --> {stamp(b)} line:-5 size:70%\n{t}\n' for i,(a,b,t) in enumerate(cues)),encoding='utf8')
(HERE/'manifest.json').write_text(json.dumps({'provider':'Google AI Studio','model':'gemini-2.5-flash-preview-tts','voice':'Zephyr','date':'2026-10-12','clips':manifest},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(json.dumps(manifest,ensure_ascii=False,indent=2))

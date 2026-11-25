import { useMemo, useState } from "react";

const DEFAULTS = {hourNumbers:true, minuteNumbers:true, twentyFour:true, pastTo:true, pastToGuide:true, phraseMarkers:true, minuteTicks:true, hourTicks:true, hourHand:true, minuteHand:true, secondHand:true, ampm:true};
const PRESETS = {
  Beginner:{...DEFAULTS},
  Intermediate:{...DEFAULTS,minuteNumbers:false,twentyFour:false},
  Advanced:{...DEFAULTS,minuteNumbers:false,twentyFour:false,pastTo:false,phraseMarkers:false},
  Challenge:{...DEFAULTS,hourNumbers:false,minuteNumbers:false,twentyFour:false,pastTo:false,phraseMarkers:false}
};
const pad=n=>String(n).padStart(2,"0");
const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
const small=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
const tens=["","","twenty","thirty","forty","fifty"];
function words(n){return n<20?small[n]:tens[Math.floor(n/10)]+(n%10?"-"+small[n%10]:"");}
function hourWords(h){return words(h%12||12);}
function readingsFor(h,m,s){
  const next=hourWords((h+1)%24), current=hourWords(h), out=[];
  if(m===0) out.push(`It's ${current} o'clock.`);
  else if(m===15){out.push(`It's a quarter past ${current}.`,`It's fifteen minutes past ${current}.`);}
  else if(m===30){out.push(`It's half past ${current}.`,`It's thirty minutes past ${current}.`);}
  else if(m===45){out.push(`It's a quarter to ${next}.`,`It's fifteen minutes to ${next}.`);}
  else if(m<30){out.push(`It's ${words(m)} past ${current}.`,`It's ${current} ${words(m)}.`);}
  else {out.push(`It's ${words(60-m)} to ${next}.`,`It's ${words(m)} minutes past ${current}.`);}
  out.push(`The time is ${pad(h)}:${pad(m)} and ${words(s)} seconds.`);
  return [...new Set(out)];
}
function point(cx,cy,r,deg){const a=(deg-90)*Math.PI/180;return{x:cx+r*Math.cos(a),y:cy+r*Math.sin(a)};}

function Clock({hour,minute,second,display}){
  const cx=300,cy=300;
  const ha=(hour%12)*30+minute*.5+second/120, ma=minute*6+second*.1, sa=second*6;
  const phrases=[{m:5,t:"5",s:"PAST"},{m:10,t:"10",s:"PAST"},{m:15,t:"15",s:"PAST"},{m:20,t:"20",s:"PAST"},{m:25,t:"25",s:"PAST"},{m:30,t:"half",s:"PAST"},{m:35,t:"25",s:"TO"},{m:40,t:"20",s:"TO"},{m:45,t:"15",s:"TO"},{m:50,t:"10",s:"TO"},{m:55,t:"5",s:"TO"}];
  const colors=["#e85b43","#f08a32","#e8b735","#79b94b","#43a77a","#168e88","#398fcb","#4265bd","#5143a4","#733eaa","#c43b87","#e04c4d"];
  return <svg className="clock-svg" viewBox="0 0 600 600" role="img" aria-label={`Clock showing ${pad(hour)}:${pad(minute)}:${pad(second)}`}>
    <circle cx="300" cy="300" r="286" className="rim"/><circle cx="300" cy="300" r="270" className="face"/>
    <circle cx="300" cy="300" r="222" className="hour-ring"/><circle cx="300" cy="300" r="151" className="inner-ring"/>
    {display.pastToGuide&&<line x1="300" y1="75" x2="300" y2="525" className="past-to-guide"/>}
    {display.minuteTicks&&Array.from({length:60},(_,i)=>{const a=point(cx,cy,i%5===0?228:235,i*6),b=point(cx,cy,247,i*6);return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={i%5===0?"major-tick":"minor-tick"}/>;})}
    {display.hourTicks&&Array.from({length:12},(_,i)=>{const a=point(cx,cy,204,i*30),b=point(cx,cy,222,i*30);return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="hour-tick"/>;})}
    {display.minuteNumbers&&Array.from({length:60},(_,i)=>{const v=i+1,p=point(cx,cy,257,v*6);return <text key={v} x={p.x} y={p.y+4} className={`minute-number ${v<=30?"blue-number":"orange-number"}`}>{v}</text>;})}
    {display.hourNumbers&&Array.from({length:12},(_,i)=>{const v=i+1,p=point(cx,cy,183,v*30);return <g key={v}><circle cx={p.x} cy={p.y} r="28" className="hour-disc"/><text x={p.x} y={p.y+10} className="hour-number" fill={colors[i]}>{v}</text></g>;})}
    {display.twentyFour&&Array.from({length:12},(_,i)=>{const v=i+13,p=point(cx,cy,112,(i+1)*30);return <text key={v} x={p.x} y={p.y+5} className="twentyfour">{v}</text>;})}
    {display.pastTo&&<><text x="400" y="309" className="past-label">PAST</text><text x="200" y="309" className="to-label">TO</text></>}
    {display.phraseMarkers&&phrases.map(q=>{const p=point(cx,cy,151,q.m*6);return <g key={q.m}><circle cx={p.x} cy={p.y} r="19" className="phrase-disc"/><text x={p.x} y={p.y-1} className="phrase-main">{q.t}</text><text x={p.x} y={p.y+10} className="phrase-sub">{q.s}</text></g>;})}
    
    {display.hourHand&&<line x1="300" y1="300" x2="300" y2="174" className="hour-hand" transform={`rotate(${ha} 300 300)`}/>}
    {display.minuteHand&&<line x1="300" y1="300" x2="300" y2="123" className="minute-hand" transform={`rotate(${ma} 300 300)`}/>}
    {display.secondHand&&<line x1="300" y1="334" x2="300" y2="93" className="second-hand" transform={`rotate(${sa} 300 300)`}/>}
    <circle cx="300" cy="300" r="12" className="pin"/><circle cx="300" cy="300" r="5" className="pin-core"/>
  </svg>;
}
function Toggle({label,checked,onChange}){return <label className="toggle"><span>{label}</span><input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)}/><i/></label>;}

export default function App(){
  const [time,setTime]=useState({hour:10,minute:10,second:35});
  const [theme,setTheme]=useState("boy"),[display,setDisplay]=useState(DEFAULTS),[preset,setPreset]=useState("Beginner"),[settingsOpen,setSettingsOpen]=useState(true),[timeFormat,setTimeFormat]=useState("24");
  const readings=useMemo(()=>readingsFor(time.hour,time.minute,time.second),[time]);
  const setPart=(key,value)=>setTime(old=>({...old,[key]:clamp(Number(value)||0,0,key==="hour"?(timeFormat==="24"?23:12):59)}));
  const shownHour=timeFormat==="24"?time.hour:(time.hour%12||12);
  const setShownHour=value=>{const h=clamp(Number(value)||1, timeFormat==="24"?0:1, timeFormat==="24"?23:12);setTime(old=>({...old,hour:timeFormat==="24"?h:(h%12)+(old.hour>=12?12:0)}));};
  const setPeriod=period=>setTime(old=>({...old,hour:(old.hour%12)+(period==="PM"?12:0)}));
  const choosePreset=name=>{setPreset(name);setDisplay({...PRESETS[name]});};
  const toggle=(key,value)=>{setDisplay(old=>({...old,[key]:value}));setPreset("Custom");};
  const randomTime=()=>setTime({hour:Math.floor(Math.random()*24),minute:Math.floor(Math.random()*60),second:Math.floor(Math.random()*60)});
  const groups=[
    {title:"Numbers",items:[["hourNumbers","Hour numbers (1–12)"],["minuteNumbers","Minute numbers (1–60)"],["twentyFour","24-hour numbers (13–24)"]]},
    {title:"Labels and helpers",items:[["pastTo","Past and To labels"],["phraseMarkers","Minute reading guides"],]},
    {title:"Markings",items:[["minuteTicks","Minute markings"],["hourTicks","Hour markings"]]},
    {title:"Clock hands",items:[["hourHand","Hour hand"],["minuteHand","Minute hand"],["secondHand","Second hand"]]}
  ];
  return <main className={`app ${theme==="boy"?"boy":"girl"}`}>
    <header><div className="brand"><b>◷</b><span><strong>Clock Learning</strong><small>Learn to tell time!</small></span></div><div className="themes"><button className={theme==="boy"?"chosen":""} onClick={()=>setTheme("boy")}>🚀 Boy theme</button><button className={theme==="girl"?"chosen":""} onClick={()=>setTheme("girl")}>🌸 Girl theme</button></div></header>
    <section className="intro"><small>LET'S LEARN TOGETHER</small><h1>What time is it?</h1><p>Explore the clock, move through the day, and discover different ways to read time.</p></section>
    <section className="layout">
      <article className="clock-panel"><div className="panel-heading"><div><small>YOUR CLOCK</small><h2>Look at the hands</h2></div><span>● Ready to learn</span></div>
        <div className="clock-wrap"><Clock {...time} display={display}/></div>
        <div className="digital">{pad(shownHour)}:{pad(time.minute)}<span>:{pad(time.second)}</span>{timeFormat==="12"&&<small className="digital-period">{time.hour>=12?"PM":"AM"}</small>}</div><div className="period">{time.hour<12?"IN THE MORNING":"IN THE AFTERNOON / EVENING"}</div>
        <div className="entry"><b>Set a time</b><div className="format-switch"><button type="button" className={timeFormat==="24"?"active":""} onClick={()=>setTimeFormat("24")}>24-hour</button><button type="button" className={timeFormat==="12"?"active":""} onClick={()=>setTimeFormat("12")}>12-hour</button></div><div className="time-inputs"><label><input type="number" min={timeFormat==="24"?0:1} max={timeFormat==="24"?23:12} value={pad(shownHour)} aria-label="hour" onChange={e=>setShownHour(e.target.value)}/><small>HOUR</small></label><label><input type="number" min="0" max="59" value={pad(time.minute)} aria-label="minute" onChange={e=>setPart("minute",e.target.value)}/><small>MINUTE</small></label><label><input type="number" min="0" max="59" value={pad(time.second)} aria-label="second" onChange={e=>setPart("second",e.target.value)}/><small>SECOND</small></label></div>{timeFormat==="12"&&<div className="period-switch"><button type="button" className={time.hour<12?"active":""} onClick={()=>setPeriod("AM")}>AM</button><button type="button" className={time.hour>=12?"active":""} onClick={()=>setPeriod("PM")}>PM</button></div>}<button className="surprise" onClick={randomTime}>✦ Surprise me with a time</button></div>
      </article>
      <aside><article className="readings"><div className="bulb">💡</div><small>LET'S READ THE TIME</small><h2>There is more than one way to say it!</h2><ol>{readings.map((r,i)=><li key={i}><b>{i+1}</b><span>{r}</span></li>)}</ol></article>
      <article className="settings"><button className="settings-head" onClick={()=>setSettingsOpen(v=>!v)}><strong>⚙️ Clock display settings</strong><b>{settingsOpen?"−":"+"}</b></button>{settingsOpen&&<><p>Choose how much help to show on the clock.</p><div className="presets">{[...Object.keys(PRESETS),"Custom"].map(n=><button key={n} className={preset===n?"active":""} onClick={()=>n!=="Custom"&&choosePreset(n)}>{n}</button>)}</div>{groups.map(g=><section className="group" key={g.title}><h3>{g.title}</h3>{g.items.map(([k,l])=><Toggle key={k} label={l} checked={display[k]} onChange={v=>toggle(k,v)}/>)}</section>)}<button className="reset" onClick={()=>choosePreset("Beginner")}>Reset to beginner settings</button></>}</article></aside>
    </section><footer><span>Made for curious minds <b>✦</b> One minute at a time</span><strong>Created by AMIR FATEMI</strong><small>© 2026 AMIR FATEMI. All rights reserved.</small></footer>
  </main>;
}

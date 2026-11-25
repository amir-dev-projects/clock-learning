import { useMemo, useState } from "react";

const DEFAULTS = {hourNumbers:true, minuteNumbers:true, twentyFour:true, pastTo:true, phraseMarkers:true, minuteTicks:true, hourTicks:true, hourHand:true, minuteHand:true, secondHand:true, ampm:true};
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
  const phrases=[{m:5,t:"5",s:"PAST"},{m:10,t:"10",s:"PAST"},{m:15,t:"¼",s:"PAST"},{m:20,t:"20",s:"PAST"},{m:25,t:"25",s:"PAST"},{m:30,t:"½",s:"PAST"},{m:35,t:"25",s:"TO"},{m:40,t:"20",s:"TO"},{m:45,t:"¼",s:"TO"},{m:50,t:"10",s:"TO"},{m:55,t:"5",s:"TO"}];
  const colors=["#e85b43","#f08a32","#e8b735","#79b94b","#43a77a","#168e88","#398fcb","#4265bd","#5143a4","#733eaa","#c43b87","#e04c4d"];
  return <svg className="clock-svg" viewBox="0 0 600 600" role="img" aria-label={`Clock showing ${pad(hour)}:${pad(minute)}:${pad(second)}`}>
    <circle cx="300" cy="300" r="286" className="rim"/><circle cx="300" cy="300" r="270" className="face"/>
    <circle cx="300" cy="300" r="222" className="hour-ring"/><circle cx="300" cy="300" r="151" className="inner-ring"/>
    {display.minuteTicks&&Array.from({length:60},(_,i)=>{const a=point(cx,cy,i%5===0?228:235,i*6),b=point(cx,cy,247,i*6);return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={i%5===0?"major-tick":"minor-tick"}/>;})}
    {display.hourTicks&&Array.from({length:12},(_,i)=>{const a=point(cx,cy,204,i*30),b=point(cx,cy,222,i*30);return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="hour-tick"/>;})}
    {display.minuteNumbers&&Array.from({length:60},(_,i)=>{const v=i+1,p=point(cx,cy,257,v*6);return <text key={v} x={p.x} y={p.y+4} className={`minute-number ${v<=30?"blue-number":"orange-number"}`}>{v}</text>;})}
    {display.hourNumbers&&Array.from({length:12},(_,i)=>{const v=i+1,p=point(cx,cy,183,v*30);return <g key={v}><circle cx={p.x} cy={p.y} r="28" className="hour-disc"/><text x={p.x} y={p.y+10} className="hour-number" fill={colors[i]}>{v}</text></g>;})}
    {display.twentyFour&&Array.from({length:12},(_,i)=>{const v=i+13,p=point(cx,cy,126,(i+1)*30);return <text key={v} x={p.x} y={p.y+5} className="twentyfour">{v}</text>;})}
    {display.pastTo&&<><text x="427" y="309" className="past-label">PAST</text><text x="173" y="309" className="to-label">TO</text></>}
    {display.phraseMarkers&&phrases.map(q=>{const p=point(cx,cy,151,q.m*6);return <g key={q.m}><circle cx={p.x} cy={p.y} r="19" className="phrase-disc"/><text x={p.x} y={p.y-1} className="phrase-main">{q.t}</text><text x={p.x} y={p.y+10} className="phrase-sub">{q.s}</text></g>;})}
    {display.ampm&&<><text x="300" y="83" className="ampm">AM</text><text x="300" y="527" className="ampm">PM</text></>}
    {display.hourHand&&<line x1="300" y1="300" x2="300" y2="174" className="hour-hand" transform={`rotate(${ha} 300 300)`}/>}
    {display.minuteHand&&<line x1="300" y1="300" x2="300" y2="123" className="minute-hand" transform={`rotate(${ma} 300 300)`}/>}
    {display.secondHand&&<line x1="300" y1="334" x2="300" y2="93" className="second-hand" transform={`rotate(${sa} 300 300)`}/>}
    <circle cx="300" cy="300" r="12" className="pin"/><circle cx="300" cy="300" r="5" className="pin-core"/>
  </svg>;
}
function Toggle({label,checked,onChange}){return <label className="toggle"><span>{label}</span><input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)}/><i/></label>;}

export default function App(){
  const [time,setTime]=useState({hour:10,minute:10,second:35});
  const [theme,setTheme]=useState("boy"),[display,setDisplay]=useState(DEFAULTS),[preset,setPreset]=useState("Beginner"),[settingsOpen,setSettingsOpen]=useState(true);
  const readings=useMemo(()=>readingsFor(time.hour,time.minute,time.second),[time]);
  const setPart=(key,value)=>setTime(old=>({...old,[key]:clamp(Number(value)||0,0,key==="hour"?23:59)}));
  const choosePreset=name=>{setPreset(name);setDisplay({...PRESETS[name]});};
  const toggle=(key,value)=>{setDisplay(old=>({...old,[key]:value}));setPreset("Custom");};
  const randomTime=()=>setTime({hour:Math.floor(Math.random()*24),minute:Math.floor(Math.random()*60),second:Math.floor(Math.random()*60)});
  const groups=[
    {title:"Numbers",items:[["hourNumbers","Hour numbers (1–12)"],["minuteNumbers","Minute numbers (1–60)"],["twentyFour","24-hour numbers (13–24)"]]},
    {title:"Labels and helpers",items:[["pastTo","Past and To labels"],["phraseMarkers","Minute reading guides"],["ampm","AM / PM labels"]]},
    {title:"Markings",items:[["minuteTicks","Minute markings"],["hourTicks","Hour markings"]]},
    {title:"Clock hands",items:[["hourHand","Hour hand"],["minuteHand","Minute hand"],["secondHand","Second hand"]]}
  ];
  return <main className={`app ${theme==="boy"?"boy":"girl"}`}>
    <header><div className="brand"><b>◷</b><span><strong>Clock Learning</strong><small>Learn to tell time!</small></span></div><div className="themes"><button className={theme==="boy"?"chosen":""} onClick={()=>setTheme("boy")}>🚀 Boy theme</button><button className={theme==="girl"?"chosen":""} onClick={()=>setTheme("girl")}>🌸 Girl theme</button></div></header>
    <section className="intro"><small>LET'S LEARN TOGETHER</small><h1>What time is it?</h1><p>Explore the clock, move through the day, and discover different ways to read time.</p></section>
    <section className="layout">
      <article className="clock-panel"><div className="panel-heading"><div><small>YOUR CLOCK</small><h2>Look at the hands</h2></div><span>● Ready to learn</span></div>
        <div className="clock-wrap"><Clock {...time} display={display}/></div>
        <div className="digital">{pad(time.hour)}:{pad(time.minute)}<span>:{pad(time.second)}</span></div><div className="period">{time.hour<12?"IN THE MORNING":"IN THE AFTERNOON / EVENING"}</div>
        <div className="entry"><b>Set a time</b><div className="time-inputs">{["hour","minute","second"].map((key,i)=><label key={key}><input type="number" min="0" max={i===0?23:59} value={pad(time[key])} aria-label={key} onChange={e=>setPart(key,e.target.value)}/><small>{["HOUR","MINUTE","SECOND"][i]}</small></label>)}</div><button className="surprise" onClick={randomTime}>✦ Surprise me with a time</button></div>
      </article>
      <aside><article className="readings"><div className="bulb">💡</div><small>LET'S READ THE TIME</small><h2>There is more than one way to say it!</h2><ol>{readings.map((r,i)=><li key={i}><b>{i+1}</b><span>{r}</span></li>)}</ol></article>
      <article className="settings"><button className="settings-head" onClick={()=>setSettingsOpen(v=>!v)}><strong>⚙️ Clock display settings</strong><b>{settingsOpen?"−":"+"}</b></button>{settingsOpen&&<><p>Choose how much help to show on the clock.</p><div className="presets">{[...Object.keys(PRESETS),"Custom"].map(n=><button key={n} className={preset===n?"active":""} onClick={()=>n!=="Custom"&&choosePreset(n)}>{n}</button>)}</div>{groups.map(g=><section className="group" key={g.title}><h3>{g.title}</h3>{g.items.map(([k,l])=><Toggle key={k} label={l} checked={display[k]} onChange={v=>toggle(k,v)}/>)}</section>)}<button className="reset" onClick={()=>choosePreset("Beginner")}>Reset to beginner settings</button></>}</article></aside>
    </section><footer>Made for curious minds <b>✦</b> One minute at a time</footer>
  </main>;
}

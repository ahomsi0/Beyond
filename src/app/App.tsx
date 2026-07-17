import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { chapters } from '../data/chapters';
import { ExperienceCanvas, CHAPTER_CUES } from "../experience/ExperienceCanvas";
import { useExperienceStore } from '../store/experienceStore';

function chapterForProgress(progress: number) {
 for (let index=CHAPTER_CUES.length-1; index>=0; index-=1) if (progress>=CHAPTER_CUES[index]) return index;
 return 0;
}

function IconButton({ label, children, onClick, active=false }: {label:string;children:React.ReactNode;onClick:()=>void;active?:boolean}) { return <button aria-label={label} onClick={onClick} className={`icon-button ${active?'active':''}`}>{children}</button> }
export function App() {
 const currentChapter=useExperienceStore(state=>state.currentChapter),soundEnabled=useExperienceStore(state=>state.soundEnabled),reducedMotion=useExperienceStore(state=>state.reducedMotion),isPaused=useExperienceStore(state=>state.isPaused);
 const setProgress=useExperienceStore(state=>state.setProgress),setChapter=useExperienceStore(state=>state.setChapter),toggleSound=useExperienceStore(state=>state.toggleSound),togglePause=useExperienceStore(state=>state.togglePause),toggleMotion=useExperienceStore(state=>state.toggleMotion);
 const [entered,setEntered]=useState(false),[menu,setMenu]=useState(false),[journeyComplete,setJourneyComplete]=useState(false);
 useEffect(()=>{document.body.style.overflow=entered?'':'hidden'; return()=>{document.body.style.overflow=''}},[entered]);
 useEffect(()=>{let frame=0;const commit=()=>{frame=0;const max=document.documentElement.scrollHeight-innerHeight,p=max?scrollY/max:0;document.documentElement.style.setProperty('--journey-progress',`${p*100}%`);setProgress(p);setChapter(chapterForProgress(p));setJourneyComplete(p>.965)},update=()=>{if(!frame)frame=requestAnimationFrame(commit)};addEventListener('scroll',update,{passive:true});commit();return()=>{removeEventListener('scroll',update);cancelAnimationFrame(frame)}},[setProgress,setChapter]);
 const chapter=chapters[currentChapter]; const jump=(i:number)=>{scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*CHAPTER_CUES[i],behavior:reducedMotion?'auto':'smooth'});setMenu(false)};
 return <main><a className="skip" href="#narrative">Skip to journey narrative</a><div className="scene"><ExperienceCanvas/></div><div className="grain"/>
 <header className="topbar"><div className="brand"><img className="brand-mark" src="/logo.svg" alt=""/><span className="brand-copy"><b>BEYOND</b><small>INTERSTELLAR STUDIES</small></span></div><div className="controls"><IconButton label="Toggle sound" onClick={toggleSound} active={soundEnabled}>{soundEnabled?'◖))':'◖×'}</IconButton><IconButton label="Pause animation" onClick={togglePause}>{isPaused?'▶':'Ⅱ'}</IconButton><IconButton label="Toggle reduced motion" onClick={toggleMotion} active={reducedMotion}>◌</IconButton><IconButton label="Open chapters" onClick={()=>setMenu(!menu)}>☰</IconButton></div></header>
 <AnimatePresence>{menu&&<motion.nav className="chapter-menu" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} aria-label="Journey chapters">{chapters.map((c,i)=><button key={c.id} onClick={()=>jump(i)}><span>{c.number}</span>{c.name}</button>)}</motion.nav>}</AnimatePresence>
 {!entered && <section className="opening" aria-hidden={false}><motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.2}}><p className="eyebrow">A CINEMATIC EXPLORATION</p><h1>Beyond</h1><p className="intro">A journey through the known universe</p><button className="enter" onClick={()=>{setEntered(true);requestAnimationFrame(()=>scrollTo({top:innerHeight*.2,behavior:'smooth'}))}}>BEGIN THE JOURNEY <b>↓</b></button><p className="hint">SCROLL TO TRAVEL</p></motion.div></section>}
 <section id="narrative" className="overlay" aria-live="polite"><AnimatePresence mode="wait"><motion.article key={chapter.id} initial={{opacity:0,y:20,filter:'blur(8px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={{opacity:0,y:-12,filter:'blur(6px)'}} transition={{duration:.65}}><p className="eyebrow" style={{color:chapter.accent}}>{chapter.number} / 10 &nbsp; {chapter.eyebrow}</p><h2>{chapter.title}</h2><p className="copy">{chapter.copy}</p><div className="fact"><span>OBSERVATION</span>{chapter.fact}</div></motion.article></AnimatePresence></section>
 <AnimatePresence>{entered&&journeyComplete&&<motion.section className="finale" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1.2}} aria-label="Journey complete"><motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:.35,duration:.8}}><p className="eyebrow">JOURNEY COMPLETE</p><h2>The universe is not only something we observe.</h2><p>It is something we are part of.</p><div className="final-actions"><button onClick={()=>{scrollTo({top:0,behavior:"auto"});setEntered(false)}}>REPLAY JOURNEY</button><button onClick={()=>setMenu(true)}>EXPLORE CHAPTERS</button></div></motion.div></motion.section>}</AnimatePresence>
 <aside className="progress"><span>{chapter.number} / 10</span><b>{chapter.name}</b><i><em style={{height:"var(--journey-progress, 0%)"}}/></i></aside>
 <section className="scroll-space" aria-hidden="true"/><section className="accessible" aria-label="Complete journey narrative">{chapters.map(c=><article key={c.id}><p>{c.number} — {c.name}</p><h2>{c.title}</h2><p>{c.copy}</p><small>{c.fact}</small></article>)}</section>
 </main>
}

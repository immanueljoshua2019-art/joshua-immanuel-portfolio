const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

const themeToggle = $("#themeToggle");
const savedTheme = localStorage.getItem("ji-theme");
if(savedTheme) document.documentElement.dataset.theme = savedTheme;
themeToggle?.addEventListener("click",()=>{
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("ji-theme", next);
});

const menuToggle=$("#menuToggle"), navLinks=$("#navLinks");
menuToggle?.addEventListener("click",()=>navLinks.classList.toggle("open"));
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

window.addEventListener("scroll",()=>{
  const h=document.documentElement.scrollHeight-innerHeight;
  $("#progress").style.width=(h>0 ? scrollY/h*100 : 0)+"%";
});

const glow=$(".cursor-glow");
window.addEventListener("pointermove",e=>{
  if(glow) { glow.style.left=e.clientX+"px"; glow.style.top=e.clientY+"px"; }
});

const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");revealObs.unobserve(e.target)}});
},{threshold:.12});
$$(".reveal").forEach(el=>revealObs.observe(el));

async function loadJSON(file){
  const r=await fetch(file);
  if(!r.ok) throw new Error(file);
  return r.json();
}
function esc(v=""){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}

Promise.all([
  loadJSON("content/site.json"),loadJSON("content/projects.json"),loadJSON("content/experience.json"),
  loadJSON("content/leadership.json"),loadJSON("content/certificates.json"),loadJSON("content/writing.json"),loadJSON("content/skills.json")
]).then(([site,projects,experience,leadership,certs,writing,skills])=>{
  renderSite(site); renderProjects(projects); renderExperience(experience); renderLeadership(leadership);
  renderCertificates(certs); renderWriting(writing); renderSkills(skills);
}).catch(err=>{
  console.error(err);
  document.body.dataset.contentError="true";
});

function renderSite(s){
  $("#heroTitle").innerHTML=esc(s.hero).replace(/clearer decisions\./i, "<em>clearer decisions.</em>");
  $("#heroText").innerHTML=esc(s.hero_text).replace(/customer behaviour, behavioural science, analytics and strategy/i, "<b>customer behaviour, behavioural science, analytics and strategy</b>");
  $("#heroTags").innerHTML=s.hero_tags.map(x=>`<span>${esc(x)}</span>`).join("");
  const availability=$("#availability"); if(availability) availability.textContent=s.availability||"";
  $("#kpis").innerHTML=s.kpis.map(k=>`<div class="metric"><b>${esc(k.value)}</b><span>${esc(k.label)}</span><small>${esc(k.detail)}</small></div>`).join("");
  $("#principles").innerHTML=s.principles.map(p=>`<article class="principle"><b>${esc(p.title)}</b><p>${esc(p.text)}</p></article>`).join("");
  $("#educationDegree").textContent=`${s.education.degree} · ${s.education.school}`;
  $("#educationExpected").textContent=`${s.education.location} · ${s.education.expected}`;
  $("#courseList").innerHTML=s.education.coursework.map(x=>`<span>${esc(x)}</span>`).join("");
}

function visualFor(p){
  if(p.visual==="causal") return `<div class="visual-grid"></div><div class="visual-dag"><svg viewBox="0 0 500 360"><defs><marker id="pArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7z" fill="#d3ff4b"/></marker></defs><path d="M70 180 C145 85 205 85 245 180" marker-end="url(#pArrow)"/><path d="M255 180 C300 85 365 85 430 180" marker-end="url(#pArrow)"/><path d="M70 180 C145 275 205 275 245 180"/><path d="M430 180 C365 275 300 275 255 180"/><circle cx="60" cy="180" r="32"/><circle cx="250" cy="180" r="42"/><circle cx="440" cy="180" r="32"/><text x="60" y="185" text-anchor="middle">X</text><text x="250" y="185" text-anchor="middle">B</text><text x="440" y="185" text-anchor="middle">Y</text></svg></div><div class="visual-word">PREDICTION ≠ CAUSALITY</div>`;
  if(p.visual==="nudge") return `<div class="nudge-art"><div class="nudge-ring"><div class="nudge-core">BEHAVIOUR</div><span class="nudge-label l1">CONTEXT</span><span class="nudge-label l2">FRICTION</span><span class="nudge-label l3">CHOICE</span></div></div><div class="visual-word">COM-B / EAST / AFRICAN CONTEXT</div>`;
  if(p.visual==="water") return `<div class="water-art"><div class="water-wave"></div><div class="water-number">213</div></div><div class="visual-word">WHO / UNICEF JMP · 2015–2020</div>`;
  return `<div class="retention-art"><span class="ret-label">RETENTION SIGNAL / IN DEVELOPMENT</span><div class="bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>`;
}
function renderProjects(ps){
  $("#projects").innerHTML=ps.map(p=>`
  <article class="project-card reveal ${p.featured?"featured":""}">
    <div class="project-copy">
      <div>
        <div class="project-meta">${esc(p.label)} · ${esc(p.number)}</div>
        <h3>${esc(p.title)}</h3>
        <p class="project-short">${esc(p.short)}</p>
        <p class="project-desc">${esc(p.description)}</p>
        <div class="project-why"><b>Why it matters</b>${esc(p.why)}</div>
        <div class="project-tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join("")}</div>
      </div>
      <div class="project-links">
        ${p.repo?`<a href="${esc(p.repo)}" target="_blank" rel="noreferrer">View GitHub ↗</a>`:`<span style="color:var(--muted)">Case study in development</span>`}
        ${p.extra?`<a href="${esc(p.extra)}" target="_blank" rel="noreferrer">${esc(p.extraLabel)}</a>`:""}
      </div>
    </div>
    <div class="project-visual">${visualFor(p)}</div>
  </article>`).join("");
  $$(".reveal",$("#projects")).forEach(el=>revealObs.observe(el));
}
function renderExperience(xs){
  $("#experienceList").innerHTML=xs.map(x=>`<article class="timeline-item reveal"><div class="period">${esc(x.period)}</div><div><h3>${esc(x.company)}</h3><div class="role">${esc(x.role)}</div></div><ul>${x.bullets.map(b=>`<li>${esc(b)}</li>`).join("")}</ul></article>`).join("");
  $$(".reveal",$("#experienceList")).forEach(el=>revealObs.observe(el));
}
function renderLeadership(xs){
  $("#leadershipList").innerHTML=xs.map(x=>`<article class="lead-card reveal"><span>${esc(x.period)}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p>${x.credential?`<small style="font:9px var(--mono);color:var(--accent)">${esc(x.credential)}</small>`:""}</article>`).join("");
  $$(".reveal",$("#leadershipList")).forEach(el=>revealObs.observe(el));
}
function renderCertificates(cs){
  $("#certificates").innerHTML=cs.map(c=>`<article class="credential reveal"><div class="credential-media"><img src="${esc(c.image)}" alt="${esc(c.title)} certificate"></div><div class="credential-copy"><div class="issuer">${esc(c.issuer)} · ${esc(c.year)}</div><h3>${esc(c.title)}</h3><p>${esc(c.signal)}</p></div></article>`).join("");
  $$(".reveal",$("#certificates")).forEach(el=>revealObs.observe(el));
}
function renderWriting(ws){
  const featured=ws.find(x=>x.featured);
  const rest=ws.filter(x=>!x.featured);
  const items=[featured,...rest].filter(Boolean);
  const track=document.createElement("div");
  track.className="writing-window";
  track.innerHTML=items.map((w,i)=>`<article class="writing-card ${i===0?'is-featured':''}">
    <div class="writing-media">
      <img src="${esc(w.image||'')}" alt="Illustration for ${esc(w.title)}" loading="lazy">
      <div class="writing-media-grid"></div>
      <div class="writing-media-signal"><span>${esc(w.theme)}</span><b>${String(i+1).padStart(2,'0')}</b></div>
      <div class="writing-media-orbit"></div>
    </div>
    <div class="writing-copy">
      <small>${esc(w.theme)}</small>
      <h3>${esc(w.title)}</h3>
      <p>${esc(w.description)}</p>
      <a class="writing-read" href="${esc(w.url)}" target="_blank" rel="noreferrer">Read on Medium <span>↗</span></a>
    </div>
  </article>`).join("");
  $("#writingTrack").appendChild(track);

  let idx=0;
  const dots=$("#writingDots");
  dots.innerHTML=items.map((_,i)=>`<button aria-label="Go to article ${i+1}" class="${i===0?"active":""}"></button>`).join("");
  const progress=document.createElement('div');
  progress.className='carousel-progress';
  progress.innerHTML='<span></span>';
  $(".writing-carousel").appendChild(progress);
  const progressBar=$("span",progress);
  let timer=null, startX=null, paused=false;
  const render=()=>{
    track.style.transform=`translateX(-${idx*100}%)`;
    $$('button',dots).forEach((b,i)=>b.classList.toggle('active',i===idx));
    progressBar.style.width=`${((idx+1)/items.length)*100}%`;
    track.querySelectorAll('.writing-card').forEach((card,i)=>card.classList.toggle('is-active',i===idx));
  };
  const next=()=>{idx=(idx+1)%items.length;render()};
  const prev=()=>{idx=(idx-1+items.length)%items.length;render()};
  const restart=()=>{clearInterval(timer); if(!paused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) timer=setInterval(next,5600)};
  $("#prevPost").onclick=()=>{prev();restart()};
  $("#nextPost").onclick=()=>{next();restart()};
  $$('button',dots).forEach((b,i)=>b.onclick=()=>{idx=i;render();restart()});
  const carousel=$(".writing-carousel");
  carousel.addEventListener('mouseenter',()=>{paused=true;clearInterval(timer)});
  carousel.addEventListener('mouseleave',()=>{paused=false;restart()});
  carousel.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;paused=true;clearInterval(timer)},{passive:true});
  carousel.addEventListener('touchend',e=>{
    if(startX===null)return;
    const dx=e.changedTouches[0].clientX-startX;
    if(Math.abs(dx)>45){dx<0?next():prev()}
    startX=null;paused=false;restart();
  },{passive:true});
  render();restart();
}
function renderSkills(groups){
  $("#skillsGrid").innerHTML=groups.map(g=>`<div class="skill-group"><h3>${esc(g.group)}</h3><div class="skill-chips">${g.items.map(x=>`<span>${esc(x)}</span>`).join("")}</div></div>`).join("");
}
$("#year").textContent=new Date().getFullYear();

document.addEventListener("mousemove",e=>{
  const el=e.target.closest(".magnetic"); if(!el)return;
  const r=el.getBoundingClientRect(), dx=e.clientX-(r.left+r.width/2), dy=e.clientY-(r.top+r.height/2);
  el.style.transform=`translate(${dx*.08}px,${dy*.08}px)`;
});
document.addEventListener("mouseout",e=>{
  const el=e.target.closest(".magnetic"); if(el) el.style.transform="";
});

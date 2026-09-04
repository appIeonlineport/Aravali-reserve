const revealCss=document.createElement('link');revealCss.rel='stylesheet';revealCss.href='reveal-v2.css?v=final4';document.head.appendChild(revealCss);
const dropStage=document.querySelector('#dropStage');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const MASTER='https://d2ol7oe51mr4n9.cloudfront.net/user_3ImSm2PyWO8w1MnjpBunqmh0pvK/f27f16c4-d536-449b-894d-767524968e5c.jpg';
if(dropStage){
 dropStage.innerHTML=`<div class="aqua-stage" aria-label="Aravali Reserve water reveal"><div class="aqua-halo"></div><div class="aqua-ring r1"></div><div class="aqua-ring r2"></div><div class="aqua-ring r3"></div><div class="splash s-left"></div><div class="splash s-right"></div><div class="microdrops"></div><img class="master-bottle" src="${MASTER}" alt="Aravali Reserve signature bottle"><div class="bottle-light"></div><div class="aqua-floor"></div><div class="aqua-caption"><span>AR / 001</span><b>THE SIGNATURE RESERVE</b></div></div>`;
 const stage=dropStage.querySelector('.aqua-stage');
 if(!reduceMotion){
  for(let i=0;i<30;i++){const d=document.createElement('i');d.className='aqua-drop';d.style.setProperty('--x',`${6+Math.random()*88}%`);d.style.setProperty('--y',`${8+Math.random()*78}%`);d.style.setProperty('--s',`${3+Math.random()*10}px`);d.style.setProperty('--delay',`${Math.random()*-5}s`);d.style.setProperty('--dur',`${3+Math.random()*4}s`);stage.querySelector('.microdrops').appendChild(d)}
  dropStage.addEventListener('pointermove',e=>{if(!matchMedia('(pointer:fine)').matches)return;const r=dropStage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;stage.style.setProperty('--rx',`${-y*1.3}deg`);stage.style.setProperty('--ry',`${x*2}deg`)});
  dropStage.addEventListener('pointerleave',()=>{stage.style.setProperty('--rx','0deg');stage.style.setProperty('--ry','0deg')});
 }
}
const revealObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('enhance-visible')}),{threshold:.18});document.querySelectorAll('.drop-reveal,.water-film').forEach(el=>revealObserver.observe(el));
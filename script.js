const nav=document.querySelector('#nav');
const progress=document.querySelector('#progress');
const loader=document.querySelector('#loader');
const glow=document.querySelector('#cursorGlow');
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.13});
document.querySelectorAll('.section-reveal').forEach(el=>io.observe(el));
window.addEventListener('load',()=>setTimeout(()=>loader?.classList.add('hide'),450));
window.addEventListener('scroll',()=>{
  nav?.classList.toggle('scrolled',scrollY>30);
  const max=document.documentElement.scrollHeight-innerHeight;
  if(progress) progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('.parallax').forEach(el=>{const s=parseFloat(el.dataset.speed||0);el.style.transform=`translate3d(0,${scrollY*s}px,0) scale(1.04)`})}
},{passive:true});
const tilt=document.querySelector('.tilt');
if(tilt){tilt.addEventListener('pointermove',e=>{const r=tilt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`perspective(1200px) rotateY(${x*3}deg) rotateX(${-y*3}deg)`});tilt.addEventListener('pointerleave',()=>tilt.style.transform='')}
if(glow&&matchMedia('(pointer:fine)').matches){window.addEventListener('pointermove',e=>{glow.style.opacity='1';glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'})}
document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{if(!matchMedia('(pointer:fine)').matches)return;const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.12}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
const form=document.querySelector('#enquiryForm'),note=document.querySelector('#formNote');
form?.addEventListener('submit',e=>{e.preventDefault();if(note){note.textContent='Thank you. Your enquiry details are ready; the receiving business email will be connected before public launch.';note.style.color='#d3a64f'}form.reset()});

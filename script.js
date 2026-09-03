const nav=document.querySelector('#nav'),progress=document.querySelector('#progress'),loader=document.querySelector('#loader'),glow=document.querySelector('#cursorGlow'),menuBtn=document.querySelector('#menuBtn'),mobileMenu=document.querySelector('#mobileMenu');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});document.querySelectorAll('.section-reveal').forEach(el=>io.observe(el));
window.addEventListener('load',()=>setTimeout(()=>loader?.classList.add('hide'),550));
let ticking=false;function renderScroll(){nav?.classList.toggle('scrolled',scrollY>30);const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;if(!reduced.matches)document.querySelectorAll('.parallax').forEach(el=>{const s=parseFloat(el.dataset.speed||0),r=el.parentElement.getBoundingClientRect();el.style.transform=`translate3d(0,${-r.top*s}px,0) scale(1.055)`});ticking=false}window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(renderScroll);ticking=true}},{passive:true});renderScroll();
const tilt=document.querySelector('.tilt');if(tilt&&!reduced.matches){tilt.addEventListener('pointermove',e=>{const r=tilt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`perspective(1200px) rotateY(${x*3.2}deg) rotateX(${-y*3.2}deg)`});tilt.addEventListener('pointerleave',()=>tilt.style.transform='')}
if(glow&&matchMedia('(pointer:fine)').matches&&!reduced.matches)window.addEventListener('pointermove',e=>{glow.style.opacity='1';glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{if(!matchMedia('(pointer:fine)').matches||reduced.matches)return;const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.11}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
menuBtn?.addEventListener('click',()=>{mobileMenu?.classList.toggle('open');menuBtn.classList.toggle('active');document.body.style.overflow=mobileMenu?.classList.contains('open')?'hidden':''});mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('open');document.body.style.overflow=''}));

// ARAVALI RESERVE private enquiry routing
const CONTACT_EMAIL='indiatryme@gmail.com';
const WHATSAPP_NUMBER='919235115621';
const form=document.querySelector('#enquiryForm'),note=document.querySelector('#formNote');
if(form&&note){
  note.innerHTML=`Private enquiries: <a href="mailto:${CONTACT_EMAIL}" style="color:inherit;text-decoration:underline;text-underline-offset:4px">${CONTACT_EMAIL}</a> · <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Aravali Reserve, I would like to discuss a private enquiry.')}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:4px">WhatsApp +91 92351 15621</a>`;
  note.style.color='#d3a64f';
  const wa=document.createElement('a');
  wa.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Aravali Reserve, I would like to discuss hospitality, gifting or an event requirement.')}`;
  wa.target='_blank';wa.rel='noopener';wa.className='text-link';wa.textContent='Prefer WhatsApp? Start a private conversation ↗';wa.style.display='inline-block';wa.style.marginTop='14px';
  note.insertAdjacentElement('afterend',wa);
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const data=new FormData(form),name=(data.get('name')||'').toString().trim(),email=(data.get('email')||'').toString().trim(),organisation=(data.get('organisation')||'').toString().trim(),message=(data.get('message')||'').toString().trim();
    const subject=`Aravali Reserve Private Enquiry — ${organisation||name||'Website'}`;
    const body=[`Name: ${name}`,`Email: ${email}`,`Organisation / Event: ${organisation||'—'}`,'',`Requirement:`,message||'—','','Sent from the Aravali Reserve website.'].join('\n');
    note.textContent='Opening your email app with the enquiry prepared for Aravali Reserve…';
    window.location.href=`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

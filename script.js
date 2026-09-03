const nav=document.querySelector('#nav');
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.13});
document.querySelectorAll('.section-reveal').forEach(el=>io.observe(el));
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',scrollY>30);document.querySelectorAll('.parallax').forEach(el=>{const s=parseFloat(el.dataset.speed||0);el.style.transform=`translate3d(0,${scrollY*s}px,0) scale(1.04)`})},{passive:true});
const tilt=document.querySelector('.tilt');
if(tilt){tilt.addEventListener('pointermove',e=>{const r=tilt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`perspective(1200px) rotateY(${x*3}deg) rotateX(${-y*3}deg)`});tilt.addEventListener('pointerleave',()=>tilt.style.transform='')}

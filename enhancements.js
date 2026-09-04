const dropStage=document.querySelector('#dropStage'),dropBottle=dropStage?.querySelector('.drop-bottle');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(dropStage&&dropBottle&&!reduceMotion){
  dropStage.addEventListener('pointermove',e=>{
    const r=dropStage.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    dropBottle.style.transform=`perspective(1200px) rotateY(${x*10}deg) rotateX(${-y*5}deg) translate3d(${x*8}px,${y*5}px,18px)`;
  });
  dropStage.addEventListener('pointerleave',()=>dropBottle.style.transform='');
}
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting) entry.target.classList.add('enhance-visible');
}),{threshold:.18});
document.querySelectorAll('.drop-reveal,.water-film').forEach(el=>revealObserver.observe(el));

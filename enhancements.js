const revealCss=document.createElement('link');revealCss.rel='stylesheet';revealCss.href='reveal-v2.css';document.head.appendChild(revealCss);

const dropStage=document.querySelector('#dropStage');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;

// Replace the earlier CSS orb with a real cinematic bottle-motion plate.
// The bottle artwork itself is never warped or re-generated: motion happens around the locked master bottle.
if(dropStage){
  dropStage.innerHTML=`
    <div class="motion-frame" aria-label="Aravali Reserve cinematic bottle reveal">
      <video class="crystal-reveal-video" autoplay muted loop playsinline preload="metadata" poster="https://d2ol7oe51mr4n9.cloudfront.net/user_3ImSm2PyWO8w1MnjpBunqmh0pvK/e5c0a67a-513c-4a2d-9169-d485d39f9e59.jpg">
        <source src="https://d2ol7oe51mr4n9.cloudfront.net/user_3ImSm2PyWO8w1MnjpBunqmh0pvK/f04d73c1-115c-45ad-b0fd-36f87e66e6f4.mp4" type="video/mp4">
      </video>
      <div class="motion-grade"></div>
      <div class="motion-glass"></div>
      <div class="motion-copy"><span>AR / SIGNATURE MOTION</span><b>WATER · LIGHT · RESERVE</b></div>
      <div class="motion-seal">BORN IN THE ARAVALI</div>
      <i class="motion-line line-a"></i><i class="motion-line line-b"></i>
    </div>`;

  const revealVideo=dropStage.querySelector('.crystal-reveal-video');
  if(reduceMotion){
    revealVideo?.pause();
  }else{
    const playObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting) revealVideo?.play().catch(()=>{}); else revealVideo?.pause();
    }),{threshold:.22});
    playObserver.observe(dropStage);

    dropStage.addEventListener('pointermove',e=>{
      if(!matchMedia('(pointer:fine)').matches) return;
      const r=dropStage.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      const frame=dropStage.querySelector('.motion-frame');
      if(frame) frame.style.transform=`perspective(1500px) rotateY(${x*2.3}deg) rotateX(${-y*1.7}deg) translate3d(${x*3}px,${y*2}px,0)`;
    });
    dropStage.addEventListener('pointerleave',()=>{
      const frame=dropStage.querySelector('.motion-frame');
      if(frame) frame.style.transform='';
    });
  }
}

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting) entry.target.classList.add('enhance-visible');
}),{threshold:.18});
document.querySelectorAll('.drop-reveal,.water-film').forEach(el=>revealObserver.observe(el));

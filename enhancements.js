const revealCss=document.createElement('link');revealCss.rel='stylesheet';revealCss.href='reveal-v2.css';document.head.appendChild(revealCss);

const dropStage=document.querySelector('#dropStage');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;

if(dropStage){
  dropStage.innerHTML=`
    <div class="motion-frame" aria-label="Aravali Reserve cinematic bottle reveal">
      <video class="crystal-reveal-video shot shot-a active" autoplay muted loop playsinline preload="auto" poster="https://d2ol7oe51mr4n9.cloudfront.net/user_3ImSm2PyWO8w1MnjpBunqmh0pvK/e5c0a67a-513c-4a2d-9169-d485d39f9e59.jpg">
        <source src="https://d2ol7oe51mr4n9.cloudfront.net/user_3ImSm2PyWO8w1MnjpBunqmh0pvK/f04d73c1-115c-45ad-b0fd-36f87e66e6f4.mp4" type="video/mp4">
      </video>
      <video class="crystal-reveal-video shot shot-b" muted loop playsinline preload="metadata" poster="https://d2ol7oe51mr4n9.cloudfront.net/user_3ImSm2PyWO8w1MnjpBunqmh0pvK/e5c0a67a-513c-4a2d-9169-d485d39f9e59.jpg">
        <source src="https://d2ol7oe51mr4n9.cloudfront.net/user_3ImSm2PyWO8w1MnjpBunqmh0pvK/4db2f2e5-20f0-47f2-9abd-b0b97967ceb5.mp4" type="video/mp4">
      </video>
      <div class="motion-grade"></div>
      <div class="liquid-caustics"></div>
      <div class="motion-glass"></div>
      <div class="motion-copy"><span>AR / SIGNATURE MOTION</span><b>WATER · LIGHT · RESERVE</b></div>
      <div class="motion-seal">BORN IN THE ARAVALI</div>
      <div class="shot-indicator"><i class="active"></i><i></i></div>
      <i class="motion-line line-a"></i><i class="motion-line line-b"></i>
    </div>`;

  const frame=dropStage.querySelector('.motion-frame');
  const shots=[...dropStage.querySelectorAll('.shot')];
  const dots=[...dropStage.querySelectorAll('.shot-indicator i')];
  let shotIndex=0, shotTimer;

  function showShot(index){
    shotIndex=index%shots.length;
    shots.forEach((v,i)=>{
      const on=i===shotIndex;
      v.classList.toggle('active',on);
      dots[i]?.classList.toggle('active',on);
      if(on&&!reduceMotion) v.play().catch(()=>{}); else v.pause();
    });
  }
  function startSequence(){
    if(reduceMotion||shots.length<2) return;
    clearInterval(shotTimer);
    shots[shotIndex]?.play().catch(()=>{});
    shotTimer=setInterval(()=>showShot(shotIndex+1),5200);
  }
  function stopSequence(){clearInterval(shotTimer);shots.forEach(v=>v.pause())}

  if(reduceMotion){shots.forEach((v,i)=>{if(i>0)v.remove()});}
  else{
    const playObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting) startSequence(); else stopSequence();
    }),{threshold:.28});
    playObserver.observe(dropStage);

    dropStage.addEventListener('pointermove',e=>{
      if(!matchMedia('(pointer:fine)').matches) return;
      const r=dropStage.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      if(frame) frame.style.transform=`perspective(1600px) rotateY(${x*1.6}deg) rotateX(${-y*1.1}deg) translate3d(${x*2}px,${y*1.5}px,0)`;
    });
    dropStage.addEventListener('pointerleave',()=>{if(frame)frame.style.transform=''});
  }
}

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting) entry.target.classList.add('enhance-visible');
}),{threshold:.18});
document.querySelectorAll('.drop-reveal,.water-film').forEach(el=>revealObserver.observe(el));

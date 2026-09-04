const revealCss=document.createElement('link');revealCss.rel='stylesheet';revealCss.href='reveal-v2.css?v=video5';document.head.appendChild(revealCss);
const dropStage=document.querySelector('#dropStage');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const SECOND_VIDEO='https://d2ol7oe51mr4n9.cloudfront.net/user_3ImSm2PyWO8w1MnjpBunqmh0pvK/99da2cc5-e713-4334-bd59-c2a8c8dfd6bf.mp4';
if(dropStage){
 dropStage.innerHTML=`<div class="signature-video-stage"><video class="signature-user-video" autoplay muted loop playsinline preload="auto"><source src="${SECOND_VIDEO}" type="video/mp4"></video></div>`;
 const v=dropStage.querySelector('video');
 if(reduceMotion)v?.pause();
 else new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?v?.play().catch(()=>{}):v?.pause()),{threshold:.18}).observe(dropStage);
}
const revealObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('enhance-visible')}),{threshold:.18});document.querySelectorAll('.drop-reveal,.water-film').forEach(el=>revealObserver.observe(el));
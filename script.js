document.documentElement.classList.add('js');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold: .1}); document.querySelectorAll('.reveal').forEach(element => observer.observe(element)); } else document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
let queued = false;
function updateScroll() { const distance = document.documentElement.scrollHeight - innerHeight; document.querySelector('.progress').style.width = `${distance > 0 ? scrollY / distance * 100 : 0}%`; if (!reducedMotion) {
 const proof = document.querySelector('.proof-metrics');
 const final = document.querySelector('.final-cta');
 const rect = proof.getBoundingClientRect();
 proof.style.setProperty('--proof-shift', `${Math.max(-12, Math.min(12, (innerHeight / 2 - rect.top) * .025))}px`);
 const r = final.getBoundingClientRect();
 final.style.setProperty('--flower-turn', `${Math.max(-25, Math.min(65, (innerHeight - r.top) * .06))}deg`);
 const hero = document.querySelector('.hero');
 hero.style.setProperty('--hero-drift', `${Math.min(28, scrollY * .045)}px`);
 const visual = document.querySelector('.visual-manifesto');
 const vr = visual.getBoundingClientRect();
 visual.style.setProperty('--editorial-drift', `${Math.max(-16, Math.min(16, (innerHeight / 2 - vr.top) * .035))}px`);
 } queued = false; }
addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(updateScroll); } }, {passive: true});
updateScroll();
if (!reducedMotion && matchMedia('(pointer:fine)').matches) { const hero = document.querySelector('.hero'); const art = document.querySelector('.hero-art'); hero.addEventListener('pointermove', event => { const box = hero.getBoundingClientRect(); art.style.transform = `translate(${(event.clientX / box.width - .5) * 15}px, ${(event.clientY / box.height - .5) * 10}px)`; }); hero.addEventListener('pointerleave', () => art.style.transform = ''); }
document.querySelector('#year').textContent = new Date().getFullYear();

if (!reducedMotion && matchMedia('(pointer:fine)').matches) {
 document.querySelectorAll('.pill').forEach(button => {
 button.addEventListener('pointermove', event => { const r = button.getBoundingClientRect(); button.style.transform = `translate(${(event.clientX-r.left-r.width/2)*.08}px, ${(event.clientY-r.top-r.height/2)*.12}px)`; });
 button.addEventListener('pointerleave', () => button.style.transform = '');
 });
}

// Native details remain usable without JavaScript; animate only panel contents.
const treatments = [...document.querySelectorAll('.treatment')];
treatments.forEach(item => {
 item.addEventListener('toggle', () => {
  if (!item.open || reducedMotion) return;
  item.querySelector('.treatment-content').animate(
   [{opacity:0, transform:'translateY(12px)'},{opacity:1, transform:'translateY(0)'}],
   {duration:650, easing:'cubic-bezier(.2,.65,.3,1)'}
  );
 });
});

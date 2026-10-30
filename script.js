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

// Respostas ficam apenas na página até a pessoa decidir enviá-las no WhatsApp.
const quizForm = document.querySelector('#care-quiz-form');
const quizSteps = [...quizForm.querySelectorAll('.quiz-step')];
const quizNext = quizForm.querySelector('.quiz-next');
const quizBack = quizForm.querySelector('.quiz-back');
const quizReview = quizForm.querySelector('.quiz-review');
const quizError = quizForm.querySelector('.quiz-error');
let quizIndex = 0;
function showQuizStep(index, focus = true) {
  quizIndex = index;
  quizError.textContent = '';
  quizSteps.forEach((step, i) => { step.hidden = i !== index; });
  const reviewing = index === quizSteps.length;
  quizReview.hidden = !reviewing;
  quizNext.hidden = reviewing;
  quizBack.hidden = index === 0 || reviewing;
  quizForm.querySelector('.quiz-counter').textContent = reviewing ? 'SUAS ESCOLHAS · PRONTO PARA CONVERSAR' : `PERGUNTA ${index + 1} DE ${quizSteps.length}`;
  quizForm.querySelector('.quiz-track span').style.width = `${reviewing ? 100 : ((index + 1) / quizSteps.length) * 100}%`;
  quizNext.firstChild.textContent = index === quizSteps.length - 1 ? 'CONFERIR RESPOSTAS ' : 'CONTINUAR ';
  if (focus) {
    const heading = reviewing ? quizReview.querySelector('h3') : quizSteps[index].querySelector('legend');
    heading.tabIndex = -1;
    heading.focus({preventScroll:true});
  }
}
quizNext.addEventListener('click', () => {
  const selected = quizSteps[quizIndex].querySelector('input:checked');
  if (!selected) {
    quizError.textContent = 'Escolha uma opção para continuar.';
    quizSteps[quizIndex].querySelector('input').focus({preventScroll:true});
    return;
  }
  if (quizIndex === quizSteps.length - 1) {
    const answers = new FormData(quizForm);
    const labels = ['Cuidado de interesse', 'O que procuro', 'Quando gostaria'];
    const values = ['care', 'goal', 'timing'].map(name => answers.get(name));
    const summary = quizReview.querySelector('dl');
    summary.replaceChildren();
    labels.forEach((label, i) => {
      const dt = document.createElement('dt'); dt.textContent = label;
      const dd = document.createElement('dd'); dd.textContent = values[i];
      summary.append(dt, dd);
    });
    const text = 'Olá! Vim pelo site da Pele Nua e respondi ao miniquestionário.\n\n' + labels.map((label, i) => `${label}: ${values[i]}`).join('\n') + '\n\nPodem me ajudar com o próximo passo?';
    quizReview.querySelector('.quiz-whatsapp').href = `https://wa.me/5547996740403?text=${encodeURIComponent(text)}`;
  }
  showQuizStep(quizIndex + 1);
});
quizBack.addEventListener('click', () => showQuizStep(quizIndex - 1));
quizForm.querySelector('.quiz-edit').addEventListener('click', () => showQuizStep(0));
quizForm.addEventListener('change', () => { quizError.textContent = ''; });
quizForm.addEventListener('submit', event => { event.preventDefault(); if (quizIndex < quizSteps.length) quizNext.click(); });
showQuizStep(0, false);

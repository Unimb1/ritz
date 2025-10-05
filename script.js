document.addEventListener('DOMContentLoaded', function(){
  // Year
  const yearEl = document.querySelector('footer .container div');
  if(yearEl){ const d = new Date(); yearEl.textContent = '© ' + d.getFullYear() + ' Ritz — Оформление документов'; }

  // Fade-in on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold:0.15});
  document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));

  // Mobile menu
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav-menu');
  if(burger && nav){
    burger.addEventListener('click', ()=>{
      nav.classList.toggle('open');
      burger.innerHTML = nav.classList.contains('open') ? '<i class="bi bi-x"></i>' : '<i class="bi bi-list"></i>';
    });
  }

  // Simple form handler for consult page
  const consult = document.getElementById('consult-form');
  if(consult){
    consult.addEventListener('submit', function(e){
      e.preventDefault();
      alert('Спасибо! Ваша заявка отправлена. (Это демонстрация — подключите бэкенд для реальной отправки)');
      consult.reset();
    });
  }
});
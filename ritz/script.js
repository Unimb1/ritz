
document.addEventListener('DOMContentLoaded', function(){
  // set year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // Intersection observer for fade-in
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible'); });
  }, {threshold:0.12});
  document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));

  // burger menu
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav-menu');
  if(burger && nav){
    burger.addEventListener('click', ()=>{
      nav.classList.toggle('open');
      burger.innerHTML = nav.classList.contains('open') ? '<i class="bi bi-x"></i>' : '<i class="bi bi-list"></i>';
      if(nav.classList.contains('open')){ nav.style.display='flex'; } else { nav.style.display=''; }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  // consult form demo handler
  const consult = document.getElementById('consult-form');
  if(consult){
    consult.addEventListener('submit', function(e){
      e.preventDefault();
      alert('Спасибо! Ваша заявка принята (демо).');
      consult.reset();
    });
  }
});

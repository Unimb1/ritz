document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('year').textContent=new Date().getFullYear();

  // Анимация появления при скролле
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
  },{threshold:0.2});
  document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

  // Мобильное меню
  const burger=document.getElementById('burger');
  const nav=document.getElementById('nav-menu');
  burger.addEventListener('click',()=>{
    nav.classList.toggle('open');
    burger.innerHTML=nav.classList.contains('open')?'<i class="bi bi-x"></i>':'<i class="bi bi-list"></i>';
  });
});

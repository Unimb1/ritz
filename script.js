
document.addEventListener('DOMContentLoaded', function(){
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', ()=>{ if(window.scrollY>40) header.classList.add('scrolled'); else header.classList.remove('scrolled'); });
  // dropdown
  document.querySelectorAll('.dropdown-toggle').forEach(btn=>{
    btn.addEventListener('mouseenter', ()=>{ const panel=btn.nextElementSibling; panel && panel.classList.add('show'); });
    btn.parentElement.addEventListener('mouseleave', ()=>{ const panel=btn.nextElementSibling; panel && panel.classList.remove('show'); });
    btn.addEventListener('click', (e)=>{ e.preventDefault(); const panel=btn.nextElementSibling; panel && panel.classList.toggle('show'); });
  });
  // fade-up observer
  const io = new IntersectionObserver((entries)=>{ entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); } }); }, {threshold:0.12});
  document.querySelectorAll('.fade-up').forEach(el=>io.observe(el));
  // news clickable
  document.querySelectorAll('.news-card').forEach(card=>{ card.addEventListener('click', ()=>{ const href = card.getAttribute('data-href'); if(href) window.location.href = href; }); });
  // forms (Formspree or mailto)
  document.querySelectorAll('form[data-formspree]').forEach(form=>{
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const action = form.getAttribute('data-formspree')||'';
      const fd = new FormData(form);
      if(action && action.includes('formspree')){
        fetch(action, {method:'POST', body:fd, headers:{'Accept':'application/json'}}).then(()=>{ alert('Спасибо! Ваша заявка отправлена.'); form.reset(); }).catch(()=>{ alert('Ошибка отправки.'); });
      } else {
        const mail = 'example@mail.ru';
        let body='';
        fd.forEach((v,k)=> body += k+': '+v+'\n');
        window.location.href = 'mailto:'+mail+'?subject='+encodeURIComponent('Заявка с Ritz')+'&body='+encodeURIComponent(body);
      }
    });
  });
  // Account: LocalStorage based
  function saveUser(user){ localStorage.setItem('ritz_user', JSON.stringify(user)); }
  function getUser(){ return JSON.parse(localStorage.getItem('ritz_user')||'null'); }
  const reg = document.getElementById('register-form');
  if(reg){ reg.addEventListener('submit', function(e){ e.preventDefault(); const d=new FormData(reg); const user={name:d.get('name'),email:d.get('email')}; saveUser(user); alert('Регистрация завершена'); window.location.href='profile.html'; }); }
  const login = document.getElementById('login-form');
  if(login){ login.addEventListener('submit', function(e){ e.preventDefault(); const d=new FormData(login); const email=d.get('email'); const u=getUser(); if(u && u.email===email){ alert('Вход успешен'); window.location.href='profile.html'; } else { alert('Пользователь не найден'); } }); }
  // profile render
  const profileRoot = document.getElementById('profile-root');
  if(profileRoot){
    const u = getUser();
    if(!u){ profileRoot.innerHTML='<p>Вы не вошли. <a href="login.html">Войти</a> / <a href="register.html">Регистрация</a></p>'; }
    else{
      const initials = u.name ? u.name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase() : 'U';
      profileRoot.innerHTML = `<div class='account-wrap'><div class='account-side'><div class='avatar'>${initials}</div><h3 style='margin-top:12px'>${u.name}</h3><p class='muted'>${u.email}</p><hr><h4>Мои заявки</h4><ul id='app-list' class='app-list'></ul></div><div class='account-main'><h2>Добро пожаловать, ${u.name.split(' ')[0]}</h2><p class='muted'>Здесь вы можете отслеживать статус заявок.</p><div id='app-main'></div></div></div>`;
      const apps = JSON.parse(localStorage.getItem('ritz_apps')||'[]');
      const list = document.getElementById('app-list');
      if(apps.length===0) list.innerHTML='<p class="muted">Заявок пока нет.</p>';
      apps.forEach(app=>{ const li=document.createElement('li'); li.className='app-item'; li.innerHTML = `<div><strong>${app.title}</strong><div class='muted' style='font-size:12px'>${app.date}</div></div><div><a class='btn' href='app.html?id=${app.id}'>Открыть</a></div>`; list.appendChild(li); });
    }
  }
  // app page render
  const appRoot = document.getElementById('app-root');
  if(appRoot){
    const params = new URLSearchParams(window.location.search); const id = params.get('id');
    const apps = JSON.parse(localStorage.getItem('ritz_apps')||'[]');
    const app = apps.find(a=>a.id===id);
    if(!app){ appRoot.innerHTML='<p>Заявка не найдена.</p>'; }
    else{
      const steps = ['received','processing','ready','completed'];
      const current = steps.indexOf(app.status);
      let html = `<h1>${app.title}</h1><p class='muted'>Дата: ${app.date}</p><div class='roadmap'>`;
      steps.forEach((s,i)=>{ const cls = i<=current ? 'step active' : 'step'; if(i===steps.length-1) cls += ' last'; html += `<div class='${cls}'>${s.toUpperCase()}</div>`; });
      html += `</div><p>Текущий статус: <strong>${app.status}</strong></p><p>Дополнительная информация будет здесь.</p>`;
      appRoot.innerHTML = html;
    }
  }
});



// Phone input hygiene: allow + and digits only, enforce 10-15 digits
function cleanPhone(s){ return (s||'').replace(/[^+\d]/g,''); }
function isValidPhone(s){ const digits = s.replace(/\D/g,''); return digits.length >= 10 && digits.length <= 15; }
document.addEventListener('input', function(e){
  if(e.target && (e.target.id === 'phone-full' || e.target.name === 'phone' || e.target.matches('input[type="tel"]'))){
    e.target.value = cleanPhone(e.target.value);
  }
});
document.addEventListener('submit', function(e){
  const form = e.target;
  if(form && (form.id === 'consult-form-full' || form.id === 'consult-form-hero' || form.id === 'register-form')){
    const phone = form.querySelector('input[name="phone"]');
    if(phone && !isValidPhone(phone.value)){ e.preventDefault(); alert('Пожалуйста, введите корректный номер телефона (10–15 цифр).'); phone.focus(); return false; }
  }
}, true);



// PREMIUM roadmap rendering for app page (upgraded)
(function(){ const appRoot = document.getElementById('app-root'); if(!appRoot) return; const params = new URLSearchParams(window.location.search); const id = params.get('id'); const apps = JSON.parse(localStorage.getItem('ritz_apps')||'[]'); const app = apps.find(a=>a.id===id); if(!app) return; const steps = ['Получено','В обработке','Готово к выдаче','Завершено']; const current = Math.max(0, Math.min(steps.length-1, steps.indexOf(app.status)||0)); let html = '<div class="premium-track"><div class="premium-steps">'; steps.forEach((s,i)=>{ const cls = i<=current ? 'premium-step completed' : 'premium-step'; const icon = i+1; html += `<div class="${cls}"><div class="icon">${icon}</div><h4>${s}</h4><p class="muted">Шаг ${i+1} из ${steps.length}</p></div>` }); html += `</div><div class="premium-progress"><div class="bar" style="width:${Math.round((current/(steps.length-1))*100)}%"></div></div></div><div class="premium-note">Текущий статус: <strong>${app.status}</strong></div>`; appRoot.innerHTML = `<h1>${app.title}</h1><p class='muted'>Дата: ${app.date}</p>` + html; })();

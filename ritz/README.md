# ritz-site-v2
Многостраничный шаблон сайта Ritz — готов к загрузке на GitHub Pages.

### Замены логотипа и фоновой картинки
- Логотип: замените файл `/assets/logo-placeholder.png` на ваш логотип (оставьте название файла одинаковым или обновите `src` в header).
- Фоновая картинка в шапке: замените `/assets/bg-blur.png` — это текущая размытная заглушка. В CSS (styles.css) в селекторе `.hero-with-bg::before` будет путь к изображению: `url('/assets/bg-blur.png')`.

### Страницы
- `/index.html` — главная
- `/about.html` — о нас
- `/consult.html` — запись на консультацию (форма)
- `/news.html` — новости (список статей)
- `/contacts.html` — контакты
- `/countries/germany.html`, `/countries/italy.html`, `/countries/cyprus.html`, `/countries/france.html` — страницы стран (единый шаблон)

### Как опубликовать
1. Создайте репозиторий `ritz-site` на GitHub.
2. Загрузите содержимое этого архива в корень репозитория.
3. Включите GitHub Pages: Settings → Pages → Deploy from a branch → Branch: `main`, Folder: `/ (root)`.

---
Цветовая схема была извлечена из вашего PDF: основной акцент `#1D3FC7`, светлый оттенок `#B1C2FF`.

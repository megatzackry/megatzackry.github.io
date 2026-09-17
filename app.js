/* Megat Irfan Zackry portfolio behaviour.
   Loaded with `defer`, so the DOM is ready by the time this runs. */

/* Sticky header state */
(function () {
  const hero = document.getElementById('hero');
  if (!hero) return;
  let ticking = false;
  function update() {
    hero.classList.toggle('is-compact', window.scrollY > 24);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

/* Active nav link */
(function () {
  const links = Array.from(document.querySelectorAll('.site-nav a'));
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.removeAttribute('aria-current'));
      const active = links.find(a => a.getAttribute('href') === '#' + entry.target.id);
      if (active) active.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => io.observe(s));
})();

/* Typed role in the hero */
(function () {
  const roles = ['Software Engineer', 'System Architect', 'Automation Developer'];
  const el = document.getElementById('typed');
  if (!el) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let roleIndex = 0, charIndex = roles[0].length, deleting = true;
  const TYPE_MS = 75, DELETE_MS = 40, HOLD_MS = 1600, GAP_MS = 400;

  function tick() {
    const word = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) { deleting = true; return setTimeout(tick, HOLD_MS); }
      return setTimeout(tick, TYPE_MS);
    }
    charIndex--;
    el.textContent = word.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      return setTimeout(tick, GAP_MS);
    }
    return setTimeout(tick, DELETE_MS);
  }
  setTimeout(tick, HOLD_MS);
})();

/* Tech stack marquee.
   Icons come from jsDelivr rather than raw.githubusercontent.com: raw is not a CDN,
   it is rate limited and it serves from a moving branch head. */
(function () {
  const DEVICON = (slug, variant) =>
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-${variant}.svg`;
  const SIMPLE = (slug) =>
    `https://cdn.jsdelivr.net/npm/simple-icons/icons/${slug}.svg`;

  const skills = [
    { name: 'C#', src: DEVICON('csharp', 'original') },
    { name: 'C++', src: DEVICON('cplusplus', 'original') },
    { name: 'CSS', src: DEVICON('css3', 'original') },
    { name: 'PHP', src: DEVICON('php', 'original') },
    { name: 'HTML', src: DEVICON('html5', 'original') },
    { name: 'React', src: DEVICON('react', 'original') },
    { name: 'Dart', src: DEVICON('dart', 'original') },
    { name: 'PowerShell', src: DEVICON('powershell', 'original') },
    { name: 'Python', src: DEVICON('python', 'original') },
    { name: 'SQL', src: DEVICON('mysql', 'original') },
    { name: 'Java', src: DEVICON('java', 'original') },
    { name: 'jQuery', src: DEVICON('jquery', 'original') },
    { name: 'JavaScript', src: DEVICON('javascript', 'original') },
    { name: 'TypeScript', src: DEVICON('typescript', 'original') },
    { name: 'ASP.NET', src: DEVICON('dotnetcore', 'original') },
    { name: 'Node.js', src: DEVICON('nodejs', 'original') },
    { name: 'Flutter', src: DEVICON('flutter', 'original') },
    { name: 'Django', src: DEVICON('django', 'plain') },
    { name: 'Next.js', src: DEVICON('nextjs', 'original') },
    { name: 'Spring Boot', src: SIMPLE('springboot') },
    { name: 'AWS', src: DEVICON('amazonwebservices', 'original-wordmark') },
    { name: 'Anaconda', src: DEVICON('anaconda', 'original') },
    { name: 'Android Studio', src: DEVICON('androidstudio', 'original') },
    { name: 'Burp Suite', src: SIMPLE('burpsuite') },
    { name: 'Enterprise Architect', src: null, glyph: 'ea' },
    { name: 'GitHub Actions', src: SIMPLE('github') },
    { name: 'Google Apps Script', src: SIMPLE('googleappsscript') },
    { name: 'Jupyter Notebook', src: DEVICON('jupyter', 'original') },
    { name: 'Power Platform', src: null, glyph: 'pp' },
    { name: 'VirtualBox', src: SIMPLE('virtualbox') },
    { name: 'VS Code', src: DEVICON('vscode', 'original') },
    { name: 'VBA', src: DEVICON('visualbasic', 'original') },
  ];

  const glyphs = {
    ea: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="8.5" y="14" width="7" height="7" rx="1"/><path d="M6.5 10v3a1 1 0 0 0 1 1H10M17.5 10v3a1 1 0 0 0-1 1h-2"/></svg>',
    pp: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="5" cy="12" r="2.3"/><circle cx="19" cy="5" r="2.3"/><circle cx="19" cy="19" r="2.3"/><path d="M7 11l10-4.5M7 13l10 4.5"/></svg>',
  };

  const listEl = document.getElementById('skillsList');
  if (listEl) listEl.innerHTML = skills.map(s => `<li>${s.name}</li>`).join('');

  function cardHTML(s) {
    const initials = s.name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase();
    const inner = s.src
      ? `<img src="${s.src}" alt="" loading="lazy" decoding="async" data-initials="${initials}" />`
      : glyphs[s.glyph];
    return `<div class="skill-card">
      <span class="icon-chip">${inner}</span>
      <span class="skill-name">${s.name}</span>
    </div>`;
  }

  const track = document.getElementById('marqueeTrack');
  if (!track) return;
  const html = skills.map(cardHTML).join('');
  track.innerHTML = html + html;

  /* If an icon fails to load, fall back to initials instead of a broken image box. */
  track.querySelectorAll('.icon-chip img').forEach(img => {
    img.addEventListener('error', () => {
      const chip = img.parentElement;
      chip.textContent = img.dataset.initials || '';
      chip.classList.add('icon-chip-fallback');
    }, { once: true });
  });
})();

/* Metric counters */
(function () {
  const config = [
    { id: 'days', duration: 1500 },
    { id: 'weeks', duration: 2000 },
    { id: 'stars', duration: 2500 },
    { id: 'subs', duration: 3200 }
  ];

  const counters = [];
  config.forEach(item => {
    const el = document.getElementById(item.id);
    if (!el) return;
    const targetValue = parseInt(el.textContent.replace(/,/g, ''), 10);
    if (Number.isNaN(targetValue)) return;
    counters.push({ el, targetValue, duration: item.duration });
  });

  const metricsContainer = document.querySelector('.metrics');
  if (!counters.length || !metricsContainer) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  counters.forEach(c => { c.el.textContent = '0'; });

  function startCounters() {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      let allDone = true;
      counters.forEach(counter => {
        if (elapsed < counter.duration) {
          allDone = false;
          const progress = elapsed / counter.duration;
          const easeOut = progress * (2 - progress);
          counter.el.textContent = Math.floor(counter.targetValue * easeOut).toLocaleString();
        } else {
          counter.el.textContent = counter.targetValue.toLocaleString();
        }
      });
      if (!allDone) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounters();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(metricsContainer);
})();

/* Footer social icons */
(function () {
  const icons = {
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg>',
    threads: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/></svg>',
  };

  const links = [
    { label: 'Email', href: 'mailto:megatirfanzackry@gmail.com', icon: 'email' },
    { label: 'WhatsApp', href: 'https://api.whatsapp.com/send/?phone=601111934097', icon: 'whatsapp' },
    { label: 'Telegram', href: 'https://telegram.me/megatz', icon: 'telegram' },
    { label: 'X (Twitter)', href: 'https://x.com/megatzackry', icon: 'x' },
    { label: 'Threads', href: 'https://www.threads.com/@megatzackry', icon: 'threads' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@megatzackry', icon: 'tiktok' },
  ];

  const list = document.getElementById('socialList');
  if (!list) return;
  list.innerHTML = links.map(l => {
    const isMail = l.href.startsWith('mailto:');
    const attrs = isMail ? '' : ' target="_blank" rel="noopener noreferrer"';
    return `<li><a href="${l.href}" aria-label="${l.label}"${attrs}>${icons[l.icon]}</a></li>`;
  }).join('');
})();

/* Background timeline: reveal cards and drive the path dot on scroll */
(function () {
  const track = document.getElementById('academicTrack');
  if (!track) return;

  const bgPath = track.querySelector('.path-bg');
  const progressPath = document.getElementById('academicProgress');
  const dot = document.getElementById('academicDot');
  const items = document.querySelectorAll('.academic-item');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion && 'IntersectionObserver' in window) {
    items.forEach(i => i.classList.remove('in-view'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('in-view', entry.isIntersecting);
      });
    }, { threshold: 0.3, rootMargin: '-8% 0px -8% 0px' });
    items.forEach(item => io.observe(item));
  }
  if (reduceMotion) return;

  const totalLength = bgPath.getTotalLength();
  progressPath.style.strokeDasharray = String(totalLength);
  progressPath.style.strokeDashoffset = String(totalLength);

  let ticking = false;
  function updateDot() {
    const rect = track.getBoundingClientRect();
    const start = window.innerHeight * 0.65;
    const span = rect.height;
    let progress = span !== 0 ? (start - rect.top) / span : 0;
    progress = Math.max(0, Math.min(1, progress));

    const pt = bgPath.getPointAtLength(progress * totalLength);
    dot.setAttribute('cx', pt.x);
    dot.setAttribute('cy', pt.y);
    progressPath.style.strokeDashoffset = String(totalLength * (1 - progress));
    ticking = false;
  }
  function onScroll() {
    if (!ticking) { requestAnimationFrame(updateDot); ticking = true; }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateDot();
})();
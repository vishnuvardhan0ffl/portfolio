/* ============================================================
   Vishnu Vardhan Manikandan, portfolio interactions
   ============================================================ */
(function () {
  'use strict';

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.prototype.slice.call((c || document).querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- theme ---------- */
  const html = document.documentElement;
  const toggle = $('#themeToggle');
  const themeLabel = $('#themeLabel');

  function setTheme(t) {
    html.setAttribute('data-theme', t);
    if (themeLabel) themeLabel.textContent = t === 'dark' ? 'Dark' : 'Light';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0B1520' : '#FBF8F3');
    try { localStorage.setItem('vv-theme', t); } catch (e) {}
  }
  let stored = null;
  try { stored = localStorage.getItem('vv-theme'); } catch (e) {}
  setTheme(stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  if (toggle) toggle.addEventListener('click', function () {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    drawHeat();
  });

  /* ---------- scroll progress + sticky nav + active link ---------- */
  const bar = $('#scrollBar');
  const nav = $('#nav');
  const navLinks = $$('.nav-links a');
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  let ticking = false;
  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('stuck', y > 40);

    let current = null;
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top <= window.innerHeight * 0.35) current = sec.id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const burger = $('#burger');
  const menu = $('#mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      const open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      menu.hidden = open;
      document.body.style.overflow = open ? '' : 'hidden';
    });
    $$('a', menu).forEach(a => a.addEventListener('click', function () {
      burger.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      document.body.style.overflow = '';
    }));
  }

  /* ---------- reveal on scroll ---------- */
  const revealables = $$('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('in'));
  }

  /* ---------- hero: parallax + word rotator ---------- */
  const heroMedia = $('#heroMedia');
  if (heroMedia && !reduced && window.matchMedia('(pointer:fine)').matches) {
    const img = $('img', heroMedia);
    window.addEventListener('mousemove', function (e) {
      const dx = (e.clientX / window.innerWidth - 0.5) * 14;
      const dy = (e.clientY / window.innerHeight - 0.5) * 10;
      if (img) img.style.transform = 'scale(1.08) translate3d(' + dx + 'px,' + dy + 'px,0)';
    }, { passive: true });
  }

  const rotWord = $('#rotWord');
  if (rotWord && !reduced) {
    const words = ['market sizing', 'sensitivity checks', 'forecasting', 'dashboards in R Shiny',
                   'predictive modelling', 'SQL at 11pm'];
    let i = 0;
    setInterval(function () {
      rotWord.classList.add('out');
      setTimeout(function () {
        i = (i + 1) % words.length;
        rotWord.textContent = words[i];
        rotWord.classList.remove('out');
      }, 450);
    }, 2800);
  }

  /* ---------- animated counters ---------- */
  const counters = $$('[data-count]');
  function runCounter(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    if (reduced) { el.textContent = target.toLocaleString('en-AU'); return; }
    const dur = 1500;
    const t0 = performance.now();
    (function step(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-AU');
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { runCounter(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => co.observe(el));
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- case filters ---------- */
  const chips = $$('.chip');
  const cases = $$('.case');
  const emptyNote = $('#emptyNote');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-selected', 'false'); });
      chip.classList.add('is-active');
      chip.setAttribute('aria-selected', 'true');
      const f = chip.getAttribute('data-filter');
      let shown = 0;
      cases.forEach(function (card) {
        const tags = (card.getAttribute('data-tags') || '').split(/\s+/);
        const match = f === 'all' || tags.indexOf(f) !== -1;
        card.classList.toggle('hide', !match);
        if (match) shown++;
      });
      if (emptyNote) emptyNote.hidden = shown !== 0;
    });
  });

  /* ---------- case disclosure ---------- */
  $$('.disclose').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const detail = btn.parentNode.querySelector('.case-detail');
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (detail) detail.hidden = open;
      $('.disclose-label', btn).textContent = open ? 'Open case file' : 'Close case file';
    });
  });

  /* ---------- skill tabs ---------- */
  const stabs = $$('.stab');
  const spanels = $$('.spanel');
  stabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      stabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const g = tab.getAttribute('data-group');
      spanels.forEach(p => p.classList.toggle('is-active', p.getAttribute('data-group') === g));
    });
  });

  /* ============================================================
     SCENARIO STUDIO
     Homes → corridor share → pool adoption → channel share
     ============================================================ */
  const DEFAULTS = { homes: 13500, corridor: 35, adopt: 8, share: 15, price: 55000, margin: 30 };

  const inputs = {
    homes:    $('#sHomes'),
    corridor: $('#sCorridor'),
    adopt:    $('#sAdopt'),
    share:    $('#sShare'),
    price:    $('#sPrice'),
    margin:   $('#sMargin')
  };
  const readouts = {
    homes:    $('#vHomes'),
    corridor: $('#vCorridor'),
    adopt:    $('#vAdopt'),
    share:    $('#vShare'),
    price:    $('#vPrice'),
    margin:   $('#vMargin')
  };
  const heat = $('#heat');
  const heatRead = $('#heatRead');
  const tornado = $('#tornado');

  const AUD0 = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
  const INT  = new Intl.NumberFormat('en-AU', { maximumFractionDigits: 0 });

  function money(n) {
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(n >= 1e7 ? 1 : 2) + 'M';
    if (n >= 1e3) return '$' + Math.round(n / 1e3) + 'k';
    return AUD0.format(n);
  }
  function vals() {
    return {
      homes:    +inputs.homes.value,
      corridor: +inputs.corridor.value,
      adopt:    +inputs.adopt.value,
      share:    +inputs.share.value,
      price:    +inputs.price.value,
      margin:   +inputs.margin.value
    };
  }
  function model(v) {
    const corridorHomes = v.homes * (v.corridor / 100);
    const pools = corridorHomes * (v.adopt / 100);
    const won   = pools * (v.share / 100);
    const rev   = won * v.price;
    const gp    = rev * (v.margin / 100);
    return { corridorHomes: corridorHomes, pools: pools, won: won, rev: rev, gp: gp };
  }

  // heatmap axes
  const ADOPT_MIN = 2, ADOPT_MAX = 16, SHARE_MIN = 2, SHARE_MAX = 45;
  const COLS = 14, ROWS = 9;

  function rampColor(t) {
    // 0 → deep teal-ink, 0.6 → teal, 1 → amber
    t = Math.max(0, Math.min(1, t));
    const stops = [
      { p: 0.00, c: [18, 48, 59] },
      { p: 0.45, c: [31, 161, 146] },
      { p: 0.75, c: [45, 212, 191] },
      { p: 1.00, c: [232, 163, 61] }
    ];
    let a = stops[0], b = stops[stops.length - 1];
    for (let i = 0; i < stops.length - 1; i++) {
      if (t >= stops[i].p && t <= stops[i + 1].p) { a = stops[i]; b = stops[i + 1]; break; }
    }
    const f = (t - a.p) / Math.max(b.p - a.p, 1e-6);
    const ch = [0, 1, 2].map(i => Math.round(a.c[i] + (b.c[i] - a.c[i]) * f));
    return 'rgb(' + ch.join(',') + ')';
  }

  let heatCells = [];

  function drawHeat() {
    if (!heat) return;
    const v = vals();
    const ctx = heat.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const cssW = heat.clientWidth || 620;
    const cssH = Math.round(cssW * 0.52);
    heat.width = cssW * dpr;
    heat.height = cssH * dpr;
    heat.style.height = cssH + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const gap = 2;
    const cw = (cssW - gap * (COLS - 1)) / COLS;
    const chh = (cssH - gap * (ROWS - 1)) / ROWS;

    // max value = top-right corner
    const maxGp = model({ homes: v.homes, corridor: v.corridor, adopt: ADOPT_MAX,
                          share: SHARE_MAX, price: v.price, margin: v.margin }).gp;

    heatCells = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const adopt = ADOPT_MIN + (ADOPT_MAX - ADOPT_MIN) * (c / (COLS - 1));
        const share = SHARE_MAX - (SHARE_MAX - SHARE_MIN) * (r / (ROWS - 1));
        const gp = model({ homes: v.homes, corridor: v.corridor, adopt: adopt,
                           share: share, price: v.price, margin: v.margin }).gp;
        const t = maxGp > 0 ? gp / maxGp : 0;
        const x = c * (cw + gap), y = r * (chh + gap);
        ctx.fillStyle = rampColor(Math.pow(t, 0.72));
        ctx.fillRect(x, y, cw, chh);
        heatCells.push({ x: x, y: y, w: cw, h: chh, adopt: adopt, share: share, gp: gp });
      }
    }

    // marker for the current assumption
    const cx = ((v.adopt - ADOPT_MIN) / (ADOPT_MAX - ADOPT_MIN)) * cssW;
    const cy = (1 - (v.share - SHARE_MIN) / (SHARE_MAX - SHARE_MIN)) * cssH;
    if (cx >= 0 && cx <= cssW && cy >= 0 && cy <= cssH) {
      ctx.strokeStyle = 'rgba(242,237,228,.92)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(242,237,228,.92)'; ctx.fill();
    }
  }

  if (heat) {
    heat.addEventListener('mousemove', function (e) {
      const rect = heat.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const cell = heatCells.find(c => x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h);
      if (cell && heatRead) {
        heatRead.textContent = 'adoption ' + cell.adopt.toFixed(1) + '%  ·  share ' +
          cell.share.toFixed(0) + '%  →  gross profit ' + money(cell.gp) + ' / yr';
      }
    });
    heat.addEventListener('mouseleave', function () {
      if (heatRead) heatRead.textContent = 'Hover the grid to read a cell.';
    });
  }

  /* A tornado is only informative if each driver is swung across its own
     plausible range. In a purely multiplicative model a uniform ±20% makes
     every bar identical, which tells you nothing. So each driver below gets
     the range the evidence actually supports. */
  function drawTornado(v) {
    if (!tornado) return;
    const drivers = [
      { k: 'homes',    name: 'New homes / yr',  lo: 12000,          hi: 15000,
        label: '12.0k – 15.0k',   note: 'completions 13,514 · approvals 14,863' },
      { k: 'corridor', name: 'Corridor share',  lo: 25,             hi: 50,
        label: '25 – 50%',        note: 'northern growth corridors' },
      { k: 'adopt',    name: 'Adoption rate',   lo: 4,              hi: 14,
        label: '4 – 14%',         note: 'Roy Morgan 13–14% is the ceiling' },
      { k: 'share',    name: 'Channel share',   lo: 5,              hi: 35,
        label: '5 – 35%',         note: 'untested channel' },
      { k: 'price',    name: 'Contract value',  lo: v.price * 0.85, hi: v.price * 1.15,
        label: '±15%',            note: 'your input' },
      { k: 'margin',   name: 'Gross margin',    lo: Math.max(1, v.margin - 5), hi: v.margin + 5,
        label: '±5 pts',          note: 'your input' }
    ];

    const rows = drivers.map(function (d) {
      const lo = Object.assign({}, v); lo[d.k] = d.lo;
      const hi = Object.assign({}, v); hi[d.k] = d.hi;
      return { name: d.name, label: d.label, note: d.note,
               swing: Math.abs(model(hi).gp - model(lo).gp) };
    }).sort((a, b) => b.swing - a.swing);

    const max = Math.max.apply(null, rows.map(r => r.swing)) || 1;
    tornado.innerHTML = rows.map(function (r, i) {
      const pct = Math.max((r.swing / max) * 100, 1.5);
      return '<div class="tor-row' + (i === 0 ? ' lead' : '') + '">' +
        '<span class="tor-name">' + r.name +
          '<em>' + r.label + ' · ' + r.note + '</em></span>' +
        '<span class="tor-track"><span class="tor-fill" style="width:' + pct.toFixed(1) + '%"></span></span>' +
        '<span class="tor-val">' + money(r.swing) + '</span></div>';
    }).join('');
  }

  function update() {
    if (!inputs.homes) return;
    const v = vals();
    readouts.homes.textContent    = INT.format(v.homes);
    readouts.corridor.textContent = v.corridor + '%';
    readouts.adopt.textContent    = v.adopt + '%';
    readouts.share.textContent    = v.share + '%';
    readouts.price.textContent    = AUD0.format(v.price);
    readouts.margin.textContent   = v.margin + '%';

    const m = model(v);
    $('#oCorridor').textContent = INT.format(Math.round(m.corridorHomes));
    $('#oPools').textContent    = INT.format(Math.round(m.pools));
    $('#oWon').textContent      = INT.format(Math.round(m.won));
    $('#oRev').textContent      = money(m.rev);
    $('#oGp').textContent       = money(m.gp);

    drawHeat();
    drawTornado(v);
  }

  Object.keys(inputs).forEach(function (k) {
    if (inputs[k]) inputs[k].addEventListener('input', update);
  });
  const resetBtn = $('#resetStudio');
  if (resetBtn) resetBtn.addEventListener('click', function () {
    Object.keys(DEFAULTS).forEach(function (k) { if (inputs[k]) inputs[k].value = DEFAULTS[k]; });
    update();
  });

  let rt;
  window.addEventListener('resize', function () {
    // if the viewport grows past the mobile breakpoint, make sure the
    // burger menu isn't left open with the body scroll-locked
    if (window.innerWidth > 1020 && burger && menu && burger.getAttribute('aria-expanded') === 'true') {
      burger.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      document.body.style.overflow = '';
    }
    clearTimeout(rt);
    rt = setTimeout(drawHeat, 150);
  });

  update();

  /* ---------- contact form (mailto, no backend) ---------- */
  const form = $('#contactForm');
  const status = $('#formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = $('#fName').value.trim();
      const email = $('#fEmail').value.trim();
      const msg = $('#fMsg').value.trim();
      if (!name || !email || !msg) { if (status) status.textContent = 'Fill in all three fields.'; return; }
      const subject = encodeURIComponent('Portfolio enquiry from ' + name);
      const body = encodeURIComponent(msg + '\n\n--\n' + name + '\n' + email);
      window.location.href = 'mailto:vishnuvardhanaus@gmail.com?subject=' + subject + '&body=' + body;
      if (status) status.textContent = 'Opening your mail client…';
    });
  }

  const copyBtn = $('#copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      const addr = 'vishnuvardhanaus@gmail.com';
      const done = function () {
        copyBtn.textContent = 'Copied ✓';
        setTimeout(function () { copyBtn.textContent = 'Copy email address'; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addr).then(done).catch(function () { window.prompt('Copy:', addr); });
      } else {
        window.prompt('Copy:', addr);
      }
    });
  }
})();

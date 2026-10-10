/* FocusTrack AI — frontend-only prototype. All data is simulated. No camera access, no AI, no backend. */
(() => {
  'use strict';

  /* ---------- i18n: key -> [Arabic, English] ---------- */
  const T = {
    tagline: ['ركز أكتر... اتعلم أفضل', 'Focus more… learn better'],
    protoBadge: ['نموذج تجريبي — جميع البيانات محاكاة', 'Prototype — all data is simulated'],
    roleStudent: ['طالب', 'Student'], roleTeacher: ['مدرس', 'Teacher'],
    navHome: ['الرئيسية', 'Home'], navTrack: ['متابعة التركيز', 'Focus tracking'], navStats: ['إحصائياتي', 'My stats'],
    navSettings: ['الإعدادات', 'Settings'], navStudents: ['الطلاب', 'Students'], navClass: ['إحصائيات الفصل', 'Class stats'],
    navAlerts: ['التنبيهات', 'Alerts'], navReports: ['التقارير', 'Reports'],
    camOn: ['🟢 الكاميرا تعمل', '🟢 Camera is on'], camOff: ['⚪ المتابعة متوقفة', '⚪ Tracking is off'],
    focusNow: ['مستوى التركيز الحالي', 'Current focus level'],
    estimated: ['مؤشر تركيز تقديري — تحليل تجريبي', 'Estimated focus indicator — experimental analysis'],
    simNote: ['في المحاكاة: كل ثانيتين = دقيقة', 'In the simulation: every 2 seconds = 1 minute'],
    stGood: ['🟢 التركيز جيد', '🟢 Focus is good'], stMid: ['🟡 التركيز متوسط', '🟡 Focus is moderate'], stLow: ['🔴 التركيز منخفض', '🔴 Focus is low'],
    start: ['▶ بدء متابعة التركيز', '▶ Start focus tracking'], stop: ['⏸ إيقاف المتابعة', '⏸ Stop tracking'],
    sessionTitle: ['الحصة الحالية', 'Current session'],
    sessLen: ['مدة الحصة', 'Session length'], focusLen: ['مدة التركيز', 'Focused time'], distLen: ['مدة التشتت', 'Distracted time'],
    camTitle: ['معاينة الكاميرا (محاكاة)', 'Camera preview (simulated)'], simBadge: ['محاكاة', 'SIMULATED'],
    noIdentity: ['لا يتم التعرف على هوية الطالب — الصورة توضيحية فقط.', 'No identity recognition — illustrative frame only.'],
    aiTitle: ['تحليل الذكاء الاصطناعي (تجريبي)', 'AI analysis (experimental)'],
    eyeLbl: ['👁 اتجاه العين', '👁 Eye direction'], faceLbl: ['🙂 تعبير الوجه', '🙂 Face expression'], headLbl: ['🧑 حركة الرأس', '🧑 Head movement'],
    eyeFront: ['أمام الشاشة', 'On the screen'], eyeSide: ['جانب الشاشة', 'Toward the side'], eyeAway: ['بعيد عن الشاشة', 'Away from the screen'],
    faceNormal: ['طبيعي', 'Neutral'], faceDrift: ['شارد (تقديري)', 'Wandering (est.)'], faceUnclear: ['غير واضح', 'Unclear'],
    headStable: ['مستقرة', 'Stable'], headMoving: ['متحركة', 'Moving'], headFreq: ['حركة كثيرة', 'Frequent movement'],
    calcTitle: ['حساب مؤشر التركيز (محاكاة)', 'Focus score calculation (simulated)'],
    eyeShort: ['اتجاه العين', 'Eye direction'], headShort: ['حركة الرأس', 'Head movement'], faceShort: ['تعبير الوجه', 'Face expression'],
    calcResult: ['النتيجة', 'Result'], focusWord: ['تركيز', 'Focus'],
    simTitle: ['محاكاة التشتت', 'Distraction simulation'],
    simHelp: ['تجربة توضيحية فقط: اضغط مرة لخفض التركيز، ومرة ثانية لظهور تنبيه الطالب.', 'Demo only: press once to lower focus, press again to trigger the student alert.'],
    simDist: ['محاكاة التشتت', 'Simulate distraction'], backFocus: ['العودة للتركيز', 'Return to focus'],
    warnTitle: ['⚠️ مستوى التركيز منخفض', '⚠️ Focus level is low'], warnText: ['حاول العودة إلى متابعة الدرس.', 'Try to get back to the lesson.'],
    alertTitle: ['⚠️ تنبيه', '⚠️ Alert'], alertL1: ['يبدو أن تركيزك منخفض.', 'Your focus seems low.'],
    alertL2: ['حاول العودة إلى متابعة الدرس.', 'Try to get back to the lesson.'],
    alertOk: ['حسنًا، سأركز', "OK, I'll focus"],
    toastBack: ['تمت العودة للتركيز ✅', 'Back to focus ✅'],
    histTitle: ['مؤشر التركيز خلال الحصة', 'Focus during the session'],
    stAvg: ['المتوسط', 'Average'], stMin: ['الأقل', 'Lowest'], stEvents: ['مرات التشتت', 'Distractions'],
    setTitle: ['الإعدادات', 'Settings'], setMonitor: ['تشغيل/إيقاف متابعة التركيز', 'Focus tracking on/off'],
    setAlerts: ['التنبيهات', 'Notifications'], setSound: ['صوت التنبيه', 'Alert sound'], setDark: ['الوضع الداكن', 'Dark mode'], setLang: ['اللغة', 'Language'],
    privTitle: ['🔒 الخصوصية أولًا', '🔒 Privacy first'],
    priv1: ['تتم معالجة بيانات الكاميرا على جهاز الطالب.', "Camera data is processed on the student's device."],
    priv2: ['لا يتم حفظ أو إرسال فيديو الكاميرا.', 'Camera video is never saved or sent.'],
    priv3: ['يتم استخدام النتائج الإحصائية فقط لمتابعة مستوى التركيز.', 'Only statistical results are used to follow focus levels.'],
    privProto: ['هذا تمثيل توضيحي للخصوصية في النموذج التجريبي فقط.', 'Prototype representation of privacy only.'],
    disc: ['مؤشر تركيز تقديري — تحليل تجريبي. النتائج تساعد على المتابعة ولا تمثل تقييمًا نفسيًا أو طبيًا.',
           'Estimated focus indicator — experimental analysis. Results help with follow-up and are not a psychological or medical assessment.'],
    tTitle: ['لوحة متابعة الطلاب', 'Student monitoring dashboard'],
    teacherOnly: ['يرى المدرس الإحصائيات التقديرية فقط — بدون أي فيديو.', 'Teachers see simulated attention statistics only — no video.'],
    colDist: ['مدة التشتت', 'Distraction time'], focusPct: ['نسبة التركيز', 'Focus'], alertWord: ['تنبيه', 'Alert'],
    stuGood: ['🟢 جيد', '🟢 Good'], stuMid: ['🟡 متوسط', '🟡 Moderate'], stuLow: ['🔴 منخفض', '🔴 Low'],
    ovAvg: ['متوسط تركيز الفصل', 'Class average focus'], ovStudents: ['عدد الطلاب', 'Students'],
    ovGood: ['طلاب بتركيز جيد', 'Students with good focus'], ovNeed: ['طلاب يحتاجون متابعة', 'Students needing attention'],
    chartTitle: ['التركيز مقابل التشتت', 'Focus vs. distraction'], chFocus: ['التركيز', 'Focus'], chDist: ['التشتت', 'Distraction'],
    endClass: ['إنهاء الحصة', 'End class'],
    repTitle: ['تقرير الحصة', 'Class report'], repDur: ['مدة الحصة', 'Class duration'], repAvg: ['متوسط تركيز الفصل', 'Class average focus'],
    repRes: ['نتائج الطلاب', 'Student results'], repAvgChart: ['متوسط تركيز الطلاب', "Students' average focus"],
    viewRep: ['📄 عرض التقرير', '📄 View report'], printRep: ['🖨 طباعة التقرير', '🖨 Print report'],
    repEmpty: ['لم يتم إنهاء الحصة بعد. اضغط «إنهاء الحصة» من الصفحة الرئيسية لإنشاء التقرير.', 'The class has not ended yet. Press “End class” on the home page to generate the report.'],
    repReady: ['✅ تم إنهاء الحصة — التقرير جاهز.', '✅ Class ended — the report is ready.'],
    toastEnded: ['تم إنهاء الحصة', 'Class ended'],
  };
  const NAMES = [['أحمد', 'Ahmed'], ['محمد', 'Mohamed'], ['سارة', 'Sara'], ['علي', 'Ali']];

  /* ---------- Mock data ---------- */
  const STUDENTS = [
    { focus: 87, dist: 4 }, { focus: 64, dist: 11 }, { focus: 43, dist: 18 }, { focus: 91, dist: 2 },
  ];
  const CLASS = { avg: 76, total: 24, good: 18, need: 6, minutes: 60 };
  // [eye, head, expression] component scores (0-100). Weighted 40% / 30% / 30%.
  const PRESETS = [
    { eye: 85, head: 80, expr: 80 },   // = 82
    { eye: 48, head: 70, expr: 70 },   // = 61
    { eye: 28, head: 50, expr: 55 },   // = 43
  ];
  const WEIGHTS = { eye: 0.4, head: 0.3, expr: 0.3 };
  const CIRC = 2 * Math.PI * 52;

  /* ---------- State ---------- */
  const state = {
    lang: 'ar', role: 'student', view: { student: 's-home', teacher: 't-home' },
    comp: { ...PRESETS[0] }, focus: 82, level: 0,
    running: false, monitor: true, alerts: true, sound: true,
    sess: 42, foc: 35, dis: 7, events: 2,
    history: [78, 80, 85, 83, 79, 82, 88, 84, 81, 60, 58, 70, 80, 82],
    classEnded: false, reportShown: false,
  };
  let tickTimer = null, autoTimer = null, anim = null, toastTimer = null;

  /* ---------- Helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const t = k => (T[k] ? T[k][state.lang === 'ar' ? 0 : 1] : k);
  const calcFocus = c => Math.round(c.eye * WEIGHTS.eye + c.head * WEIGHTS.head + c.expr * WEIGHTS.expr);
  const levelOf = f => (f >= 75 ? 0 : f >= 60 ? 1 : 2);
  const LV = ['good', 'mid', 'low'];
  const mins = n => {
    if (state.lang === 'en') return `${n} min`;
    if (n === 1) return 'دقيقة';
    if (n === 2) return 'دقيقتان';
    return n >= 3 && n <= 10 ? `${n} دقائق` : `${n} دقيقة`;
  };
  const name = i => NAMES[i][state.lang === 'ar' ? 0 : 1];
  const statusKey = l => ['stuGood', 'stuMid', 'stuLow'][l];

  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (el.hidden = true), 2200);
  }

  function beep() {
    if (!state.sound) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.22].forEach(d => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.frequency.value = 740; o.connect(g); g.connect(ctx.destination);
        g.gain.setValueAtTime(0.15, ctx.currentTime + d);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + 0.18);
        o.start(ctx.currentTime + d); o.stop(ctx.currentTime + d + 0.2);
      });
    } catch (e) { /* audio not available */ }
  }

  /* ---------- Chart ---------- */
  function barChart(items, compact) {
    const bars = items.map(i =>
      `<div class="bar-col">${compact ? '' : `<span class="bar-val">${i.value}%</span>`}` +
      `<div class="bar" title="${i.value}%" style="height:${i.value}%;--c:${i.color}"></div></div>`).join('');
    const labels = compact ? '' : `<div class="bar-labels">${items.map(i => `<span>${i.label}</span>`).join('')}</div>`;
    return `<div class="bars${compact ? ' compact' : ''}">${bars}</div>${labels}`;
  }
  const colorOf = l => `var(--${['good', 'mid', 'low'][l]})`;

  /* ---------- Student: focus engine ---------- */
  function tweenTo(target, ms = 900) {
    const from = { ...state.comp }, t0 = performance.now();
    cancelAnimationFrame(anim);
    const step = now => {
      const p = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - p, 3);
      Object.keys(target).forEach(k => (state.comp[k] = from[k] + (target[k] - from[k]) * e));
      renderFocus();
      if (p < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
  }

  function renderFocus() {
    const f = calcFocus(state.comp), l = levelOf(f);
    state.focus = f;
    document.documentElement.dataset.level = LV[l];
    $$('.js-focus-val').forEach(el => (el.textContent = `${f}%`));
    $$('.js-ring-fg').forEach(el => {
      el.style.strokeDasharray = CIRC;
      el.style.strokeDashoffset = CIRC * (1 - f / 100);
    });
    $$('.js-status').forEach(el => (el.textContent = t(['stGood', 'stMid', 'stLow'][l])));
    [['Eye', 'eye'], ['Head', 'head'], ['Expr', 'expr']].forEach(([id, k]) => {
      const v = Math.round(state.comp[k]);
      $('#bar' + id).style.width = v + '%';
      $('#val' + id).textContent = v + '%';
    });
    $('#calcResult').textContent = `${f}% ${t('focusWord')}`;
  }

  function renderLabels() {
    const l = state.level;
    $('#aiEye').textContent = t(['eyeFront', 'eyeSide', 'eyeAway'][l]);
    $('#aiFace').textContent = t(['faceNormal', 'faceDrift', 'faceUnclear'][l]);
    $('#aiHead').textContent = t(['headStable', 'headMoving', 'headFreq'][l]);
    const cam = $('#camera');
    cam.style.setProperty('--look', [0, 6, 10][l]);
    cam.style.setProperty('--tilt', [0, 6, 0][l]);
    $('#warnBanner').hidden = l === 0;
  }

  function setLevel(l) {
    state.level = l;
    tweenTo(PRESETS[l]);
    renderLabels();
  }

  function renderDurations() {
    const pct = v => Math.min(100, Math.round((v / Math.max(state.sess, 1)) * 100));
    const html =
      `<div class="dur-item ses"><div class="dur-top"><span>${t('sessLen')}</span><b>${mins(state.sess)}</b></div><div class="progress"><span style="width:100%"></span></div></div>` +
      `<div class="dur-item foc"><div class="dur-top"><span>${t('focusLen')}</span><b>${mins(state.foc)}</b></div><div class="progress"><span style="width:${pct(state.foc)}%"></span></div></div>` +
      `<div class="dur-item dis"><div class="dur-top"><span>${t('distLen')}</span><b>${mins(state.dis)}</b></div><div class="progress"><span style="width:${pct(state.dis)}%"></span></div></div>`;
    $$('.js-durations').forEach(el => (el.innerHTML = html));
  }

  function renderHistory() {
    const h = state.history;
    $('#histChart').innerHTML = barChart(h.map(v => ({ value: v, color: colorOf(levelOf(v)) })), true);
    const avg = Math.round(h.reduce((a, b) => a + b, 0) / h.length);
    $('#histStats').innerHTML =
      `<div><b>${avg}%</b>${t('stAvg')}</div><div><b>${Math.min(...h)}%</b>${t('stMin')}</div><div><b>${state.events}</b>${t('stEvents')}</div>`;
  }

  function renderStart() {
    $$('.js-start').forEach(b => (b.textContent = t(state.running ? 'stop' : 'start')));
    $$('.js-cam-status').forEach(el => (el.textContent = t(state.monitor ? 'camOn' : 'camOff')));
    $('#camera').classList.toggle('off', !state.monitor);
  }

  function tick() {
    state.sess += 1;
    if (state.focus >= 60) state.foc += 1; else state.dis += 1;
    state.history.push(state.focus);
    if (state.history.length > 14) state.history.shift();
    if (state.level === 0) { // small natural fluctuation around the "good" preset
      const j = () => Math.round(Math.random() * 6 - 3);
      tweenTo({ eye: PRESETS[0].eye + j(), head: PRESETS[0].head + j(), expr: PRESETS[0].expr + j() }, 700);
    }
    renderDurations();
    renderHistory();
  }

  function toggleRun() {
    if (!state.monitor) { state.monitor = true; $('#setMonitor').checked = true; }
    state.running = !state.running;
    clearInterval(tickTimer);
    if (state.running) tickTimer = setInterval(tick, 2000);
    renderStart();
    if (state.running) showView('s-track');
  }

  function distract() {
    clearTimeout(autoTimer);
    if (state.level === 0) {
      state.events++;
      setLevel(1);                      // 82% -> 61% + warning
      autoTimer = setTimeout(() => { if (state.level === 1) { setLevel(0); toast(t('toastBack')); } }, 7000);
    } else if (state.level === 1) {
      setLevel(2);                      // 61% -> 43% + student alert
      if (state.alerts) showAlert();
    }
    renderHistory();
  }

  function recover() {
    clearTimeout(autoTimer);
    $('#alertModal').hidden = true;
    if (state.level !== 0) { setLevel(0); toast(t('toastBack')); }
  }

  function showAlert() {
    $('#alertModal').hidden = false;
    beep();
    $('#alertOk').focus();
  }

  /* ---------- Teacher ---------- */
  function renderTeacher() {
    $$('.js-ov-stats').forEach(el => (el.innerHTML = [
      [CLASS.avg + '%', 'ovAvg', 'var(--primary)'], [CLASS.total, 'ovStudents', 'var(--primary)'],
      [CLASS.good, 'ovGood', 'var(--good)'], [CLASS.need, 'ovNeed', 'var(--orange)'],
    ].map(([v, k, c]) => `<div class="ov-stat" style="--c:${c}"><b>${v}</b><span>${t(k)}</span></div>`).join('')));

    $('#stuGrid').innerHTML = STUDENTS.map((s, i) => {
      const l = levelOf(s.focus);
      return `<article class="stu-card" data-level="${LV[l]}" style="animation-delay:${i * 70}ms">
        <div class="stu-top"><span class="avatar">${name(i)[0]}</span><strong>${name(i)}</strong><span class="pill">${t(statusKey(l))}</span></div>
        <div class="stu-focus">${s.focus}%</div>
        <div class="progress"><span style="width:${s.focus}%"></span></div>
        <div class="stu-meta"><span>${t('colDist')}</span><b>${mins(s.dist)}</b></div></article>`;
    }).join('');

    const alerts = STUDENTS.map((s, i) => ({ ...s, i, l: levelOf(s.focus) })).filter(s => s.l > 0).sort((a, b) => a.focus - b.focus);
    $$('.js-alerts').forEach(el => (el.innerHTML = alerts.map((s, n) =>
      `<div class="t-alert" data-level="${LV[s.l]}" style="animation-delay:${n * 90}ms">
        <strong>${s.l === 2 ? '🔴' : '🟠'} ${t('alertWord')} — ${name(s.i)}</strong>
        <div>${t('focusPct')}: <b>${s.focus}%</b></div><div>${t('colDist')}: <b>${mins(s.dist)}</b></div></div>`).join('')));

    $('#classChart').innerHTML = barChart([
      { label: t('chFocus'), value: CLASS.avg, color: 'var(--good)' },
      { label: t('chDist'), value: 100 - CLASS.avg, color: 'var(--orange)' },
    ]);
    renderReport();
  }

  function renderReport() {
    const st = $('#reportState');
    if (!state.classEnded) {
      st.innerHTML = `<p>${t('repEmpty')}</p>`;
      $('#reportBox').hidden = true;
      return;
    }
    st.innerHTML = `<p>${t('repReady')}</p><div class="btn-row">
      <button type="button" class="btn primary" id="btnViewRep">${t('viewRep')}</button>
      <button type="button" class="btn ghost" id="btnPrintRep">${t('printRep')}</button></div>`;
    $('#btnViewRep').onclick = openReport;
    $('#btnPrintRep').onclick = () => { openReport(false); setTimeout(() => window.print(), 150); };

    const date = new Date().toLocaleDateString(state.lang === 'ar' ? 'ar-EG' : 'en-GB');
    $('#reportBox').innerHTML = `
      <h2>${t('repTitle')}</h2><p class="hint">FocusTrack AI · ${date}</p>
      <div class="rep-grid">
        <div>${t('repDur')}<b>${mins(CLASS.minutes)}</b></div>
        <div>${t('repAvg')}<b>${CLASS.avg}%</b></div>
      </div>
      <h3>${t('repRes')}</h3>
      <ul class="rep-list">${STUDENTS.map((s, i) => `<li><span>${name(i)}</span><span>${s.focus}%</span></li>`).join('')}</ul>
      <h3>${t('repAvgChart')}</h3>
      ${barChart(STUDENTS.map((s, i) => ({ label: name(i), value: s.focus, color: colorOf(levelOf(s.focus)) })))}
      <p class="hint">${t('disc')}</p>`;
    $('#reportBox').hidden = !state.reportShown;
  }

  function openReport(scroll = true) {
    state.reportShown = true;
    renderReport();
    if (scroll) $('#reportBox').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function endClass() {
    state.classEnded = true; state.reportShown = false;
    renderReport();
    showView('t-reports');
    toast(t('toastEnded'));
  }

  /* ---------- Navigation / role ---------- */
  function showView(id) {
    const role = id[0] === 't' ? 'teacher' : 'student';
    state.view[role] = id;
    $$('.view').forEach(v => v.classList.toggle('active', v.id === id));
    $$('.nav button').forEach(b => b.classList.toggle('active', b.dataset.view === id));
    if (id === 't-class') $('#classChart').innerHTML = $('#classChart').innerHTML; // replay bar animation
    window.scrollTo({ top: 0 });
  }

  function setRole(role) {
    state.role = role;
    document.body.dataset.role = role;
    $$('[data-role-btn]').forEach(b => b.classList.toggle('active', b.dataset.roleBtn === role));
    showView(state.view[role]);
  }

  /* ---------- Language / theme ---------- */
  function applyI18n() {
    const ar = state.lang === 'ar';
    document.documentElement.lang = ar ? 'ar' : 'en';
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(el => (el.textContent = t(el.dataset.i18n)));
    $$('[data-lang-btn]').forEach(b => b.classList.toggle('active', b.dataset.langBtn === state.lang));
    renderAll();
  }

  function renderAll() {
    renderFocus(); renderLabels(); renderDurations(); renderHistory(); renderStart(); renderTeacher();
  }

  /* ---------- Init ---------- */
  function init() {
    // privacy card (student home + teacher home)
    const tpl = $('#privacyTpl');
    $$('.js-privacy').forEach(el => el.appendChild(tpl.content.cloneNode(true)));
    $('#t-home').appendChild(tpl.content.cloneNode(true));

    $$('[data-role-btn]').forEach(b => b.addEventListener('click', () => setRole(b.dataset.roleBtn)));
    $$('.nav button').forEach(b => b.addEventListener('click', () => showView(b.dataset.view)));
    $$('.js-start').forEach(b => b.addEventListener('click', toggleRun));
    $$('.js-end-class').forEach(b => b.addEventListener('click', endClass));
    $('#btnDistract').addEventListener('click', distract);
    $('#btnReturn').addEventListener('click', recover);
    $('#alertOk').addEventListener('click', recover);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#alertModal').hidden) recover(); });

    $('#setMonitor').addEventListener('change', e => {
      state.monitor = e.target.checked;
      if (!state.monitor && state.running) { state.running = false; clearInterval(tickTimer); }
      renderStart();
    });
    $('#setAlerts').addEventListener('change', e => (state.alerts = e.target.checked));
    $('#setSound').addEventListener('change', e => (state.sound = e.target.checked));
    $('#setDark').addEventListener('change', e => {
      document.documentElement.dataset.theme = e.target.checked ? 'dark' : 'light';
    });
    $$('[data-lang-btn]').forEach(b => b.addEventListener('click', () => { state.lang = b.dataset.langBtn; applyI18n(); }));

    applyI18n();
  }

  init();
})();

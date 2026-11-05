(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const app = $('app'), stage = $('stage'), intro = $('intro');
  const dialogue = $('dialogue'), bubble = $('bubble');
  const spriteSlots = { left: $('spriteLeft'), center: $('spriteCenter'), right: $('spriteRight') };
  let current = -1, started = false, soundOn = true, activePlayer = 0, currentAct = '', cakeLit = false;
  const audios = [$('musicA'), $('musicB')];
  let fadeInterval = null;
  const charMap = { shadowMilk: '✦', blackSapphire: '♠', candy: '♡' };
  const soundBtn = $('soundBtn');

  $('introName').textContent = SITE_CONFIG.birthdayName;
  $('stageTitle').textContent = SITE_CONFIG.title;
  document.title = `${SITE_CONFIG.birthdayName}'s Birthday — The Grand Deception`;
  $('gift').querySelector('.gift-tag').textContent = `FOR ${SITE_CONFIG.birthdayName.toUpperCase()} ♡`;

  function actor(slotName, choice, scene) {
    const slot = spriteSlots[slotName];
    slot.replaceChildren();
    if (!choice) return;
    const character = typeof choice === 'string' ? choice : choice.character;
    const def = CHARACTERS[character];
    if (!def) return;
    const expr = (typeof choice === 'object' && choice.expression) || (scene.speaker === character && scene.expression) || def.defaultExpression;
    const filename = def.expressions[expr] || def.expressions[def.defaultExpression] || '';
    const wrapper = document.createElement('div');
    wrapper.className = 'sprite-placeholder';
    wrapper.innerHTML = `<span>${charMap[character] || '✧'}</span>`;
    const title = document.createElement('b'); title.textContent = def.name;
    const hint = document.createElement('small'); hint.textContent = 'Add your PNG in ' + def.folder;
    wrapper.append(title, hint);
    slot.append(wrapper);
    if (filename) {
      const img = new Image();
      img.alt = def.name + ' (' + expr + ')';
      img.className = 'sprite-art';
      img.style.transform = `translateY(${def.positionY || '0px'}) scale(${def.scale || 1})`;
      img.onload = () => { if (slot.contains(wrapper)) slot.replaceChildren(img); };
      img.src = def.folder + filename;
    }
  }

  function showOc(key) {
    const panel = $('ocPanel'); panel.replaceChildren(); panel.classList.add('hidden');
    if (!key || !OCS[key]) return;
    const oc = OCS[key];
    const fallback = document.createElement('span'); fallback.className = 'oc-fallback'; fallback.textContent = '✧';
    const name = document.createElement('strong'); name.textContent = oc.name;
    panel.append(fallback, name); panel.classList.remove('hidden');
    if (!oc.image) return;
    const img = new Image(); img.alt = oc.name;
    img.onload = () => { if (panel.contains(fallback)) panel.replaceChild(img, fallback); };
    img.src = oc.image;
  }

  function setBackground(act) {
    const path = SITE_CONFIG.backgrounds?.[act];
    $('backdrop').style.backgroundImage = path ? `linear-gradient(#060c2880,#070b2480),url("${encodeURI(path).replaceAll('"', '%22')}")` : '';
    $('backdrop').style.backgroundSize = path ? 'cover' : '';
    $('backdrop').style.backgroundPosition = path ? 'center' : '';
  }

  function playAct(act) {
    if (!soundOn || act === currentAct) return;
    const src = SITE_CONFIG.music?.[act];
    if (!src) { audios.forEach(a => a.pause()); currentAct = act; return; }
    const from = audios[activePlayer], to = audios[1 - activePlayer];
    if (fadeInterval) clearInterval(fadeInterval);
    to.pause(); to.src = src; to.volume = 0; to.loop = true;
    const promise = to.play();
    if (promise) promise.catch(() => { /* file missing or audio blocked: remain playable without music */ });
    let n = 0;
    fadeInterval = setInterval(() => {
      n++; const t = Math.min(n / 12, 1);
      to.volume = Math.min(1, t * .5);
      from.volume = Math.max(0, (1 - t) * .5);
      if (t >= 1) { clearInterval(fadeInterval); fadeInterval = null; from.pause(); activePlayer = 1 - activePlayer; }
    }, 55);
    currentAct = act;
  }

  function confettiBurst() {
    const layer = $('confetti'); layer.replaceChildren();
    const colors = ['#fee3a2','#b5e7ff','#f4a1e1','#9ce6d8','#bbaaff'];
    for (let i = 0; i < 85; i++) {
      const p = document.createElement('i');
      p.style.setProperty('--x', Math.random() * 100 + '%');
      p.style.setProperty('--color', colors[i % colors.length]);
      p.style.setProperty('--dur', (2.5 + Math.random() * 2.3) + 's');
      p.style.setProperty('--r', (Math.random() * 360) + 'deg');
      p.style.animationDelay = (Math.random() * 1.1) + 's';
      layer.append(p);
    }
    setTimeout(() => layer.replaceChildren(), 5800);
  }

  function displayScene(index) {
    if (index < 0 || index >= SCENES.length) return;
    current = index;
    const s = SCENES[index];
    app.className = 'app act-' + s.act + ' curtains-open intro-gone';
    $('progressBar').style.width = (((index + 1) / SCENES.length) * 100) + '%';
    $('stepCounter').textContent = `SCENE ${index + 1} OF ${SCENES.length}`;
    $('backBtn').disabled = index === 0;
    $('actLabel').textContent = ({prologue:'THE INVITATION',welcome:'ACT I · THE GREETING',spire:'ACT II · THE SPIRE',cake:'ACT III · A SWEET SECRET',finale:'FINAL ACT · THE DECEPTION'})[s.act] || 'THE THEATRE';
    setBackground(s.act); playAct(s.act);
    actor('left', s.left, s); actor('center', s.center, s); actor('right', s.right, s);
    showOc(s.oc);
    const name = s.speaker === 'narrator' ? '✧ THE NARRATOR ✧' : (CHARACTERS[s.speaker]?.label || 'MYSTERY GUEST');
    $('speakerName').textContent = name;
    $('dialogueText').textContent = s.text;
    bubble.style.backgroundImage = '';
    // The same user-supplied bubble art is used for every dialogue scene.
    const bubbleProbe = new Image();
    bubbleProbe.onload = () => { if (current === index) bubble.style.backgroundImage = `linear-gradient(#0b19418c,#0b19418c),url("assets/bubble.png")`; };
    bubbleProbe.src = 'assets/bubble.png';
    $('nextBtn').textContent = s.button || 'CONTINUE ✦';
    $('cake').classList.toggle('hidden', s.effect !== 'cake');
    $('gift').classList.toggle('hidden', s.effect !== 'gift');
    if (s.effect === 'cake') { cakeLit = false; $('cake').classList.remove('lit'); }
    if (s.effect === 'confetti') confettiBurst();
    if (s.effect === 'shiver') { stage.classList.remove('shiver'); void stage.offsetWidth; stage.classList.add('shiver'); }
    dialogue.classList.remove('hidden');
  }

  function next() {
    if (!started) return;
    if (current < SCENES.length - 1) displayScene(current + 1);
    else openPresent();
  }

  function openPresent() {
    const url = SITE_CONFIG.canvaGiftUrl;
    if (!url || url === 'https://www.canva.com/') {
      $('dialogueText').textContent = 'A special present is waiting! The creator just needs to add their Canva view link to config.js. ♡';
      return;
    }
    // Prevent malformed or unsafe schemes from being entered by mistake.
    try {
      const parsed = new URL(url, window.location.href);
      if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error('Invalid gift URL');
      window.location.href = parsed.href;
    } catch { $('dialogueText').textContent = 'The gift link needs a valid https:// URL in config.js.'; }
  }

  $('startBtn').addEventListener('click', () => {
    if (started) return;
    started = true;
    intro.classList.add('hidden'); // Uncover the curtains, then animate opening.
    app.classList.remove('intro-gone');
    displayScene(0);
    app.classList.remove('curtains-open');
    requestAnimationFrame(() => requestAnimationFrame(() => app.classList.add('curtains-open')));
  });
  $('nextBtn').addEventListener('click', next);
  bubble.addEventListener('click', next);
  bubble.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); } });
  $('backBtn').addEventListener('click', () => { if (started) displayScene(current - 1); });
  soundBtn.addEventListener('click', () => {
    soundOn = !soundOn;
    soundBtn.textContent = soundOn ? '♫' : '♪̸';
    soundBtn.setAttribute('aria-pressed', String(soundOn));
    if (!soundOn) { if (fadeInterval) clearInterval(fadeInterval); audios.forEach(a => a.pause()); currentAct = ''; }
    else if (current >= 0) { currentAct = ''; playAct(SCENES[current].act); }
  });
  $('cake').addEventListener('click', () => { if (!cakeLit) { cakeLit = true; $('cake').classList.add('lit'); confettiBurst(); } else next(); });
  $('gift').addEventListener('click', openPresent);
  for (const id of ['cake','gift']) $(id).addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $(id).click(); } });
})();

'use strict';

/*
 * A body-mounted video surface: #app is disposable; the active iframe is not.
 * Changing a unit/video or explicitly dismissing playback is the only operation
 * below that replaces #player. Language, layout, navigation and pin changes do
 * not detach, reparent, clone or rewrite an existing iframe.
 *
 * This deliberately does not infer whether a cross-origin video is paused,
 * buffering or audible. "Playing" means an iframe has been requested by the
 * learner. Playback itself remains subject to the provider and the network.
 */
(() => {
  let dock = null;
  let loadedUnit = null;
  let loadedSignature = '';
  let placeholder = null;
  let panelObserver = null;
  let playerObserver = null;
  let layoutObserver = null;
  let pinned = false;
  let scheduledFrame = 0;
  let transition = null;
  let normalHeight = 380;
  let normalWidth = 0;
  let lastLanguage = '';

  const label = (zh, en) => t(zh, en);
  const hasPlayback = () => Boolean(dock?.querySelector('#player iframe'));
  const sourceSignature = u => `${u.id}|${u.video || ''}`;

  function installStyles() {
    if (document.getElementById('klar-player-styles')) return;
    const style = document.createElement('style');
    style.id = 'klar-player-styles';
    style.textContent = `
      #video-dock { position:fixed; margin:0; z-index:12; box-sizing:border-box; }
      #video-dock[hidden] { display:none !important; }
      #video-dock > .video-panel { position:relative; inset:auto; width:100%; margin:0; box-sizing:border-box; }
      #video-dock .video-label { gap:10px; align-items:flex-start; }
      #video-dock .video-label h2 { line-height:1.5; flex:1; min-width:0; }
      #video-dock .video-dock-actions { display:flex; align-items:center; gap:7px; flex-shrink:0; }
      #video-dock .video-dock-actions button { min-height:30px; }
      #video-dock .video-dismiss { display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; padding:6px; border-radius:8px; color:var(--muted,#77816f); }
      #video-dock .video-dismiss svg { width:15px; height:15px; }
      #video-dock .video-dismiss:hover { background:var(--soft,#f0f3ec); color:var(--ink,#263525); }
      #video-dock .video-dismiss[hidden] { display:none; }
      #video-dock .float-control { white-space:nowrap; }
      #video-dock[data-mode="floating"] { z-index:60; }
      #video-dock[data-mode="floating"] > .video-panel { padding:16px; box-shadow:0 18px 60px #243b2830; border-color:#d4e0ca; }
      #video-dock[data-mode="floating"] .video-context,
      #video-dock[data-mode="floating"] .video-info { display:none; }
      #video-dock[data-mode="floating"] .video-title { margin-top:13px; font-size:13px; }
      #video-dock[data-mode="floating"] .video-label { margin-bottom:12px; }
      #video-dock[data-mode="floating"] .video-label h2 { font-size:12px; }
      #video-dock[data-mode="floating"] .video-link { margin-top:11px; }
      #video-dock[data-mode="floating"] .float-control { font-size:10px; }
      #video-dock[data-mode="floating"] .float-control svg { transform:rotate(135deg); }
      #video-region { box-sizing:border-box; min-width:0; }
      #video-region .video-away { width:100%; height:100%; min-height:190px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:15px; padding:24px; border:1px dashed var(--line,#dae2d3); border-radius:20px; background:var(--paper,#fcfdf9); color:var(--muted,#7b896f); text-align:center; box-sizing:border-box; }
      #video-region .video-away > svg { width:27px; height:27px; opacity:.65; }
      #video-region .video-away strong { color:var(--ink,#31402c); font-size:14px; font-weight:500; }
      #video-region .video-away small { max-width:220px; font-size:11px; line-height:1.8; }
      #video-region .video-away .text-btn { font-size:12px; }
      @media(max-width:520px) {
        #video-dock[data-mode="floating"] > .video-panel { padding:13px; }
        #video-dock[data-mode="floating"] .video-link { font-size:9px; }
      }
    `;
    document.head.append(style);
  }

  function ensureDock() {
    if (dock) return;
    installStyles();
    dock = document.createElement('div');
    dock.id = 'video-dock';
    dock.hidden = true;
    dock.setAttribute('role', 'region');
    document.body.append(dock);
    dock.addEventListener('click', event => {
      if (event.target.closest('[data-persistent-video="dismiss"]')) {
        event.preventDefault();
        dismissPersistentVideo();
      }
    });
    dock.addEventListener('keydown', event => {
      if (event.key === 'Escape' && dock.dataset.mode === 'floating') {
        event.preventDefault();
        dismissPersistentVideo();
      }
    });
    if ('ResizeObserver' in window) {
      panelObserver = new ResizeObserver(scheduleLayout);
      layoutObserver = new ResizeObserver(scheduleLayout);
    }
    window.addEventListener('resize', scheduleLayout, { passive:true });
    window.addEventListener('scroll', scheduleLayout, { passive:true });
    window.visualViewport?.addEventListener('resize', scheduleLayout, { passive:true });
    window.visualViewport?.addEventListener('scroll', scheduleLayout, { passive:true });
    document.fonts?.ready.then(scheduleLayout);
  }

  function templateFor(u) {
    const template = document.createElement('template');
    template.innerHTML = videoPanel(u);
    return template.content.querySelector('.video-panel');
  }

  function installPanel(u) {
    panelObserver?.disconnect();
    playerObserver?.disconnect();
    transition?.cancel();
    transition = null;
    const panel = templateFor(u);
    if (!panel) return;
    // An explicit unit/video change intentionally stops the previous source.
    dock.replaceChildren(panel);
    loadedUnit = u;
    loadedSignature = sourceSignature(u);
    normalWidth = 0;
    lastLanguage = '';
    dock.dataset.unit = u.id;
    const controls = document.createElement('div');
    controls.className = 'video-dock-actions';
    const floatControl = panel.querySelector('.float-control');
    if (floatControl) controls.append(floatControl);
    const dismiss = document.createElement('button');
    dismiss.type = 'button';
    dismiss.className = 'video-dismiss';
    dismiss.dataset.persistentVideo = 'dismiss';
    dismiss.innerHTML = icon('close');
    controls.append(dismiss);
    panel.querySelector('.video-label')?.append(controls);
    panelObserver?.observe(panel);
    // Main calls syncVideoDock() after Play too; this observer makes the layer
    // resilient if a future player implementation replaces its contents itself.
    playerObserver = new MutationObserver(scheduleLayout);
    const player = panel.querySelector('#player');
    if (player) playerObserver.observe(player, { childList:true });
  }

  function updateMetadata() {
    if (!dock || !loadedUnit) return;
    const language = typeof state !== 'undefined' ? state.lang : document.documentElement.lang;
    if (language !== lastLanguage) {
      const fresh = templateFor(loadedUnit);
      if (fresh) {
        const selectors = ['.video-label h2', '.video-title', '.video-info', '.video-context summary', '.video-context p', '.video-context small', '.video-link span', '.video-link a'];
        selectors.forEach(selector => {
          const currentNode = dock.querySelector(selector);
          const newNode = fresh.querySelector(selector);
          if (currentNode && newNode) currentNode.textContent = newNode.textContent;
        });
        const preview = dock.querySelector('.video-thumb');
        const freshPreview = fresh.querySelector('.video-thumb');
        if (preview && freshPreview) preview.setAttribute('aria-label', freshPreview.getAttribute('aria-label') || '');
      }
      lastLanguage = language;
      normalWidth = 0;
    }
    dock.setAttribute('aria-label', label('配套学习视频', 'Companion learning video'));
    const iframe = dock.querySelector('#player iframe');
    if (iframe) iframe.title = label('德语配套视频', 'German companion video');
  }

  function observePlaceholder(next) {
    if (placeholder === next) return;
    placeholder = next;
    layoutObserver?.disconnect();
    if (placeholder) {
      layoutObserver?.observe(placeholder);
      // Observing the parent catches width and surrounding text/font changes.
      if (placeholder.parentElement) layoutObserver?.observe(placeholder.parentElement);
    }
  }

  function updatePlaceholder(floating) {
    if (!placeholder) return;
    if (!floating) {
      if (placeholder.childElementCount) placeholder.replaceChildren();
      return;
    }
    let note = placeholder.querySelector('.video-away');
    if (!note) {
      note = document.createElement('div');
      note.className = 'video-away';
      note.innerHTML = `${icon('play')}<strong></strong><small></small><button type="button" class="text-btn" data-action="float-video"></button>`;
      placeholder.replaceChildren(note);
    }
    note.querySelector('strong').textContent = label('视频在小窗中', 'Your video is in the mini-player');
    note.querySelector('small').textContent = label('继续学习，画面会陪在旁边。', 'Keep learning with the video by your side.');
    note.querySelector('button').textContent = label('收回这里 ↙', 'Bring it back here ↙');
  }

  function updateControls(floating, playing, hasSlot) {
    const control = dock.querySelector('.float-control');
    if (control) {
      const text = floating ? (hasSlot ? label('收起', 'Dock') : label('返回课堂', 'Back to lesson')) : label('悬浮', 'Float');
      let span = control.querySelector('span');
      if (!span) { span = document.createElement('span'); control.append(span); }
      span.textContent = text;
      control.setAttribute('aria-pressed', String(pinned));
      control.setAttribute('aria-controls', 'video-dock');
      control.setAttribute('aria-label', floating ? (hasSlot ? label('收起悬浮视频', 'Dock video') : label('返回当前视频的学习单元', 'Return to this video’s lesson')) : label('悬浮观看视频', 'Float video'));
    }
    const dismiss = dock.querySelector('.video-dismiss');
    if (dismiss) {
      dismiss.hidden = !floating && !playing;
      dismiss.setAttribute('aria-label', label('关闭视频并停止播放', 'Close video and stop playback'));
      dismiss.title = label('关闭视频', 'Close video');
    }
  }

  function scheduleLayout() {
    if (!scheduledFrame) scheduledFrame = requestAnimationFrame(() => {
      scheduledFrame = 0;
      syncVideoDock();
    });
  }

  function syncVideoDock() {
    ensureDock();
    const next = document.getElementById('video-region');
    observePlaceholder(next);
    const u = unit();
    if (!loadedUnit || sourceSignature(u) !== loadedSignature) installPanel(u);
    if (!loadedUnit) return;
    updateMetadata();

    const rect = placeholder?.getBoundingClientRect();
    const hasSlot = Boolean(rect && rect.width > 0);
    const playing = hasPlayback();
    const floating = pinned || !hasSlot;
    dock.dataset.playing = String(playing);
    dock.dataset.pinned = String(pinned);
    if (!hasSlot && !playing) {
      dock.hidden = true;
      return;
    }

    const priorMode = dock.dataset.mode;
    const wasVisible = !dock.hidden;
    const before = wasVisible ? dock.getBoundingClientRect() : null;
    dock.hidden = false;
    // Cancel a transition only when its target mode changes, not on each scroll.
    if (priorMode && priorMode !== (floating ? 'floating' : 'docked')) {
      transition?.cancel();
      transition = null;
    }

    if (hasSlot && (normalWidth !== rect.width || !normalHeight)) {
      // A temporary synchronous measurement changes only geometry; it never
      // moves media in the DOM and is committed before the browser paints.
      dock.dataset.mode = 'docked';
      dock.style.width = `${rect.width}px`;
      dock.style.maxHeight = 'none';
      normalHeight = dock.firstElementChild.offsetHeight;
      normalWidth = rect.width;
    }
    dock.dataset.mode = floating ? 'floating' : 'docked';
    updateControls(floating, playing, hasSlot);

    if (floating) {
      const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const margin = viewportWidth <= 520 ? 12 : 22;
      const width = Math.min(350, viewportWidth - margin * 2);
      dock.style.width = `${Math.max(180, width)}px`;
      dock.style.maxHeight = `${Math.max(160, viewportHeight - margin * 2)}px`;
      dock.style.overflowY = 'auto';
      const height = Math.min(dock.scrollHeight, viewportHeight - margin * 2);
      dock.style.left = `${Math.max(margin, viewportWidth - width - margin)}px`;
      dock.style.top = `${Math.max(margin, viewportHeight - height - margin + (window.visualViewport?.offsetTop || 0))}px`;
    } else {
      dock.style.width = `${rect.width}px`;
      dock.style.left = `${rect.left}px`;
      dock.style.top = `${rect.top}px`;
      dock.style.maxHeight = 'none';
      dock.style.overflowY = 'visible';
      normalHeight = dock.firstElementChild.offsetHeight;
      normalWidth = rect.width;
    }
    if (placeholder && placeholder.style.height !== `${normalHeight}px`) placeholder.style.height = `${normalHeight}px`;
    updatePlaceholder(floating);

    if (before && priorMode && priorMode !== dock.dataset.mode && !matchMedia('(prefers-reduced-motion: reduce)').matches && typeof dock.animate === 'function') {
      const after = dock.getBoundingClientRect();
      if (after.width && after.height && before.width && before.height) {
        transition = dock.animate([
          { transformOrigin:'top left', transform:`translate(${before.left - after.left}px,${before.top - after.top}px) scale(${before.width / after.width},${before.height / after.height})` },
          { transformOrigin:'top left', transform:'translate(0,0) scale(1,1)' }
        ], { duration:320, easing:'cubic-bezier(.22,.7,.22,1)', fill:'none' });
        transition.finished.catch(() => {});
      }
    }
  }

  function togglePersistentVideo() {
    ensureDock();
    if (!document.getElementById('video-region')) {
      pinned = false;
      document.dispatchEvent(new CustomEvent('klar:video-return', { detail:{ unitId:loadedUnit?.id || unit().id } }));
      syncVideoDock();
      return;
    }
    pinned = !pinned;
    syncVideoDock();
  }

  function dismissPersistentVideo() {
    if (!dock || !loadedUnit) return;
    const fresh = templateFor(loadedUnit)?.querySelector('#player');
    const player = dock.querySelector('#player');
    // User-requested stop: destroying the iframe is intentional here.
    if (player && fresh) player.replaceChildren(...Array.from(fresh.childNodes));
    pinned = false;
    syncVideoDock();
    const focus = !dock.hidden ? dock.querySelector('.video-thumb') : document.querySelector('[aria-current="page"],#main-content h1');
    if (focus) {
      if (focus.tagName === 'H1') focus.setAttribute('tabindex', '-1');
      focus.focus({ preventScroll:true });
    }
  }

  window.syncVideoDock = syncVideoDock;
  window.togglePersistentVideo = togglePersistentVideo;
  window.dismissPersistentVideo = dismissPersistentVideo;
})();

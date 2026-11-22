/**
 * STEPHEN B. (SB.) — PORTFOLIO CORE SCRIPT
 * Handles Intro Animation, Dynamic Hero Badge, Kinetic Scroll, Stack Accordion,
 * Projects Showcase, Filtering, and Interactive Detail Modal with Carousels.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. DATA: 5 CORE PROJECTS (Scalable 5-Picture Carousel Architecture)
     ========================================================================== */
  const projectsData = [
    {
      id: "tastetrack",
      num: "01",
      tag: "FULL-STACK WEB APP",
      title: "TasteTrack: Recipe & Social Platform",
      category: "web",
      desc: "A full-stack culinary social network and recipe sharing system. Users can explore recipes, publish ingredient lists, follow chefs, leave comments, and give custom emoji reactions.",
      languages: ["Python", "Django", "SQLite", "JavaScript", "Vercel"],
      viewProjectUrl: "https://tastetrack-0kij.onrender.com/",
      sourceCodeUrl: "https://github.com/Vyshanix/TasteTrack",
      images: [
        "assets/images/projects/tastetrack_1.png",
        "assets/images/projects/tastetrack_2.png",
        "assets/images/projects/tastetrack_3.png",
        "assets/images/projects/tastetrack_4.png",
        "assets/images/projects/tastetrack_5.png"
      ]
    },
    {
      id: "safedrive",
      num: "02",
      tag: "UI/UX DESIGN & MOBILE APP ",
      title: "SafeDrive: Navigation App UI",
      category: "web",
      desc: "A cross-platform mobile application designed to enhance driver security and route guidance. Integrates real-time GPS coordinate mapping, emergency SOS contact dispatch, and OTP verification.",
      languages: ["Figma", "UI/UX Design", "Mobile UI", "Prototyping"],
      viewProjectUrl: "https://www.figma.com/design/06Qull1KJ1vtLGIvrdmoy9/SafeDrive-UI?node-id=0-1&t=I8yofZp73HkbfYRX-0",
      uiux: true,     // Figma design: shows "VIEW IN FIGMA", no source code button
      images: [
        "assets/images/projects/safedrive_1.png",
      ]
    },
    {
      id: "recordsmgmt",
      num: "04",
      tag: "UI/UX DESIGN & WEB APP",
      title: "Records Management UI",
      category: "web",
      desc: "A web management portal and database registry tracking scholar academic performance, GPA standings, student records, and enrollment status.",
      languages: ["Figma", "UI/UX Design", "Mobile UI", "Prototyping"],
      viewProjectUrl: "https://www.figma.com/design/K3TbTsCNz7BNU3wIcZNlgG/Mockup-UI?node-id=12-19&t=Q4o1v6hLJ1olCfE1-0",
      uiux: true,
      images: [
        "assets/images/projects/recordsmgmt_1.png",
        "assets/images/projects/recordsmgmt_4.png",
        "assets/images/projects/recordsmgmt_2.png",
        "assets/images/projects/recordsmgmt_3.png",
      ]
    },
    {
      id: "watchable",
      num: "05",
      tag: "UI/UX DESIGN & STREAMING PLATFORM",
      title: "Watchable: Streaming Platform UI",
      category: "web",
      desc: "A video streaming platform that allows users to browse and discover movies and video content. It features a home page with featured videos, categorized content, and recommended videos. The design focuses on providing users with an organized, user-friendly, and visually engaging entertainment browsing experience.",
      languages: ["Figma", "UI/UX Design", "Mobile UI", "Prototyping"],
      viewProjectUrl: "https://www.figma.com/design/pMnxgxGgusrLR9EyH56pam/Watchable?node-id=0-1&p=f&t=nsxMEcMF8wtjoZOC-0",
      uiux: true,
      fullImageFromSlide: 1, // slide 2 onward (index 1+) is shown whole, not cropped
      images: [
        "assets/images/projects/watchable_1.png",
        "assets/images/projects/watchable_2.png",
        "assets/images/projects/watchable_3.png",
        "assets/images/projects/watchable_4.png",
        "assets/images/projects/watchable_5.png"
      ]
    }
  ];

  /* ==========================================================================
     2. CINEMATIC INTRO SEQUENCE
     Sequence requirement:
     - Black screen with "NEED" -> 1st picture immediately (House)
     - Black screen with "MONEY" -> 2nd picture (Car)
     - Black screen with "FOR" -> 3rd picture (Interior)
     - Black screen with "MY" -> 11th picture (Sofa)
     - Black screen with "FUTURE"
     - Fast reprise: Pictures with large text in middle, one by one fast cadence down to 0.2s
     - Black shutters close from top & bottom until meeting in the middle
     - Shutter opens revealing landing page!
     ========================================================================== */
  const introOverlay = document.getElementById('intro-overlay');
  const introBgImage = document.getElementById('intro-bg-image');
  const introWord = document.getElementById('intro-word');
  const introStage = document.getElementById('intro-stage');
  const introSkipBtn = document.getElementById('intro-skip-btn');
  const btnReplayIntro = document.getElementById('btn-replay-intro');

  const imgHouse = 'assets/images/intro_house_1.png';
  const imgCar = 'assets/images/intro_car_2.png';
  const imgInterior = 'assets/images/intro_interior_3.png';
  const imgSofa = 'assets/images/intro_sofa_11.png';

  let introTimers = [];
  let isIntroRunning = false;

  function introWait(fn, ms) {
    introTimers.push(setTimeout(fn, ms));
  }
  function clearIntroTimers() {
    introTimers.forEach(clearTimeout);
    introTimers = [];
  }

  /* TIMING (ms)
     Phase 1: starts at 0.3s and gets faster every step.
     Phase 2: picture + big word together, fast and even. The shutters start
              closing on the FIRST combo and finish exactly when the LAST combo
              ends, so both run at the same pace. */
  const PHASE1_MS = [300, 270, 245, 220, 195, 170, 150, 130, 115];
  const COMBO_MS = 110;
  const HOLD_CLOSED_MS = 60;   // tiny black beat before opening
  const REVEAL_MS = 550;       // must match .reveal-open transition in CSS

  const introSteps = [
    // Phase 1: speeding up
    { type: 'text',  word: 'NEED',   duration: PHASE1_MS[0] },
    { type: 'image', img: imgHouse,    duration: PHASE1_MS[1] },
    { type: 'text',  word: 'MONEY',  duration: PHASE1_MS[2] },
    { type: 'image', img: imgCar,      duration: PHASE1_MS[3] },
    { type: 'text',  word: 'FOR',    duration: PHASE1_MS[4] },
    { type: 'image', img: imgInterior, duration: PHASE1_MS[5] },
    { type: 'text',  word: 'MY',     duration: PHASE1_MS[6] },
    { type: 'image', img: imgSofa,     duration: PHASE1_MS[7] },
    { type: 'text',  word: 'FUTURE', duration: PHASE1_MS[8] },

    // Phase 2: picture + big word, shutters close during this whole phase
    { type: 'combo', img: imgHouse,    word: 'NEED',   duration: COMBO_MS },
    { type: 'combo', img: imgCar,      word: 'MONEY',  duration: COMBO_MS },
    { type: 'combo', img: imgInterior, word: 'FOR',    duration: COMBO_MS },
    { type: 'combo', img: imgSofa,     word: 'MY',     duration: COMBO_MS },
    { type: 'combo', img: imgHouse,    word: 'FUTURE', duration: COMBO_MS }
  ];

  const comboTotalMs = introSteps
    .filter(s => s.type === 'combo')
    .reduce((sum, s) => sum + s.duration, 0);

  function runIntroSequence(stepIndex = 0) {
    if (!isIntroRunning) return;

    // Done: shutters are fully closed -> hide the stage, then open onto the landing page
    if (stepIndex >= introSteps.length) {
      introOverlay.classList.add('stage-hidden');
      introWait(() => {
        introOverlay.classList.remove('shutters-closed');
        introOverlay.classList.add('reveal-open');
        playHeroAnimation();
        introWait(finishIntro, REVEAL_MS);
      }, HOLD_CLOSED_MS);
      return;
    }

    const step = introSteps[stepIndex];

    if (step.type === 'text') {
      introStage.classList.remove('strobe-mode');
      introBgImage.classList.remove('visible');
      introBgImage.style.backgroundImage = 'none';
      introWord.textContent = step.word;
      introWord.classList.add('visible');
    } else if (step.type === 'image') {
      introWord.classList.remove('visible');
      introBgImage.style.backgroundImage = `url('${step.img}')`;
      introBgImage.classList.add('visible');
    } else if (step.type === 'combo') {
      // First combo: start closing the shutters over the whole combo phase
      if (!introOverlay.classList.contains('shutters-closed')) {
        introOverlay.style.setProperty('--shutter-close-ms', comboTotalMs + 'ms');
        introOverlay.classList.add('shutters-closed');
      }
      introStage.classList.add('strobe-mode');
      introBgImage.style.backgroundImage = `url('${step.img}')`;
      introBgImage.classList.add('visible');
      introWord.textContent = step.word;
      introWord.classList.add('visible');
    }

    introWait(() => runIntroSequence(stepIndex + 1), step.duration);
  }

  /* ==========================================================================
     2b. HERO ENTRANCE: HELLO / MEET / STEPHEN rise from below,
         subtitle types itself out. Fires as the shutters open.
     ========================================================================== */
  const heroCanvas = document.querySelector('.hero-canvas');
  const heroSubtitle = document.querySelector('.hero-subtitle-tag');
  const heroSubtitleText = heroSubtitle ? heroSubtitle.textContent.trim() : '';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let heroTimers = [];
  let heroPlayed = false;

  function clearHeroTimers() {
    heroTimers.forEach(clearTimeout);
    heroTimers = [];
  }

  function resetHeroAnimation() {
    clearHeroTimers();
    heroPlayed = false;
    if (prefersReducedMotion || !heroCanvas) return;
    heroCanvas.classList.remove('hero-play');
    heroCanvas.classList.add('hero-prep');
    if (heroSubtitle) {
      heroSubtitle.setAttribute('aria-label', heroSubtitleText);
      heroSubtitle.textContent = '';
    }
  }

  function playHeroAnimation() {
    if (heroPlayed || prefersReducedMotion || !heroCanvas) return;
    heroPlayed = true;

    // Force a reflow so the transition runs from the hidden state
    void heroCanvas.offsetWidth;
    heroCanvas.classList.add('hero-play');

    if (!heroSubtitle) return;

    // Typewriter starts once STEPHEN has mostly landed
    const textNode = document.createTextNode('');
    const caret = document.createElement('span');
    caret.className = 'type-caret';
    heroSubtitle.textContent = '';
    heroSubtitle.append(textNode, caret);

    let i = 0;
    const typeNext = () => {
      i++;
      textNode.nodeValue = heroSubtitleText.slice(0, i);
      if (i < heroSubtitleText.length) {
        heroTimers.push(setTimeout(typeNext, 55));
      } else {
        // Leave the caret blinking briefly, then remove it
        heroTimers.push(setTimeout(() => caret.remove(), 2200));
      }
    };
    heroTimers.push(setTimeout(typeNext, 900));
  }

  function startIntro() {
    clearIntroTimers();
    resetHeroAnimation();
    isIntroRunning = true;
    document.body.classList.add('intro-active');
    introOverlay.style.display = 'flex';
    introOverlay.classList.remove('shutters-closed', 'reveal-open', 'stage-hidden');
    introStage.classList.remove('strobe-mode');
    introBgImage.classList.remove('visible');
    introBgImage.style.backgroundImage = 'none';
    introWord.classList.remove('visible');
    runIntroSequence(0);
  }

  function finishIntro() {
    isIntroRunning = false;
    clearIntroTimers();
    playHeroAnimation(); // no-op if it already started (e.g. intro was skipped)
    introOverlay.style.display = 'none';
    document.body.classList.remove('intro-active');
  }

  introSkipBtn?.addEventListener('click', finishIntro);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isIntroRunning) {
      finishIntro();
    }
  });

  btnReplayIntro?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    startIntro();
  });

  // Start intro automatically on load
  startIntro();

  /* ==========================================================================
     3. INTERACTIVE HERO NAME BADGE {{ first name | }}
     Requirement:
     - Blinking vertical line beside the word name
     - When clicked, "first name" vanishes into {{ (blinking cursor) }}
     - Visitor can type anything with max 20 letters
     ========================================================================== */
  const badgeContainer = document.getElementById('name-badge-container');
  const nameDisplay = document.getElementById('custom-name-display');
  const nameInput = document.getElementById('visitor-name-input');

  let hasBeenEdited = false;

  if (badgeContainer && nameInput && nameDisplay) {
    badgeContainer.addEventListener('click', () => {
      if (!hasBeenEdited && nameDisplay.textContent.trim() === 'first name') {
        nameDisplay.textContent = '';
        nameInput.value = '';
        hasBeenEdited = true;
      }
      nameInput.focus();
      badgeContainer.classList.add('is-focused');
    });

    nameInput.addEventListener('input', (e) => {
      const val = e.target.value.slice(0, 20);
      nameDisplay.textContent = val;
    });

    nameInput.addEventListener('blur', () => {
      badgeContainer.classList.remove('is-focused');
      if (nameDisplay.textContent.trim() === '') {
        nameDisplay.textContent = 'first name';
        hasBeenEdited = false;
      }
    });

    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        nameInput.blur();
      }
    });
  }

  /* ==========================================================================
     4. ABOUT SECTION STORY ACCORDION
     Requirement:
     - "READ FULL STORY" button reveals full text
     - Button toggles to "SHOW LESS" in bold text
     ========================================================================== */
  const btnToggleStory = document.getElementById('btn-toggle-story');
  const expandedStory = document.getElementById('about-expanded-story');
  const storyBtnText = document.getElementById('story-btn-text');

  if (btnToggleStory && expandedStory && storyBtnText) {
    btnToggleStory.addEventListener('click', () => {
      const isOpen = expandedStory.classList.contains('is-open');

      if (isOpen) {
        expandedStory.classList.remove('is-open');
        btnToggleStory.classList.remove('is-expanded');
        storyBtnText.textContent = 'READ FULL STORY';
        storyBtnText.style.fontWeight = '700';
      } else {
        expandedStory.classList.add('is-open');
        btnToggleStory.classList.add('is-expanded');
        storyBtnText.textContent = 'SHOW LESS';
        storyBtnText.style.fontWeight = '900'; // in bold text
      }
    });
  }

  /* ==========================================================================
     5. KINETIC SCROLLING TEXT
     Left copy is pinned (CSS sticky). As the section scrolls, the word column
     rises from the bottom of its box; words are sharp + dark near the top and
     get blurrier / lighter the lower they sit.
     ========================================================================== */
  const kineticSection = document.getElementById('kinetic-scroll');
  const kineticRight = document.getElementById('kinetic-right');
  const kineticTrack = document.getElementById('kinetic-words-track');
  const kineticRows = document.querySelectorAll('.kinetic-word-row');
  const kineticReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let kineticTicking = false;

  function updateKineticScroll() {
    kineticTicking = false;
    if (kineticReduced || !kineticSection || !kineticRight || !kineticTrack || kineticRows.length === 0) return;

    const boxH = kineticRight.clientHeight;
    const trackH = kineticTrack.offsetHeight;
    const lastRow = kineticRows[kineticRows.length - 1];

    // 0 -> 1 across the pinned scroll distance
    const rect = kineticSection.getBoundingClientRect();
    const scrollable = kineticSection.offsetHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, -rect.top / scrollable));

    // Start: whole track just below the box. End: last word sits ~30% from the top.
    const startY = boxH;
    const endY = boxH * 0.3 - (trackH - lastRow.offsetHeight / 2);
    const y = startY + (endY - startY) * p;
    kineticTrack.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';

    // Depth of field per word, based on where its centre sits in the box
    kineticRows.forEach(row => {
      const centre = y + row.offsetTop + row.offsetHeight / 2;
      const f = centre / boxH;                         // 0 = top, 1 = bottom
      const t = Math.max(0, Math.min(1, (f - 0.3) / 0.7)); // 0 sharp zone, 1 deepest blur
      const text = row.firstElementChild;
      const grey = Math.round(18 + t * 150);           // #121214 -> light grey
      text.style.filter = 'blur(' + (t * 4).toFixed(1) + 'px)';
      text.style.opacity = (1 - t * 0.55).toFixed(2);
      text.style.color = 'rgb(' + grey + ',' + grey + ',' + (grey + 2) + ')';
    });
  }

  function requestKineticUpdate() {
    if (!kineticTicking) {
      kineticTicking = true;
      requestAnimationFrame(updateKineticScroll);
    }
  }

  window.addEventListener('scroll', requestKineticUpdate, { passive: true });
  window.addEventListener('resize', requestKineticUpdate);
  window.addEventListener('load', requestKineticUpdate);
  updateKineticScroll();

  /* ==========================================================================
     6. TECHNICAL SKILLS & STACK ACCORDION (References: 7th & 8th pictures)
     - Closed: EXPLORE TECHNICAL SKILLS & STACK
     - Open: HIDE TECHNICAL SKILLS & STACK
     ========================================================================== */
  const stackHeader = document.getElementById('stack-toggle-header');
  const stackContent = document.getElementById('stack-panel-content');
  const stackHeaderTitle = document.getElementById('stack-header-title');

  if (stackHeader && stackContent && stackHeaderTitle) {
    stackHeader.addEventListener('click', () => {
      const isOpen = stackContent.classList.contains('is-open');

      if (isOpen) {
        stackContent.classList.remove('is-open');
        stackHeader.classList.remove('is-open');
        stackHeader.setAttribute('aria-expanded', 'false');
        stackHeaderTitle.textContent = 'EXPLORE TECHNICAL SKILLS & STACK';
      } else {
        stackContent.classList.add('is-open');
        stackHeader.classList.add('is-open');
        stackHeader.setAttribute('aria-expanded', 'true');
        stackHeaderTitle.textContent = 'HIDE TECHNICAL SKILLS & STACK';
      }
    });

    stackHeader.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        stackHeader.click();
      }
    });
  }

  /* ==========================================================================
     7. PROJECTS SHOWCASE & POPPING CARDS ON SCROLL (13th, 14th, 15th, 16th)
     ========================================================================== */
  const projectsGrid = document.getElementById('projects-grid');
  const categoryTabs = document.querySelectorAll('.category-tab');
  const emptyState = document.getElementById('category-empty-state');

  const projectsTrack = document.getElementById('projects-track');
  const projectsHint = document.getElementById('projects-scroll-hint');
  const projectsCounter = document.getElementById('projects-counter');

  // "Scattered on a table" look: per-card tilt + vertical nudge
  const CARD_TILTS = [-2.2, 0.8, -1.4, 2.4, -1];           // degrees
  const CARD_NUDGES = [-0.04, 0.03, -0.02, 0.015, -0.03];  // fraction of viewport height
  const SCROLL_PER_CARD = 0.75; // viewport heights of scrolling per card

  let activeCards = [];
  let cardGeom = [];

  const clamp01 = v => Math.max(0, Math.min(1, v));
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  function renderProjects(filterCategory = 'all') {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';

    const filtered = filterCategory === 'all'
      ? projectsData
      : projectsData.filter(p => p.category === filterCategory);

    const isEmpty = filtered.length === 0;
    if (emptyState) emptyState.style.display = isEmpty ? 'block' : 'none';
    document.querySelector('.projects-main-heading')?.style.setProperty('opacity', isEmpty ? '0.15' : '1');

    activeCards = filtered.map((proj) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-id', proj.id);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Open project: ${proj.title}`);

      card.innerHTML = `
        <div class="project-card-inner">
          <img src="${proj.images[0]}" alt="${proj.title}">
          <div class="card-caption-top">${proj.num} // ${proj.tag}</div>
          <div class="card-explore-pill">VIEW PROJECT ↗</div>
          <div class="card-caption-bottom"><span>${proj.title}</span></div>
        </div>
      `;

      card.addEventListener('click', () => openProjectModal(proj.id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(proj.id);
        }
      });

      projectsGrid.appendChild(card);
      return card;
    });

    layoutProjects();
    updateProjectsScroll();
  }

  // Sizes the scroll track and works out where each card ends up
  function layoutProjects() {
    if (!projectsTrack) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const n = activeCards.length;

    projectsTrack.style.height = n === 0 ? '100vh' : `${(1 + n * SCROLL_PER_CARD) * vh}px`;

    const isMobile = vw < 700;
    const cardW = isMobile ? Math.min(vw * 0.7, vh * 0.5) : Math.min(vw * 0.3, vh * 0.66);

    cardGeom = activeCards.map((card, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const startX = -cardW * 0.04;
      const endX = vw - cardW * 0.98;
      const left = n === 1 ? (vw - cardW) / 2 : startX + (endX - startX) * t;
      const top = (vh - cardW) / 2 + CARD_NUDGES[i % CARD_NUDGES.length] * vh;
      const rot = CARD_TILTS[i % CARD_TILTS.length];

      card.style.setProperty('--card-w', `${cardW}px`);
      card.style.left = `${left}px`;
      card.style.top = `${top}px`;
      card.style.zIndex = String(10 + i); // later cards stack on top
      return { left, rot, cardW };
    });
  }

  // Scroll-driven: each card rises in from the bottom, one after another
  function updateProjectsScroll() {
    if (!projectsTrack || activeCards.length === 0) {
      if (projectsCounter) projectsCounter.textContent = '00 / 00';
      return;
    }
    const n = activeCards.length;
    const vh = window.innerHeight;
    const scrollable = projectsTrack.offsetHeight - vh;
    const rect = projectsTrack.getBoundingClientRect();
    const raw = scrollable > 0 ? clamp01(-rect.top / scrollable) : 1;
    // last card lands at ~90% so the full row rests briefly before unpinning
    const p = clamp01(raw / 0.9);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let shown = 0;
    activeCards.forEach((card, i) => {
      const g = cardGeom[i];
      const t = reduceMotion ? 1 : clamp01(p * n - i);
      const e = easeOutCubic(t);
      // Rise from below the viewport: start fully off the bottom edge
      const offY = vh - parseFloat(card.style.top || 0) + 80;
      const y = offY * (1 - e);
      const rot = g.rot - (1 - e) * 6;

      card.style.transform = `translate3d(0, ${y}px, 0) rotate(${rot}deg)`;
      card.style.opacity = String(clamp01(t * 6));
      card.classList.toggle('is-in', t >= 1);
      if (t > 0) shown++;
    });

    if (projectsHint) projectsHint.style.opacity = p > 0.02 ? '0' : '1';
    if (projectsCounter) {
      projectsCounter.textContent = `${String(shown).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
    }
  }

  let projectsTicking = false;
  window.addEventListener('scroll', () => {
    if (projectsTicking) return;
    projectsTicking = true;
    requestAnimationFrame(() => {
      updateProjectsScroll();
      projectsTicking = false;
    });
  }, { passive: true });

  window.addEventListener('resize', () => {
    layoutProjects();
    updateProjectsScroll();
  });

  // Category Filter Tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-category');
      renderProjects(cat);

      // Land on the fully revealed row for the chosen category
      if (projectsTrack) {
        const trackTop = projectsTrack.getBoundingClientRect().top + window.scrollY;
        const target = activeCards.length === 0
          ? trackTop
          : trackTop + (projectsTrack.offsetHeight - window.innerHeight);
        window.scrollTo({ top: target, behavior: 'instant' });
        updateProjectsScroll();
      }
    });
  });

  // Initial render
  renderProjects('all');

  /* ==========================================================================
     8. PROJECT DETAIL MODAL (Reference: 16th picture)
     - 5 pictures carousel (with add/remove scalability)
     - Thumbnail strip
     - Page counter e.g. 01 / 05
     - Number badge e.g. 01 // FULL-STACK WEB APP
     - View Project & Source Code buttons (Figma removed on Project 3 as requested)
     ========================================================================== */
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalActiveImg = document.getElementById('modal-active-img');
  const modalThumbnailsStrip = document.getElementById('modal-thumbnails-strip');
  const modalDashIndicators = document.getElementById('carousel-dash-indicators');
  const modalPageCounter = document.getElementById('carousel-page-counter');
  const modalProjectNum = document.getElementById('modal-project-num');
  const modalProjectTag = document.getElementById('modal-project-tag');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectDesc = document.getElementById('modal-project-desc');
  const modalBox = document.querySelector('.project-modal-box');
  const modalImgContainer = document.querySelector('.modal-main-img-container');
  const modalViewProjectLink = document.getElementById('modal-view-project-link');
  const modalViewProjectLabel = document.getElementById('modal-view-project-label')
    || (modalViewProjectLink && modalViewProjectLink.querySelector('span'));
  const modalSourceCodeLink = document.getElementById('modal-source-code-link');
  const modalStackTags = document.getElementById('modal-stack-tags');
  const btnPrev = document.getElementById('carousel-prev-btn');
  const btnNext = document.getElementById('carousel-next-btn');

  let currentProject = null;
  let currentSlideIndex = 0;

  function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    currentProject = project;
    currentSlideIndex = 0;

    // Populate Metadata
    modalProjectNum.textContent = project.num;
    modalProjectTag.textContent = project.tag;
    modalProjectTitle.textContent = project.title;
    modalProjectDesc.textContent = project.desc;
    modalViewProjectLink.href = project.viewProjectUrl || '#';

    // UI/UX designs: "VIEW IN FIGMA" and no source code button
    if (modalViewProjectLabel) modalViewProjectLabel.textContent = project.uiux ? 'VIEW IN FIGMA' : 'VIEW PROJECT';
    const showSource = !project.uiux && !!project.sourceCodeUrl;
    modalSourceCodeLink.href = project.sourceCodeUrl || '#';
    if (modalSourceCodeLink) modalSourceCodeLink.style.display = showSource ? '' : 'none';

    if (modalBox) modalBox.scrollTop = 0;

    // Tech Tags
    modalStackTags.innerHTML = project.languages.map(tech => 
      `<span class="modal-tech-pill">${tech}</span>`
    ).join('');

    // Setup Carousel Thumbnails & Dash Indicators
    buildCarousel(project);

    // Open Modal
    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function buildCarousel(project) {
    modalThumbnailsStrip.innerHTML = '';
    modalDashIndicators.innerHTML = '';

    const total = project.images.length;

    project.images.forEach((imgSrc, idx) => {
      // Thumbnail
      const thumb = document.createElement('div');
      thumb.className = `modal-thumb-item ${idx === 0 ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${idx + 1}">`;
      thumb.addEventListener('click', () => {
        setSlide(idx);
      });
      modalThumbnailsStrip.appendChild(thumb);

      // Dash indicator
      const dash = document.createElement('div');
      dash.className = `carousel-dash-dot ${idx === 0 ? 'active' : ''}`;
      modalDashIndicators.appendChild(dash);
    });

    setSlide(0);
  }

  function setSlide(index) {
    if (!currentProject || !currentProject.images.length) return;
    const total = currentProject.images.length;

    currentSlideIndex = (index + total) % total;

    // Update main image
    modalActiveImg.src = currentProject.images[currentSlideIndex];

    // Tall screenshots (e.g. Watchable slide 2+): show the whole picture
    const fullFrom = currentProject.fullImageFromSlide;
    const showWhole = typeof fullFrom === 'number' && currentSlideIndex >= fullFrom;
    if (modalImgContainer) modalImgContainer.classList.toggle('is-full-shot', showWhole);

    // Update counter (e.g. 01 / 05)
    const curPadded = String(currentSlideIndex + 1).padStart(2, '0');
    const totPadded = String(total).padStart(2, '0');
    modalPageCounter.textContent = `${curPadded} / ${totPadded}`;

    // Update active thumb
    const thumbs = modalThumbnailsStrip.querySelectorAll('.modal-thumb-item');
    thumbs.forEach((t, i) => {
      t.classList.toggle('active', i === currentSlideIndex);
      if (i === currentSlideIndex) {
        t.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
      }
    });

    // Update active dash
    const dashes = modalDashIndicators.querySelectorAll('.carousel-dash-dot');
    dashes.forEach((d, i) => {
      d.classList.toggle('active', i === currentSlideIndex);
    });
  }

  btnPrev?.addEventListener('click', () => setSlide(currentSlideIndex - 1));
  btnNext?.addEventListener('click', () => setSlide(currentSlideIndex + 1));

  modalCloseBtn?.addEventListener('click', closeProjectModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modalBackdrop.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeProjectModal();
    } else if (e.key === 'ArrowLeft') {
      setSlide(currentSlideIndex - 1);
    } else if (e.key === 'ArrowRight') {
      setSlide(currentSlideIndex + 1);
    }
  });

  /* ==========================================================================
     8b. ABOUT SECTION REVEAL (plays when the section scrolls into view)
     ========================================================================== */
  const aboutSection = document.getElementById('about');
  if (aboutSection && !prefersReducedMotion && 'IntersectionObserver' in window) {
    aboutSection.classList.add('about-ready');
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutSection.classList.add('about-in');
          aboutObserver.disconnect();
        }
      });
    }, { threshold: 0.25 });
    aboutObserver.observe(aboutSection);
  }

  /* ==========================================================================
     8c. FAQ ACCORDION + FAQ / FOOTER SCROLL REVEALS + COPY EMAIL
     ========================================================================== */
  // Generic reveal: hides with `readyClass`, then plays when scrolled into view
  function revealOnScroll(el, readyClass, inClass, threshold = 0.2) {
    if (!el || prefersReducedMotion || !('IntersectionObserver' in window)) return;
    el.classList.add(readyClass);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add(inClass);
          obs.disconnect();
        }
      });
    }, { threshold });
    obs.observe(el);
  }

  revealOnScroll(document.getElementById('faq'), 'faq-ready', 'faq-in', 0.2);
  revealOnScroll(document.getElementById('contact'), 'footer-ready', 'footer-in', 0.15);

  // FAQ accordion: one open at a time, click again to close
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      faqItems.forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Email: the text in #footer-email is the single source of truth
  const footerEmail = document.getElementById('footer-email');
  const talkBtn = document.getElementById('btn-lets-talk');
  const copyBtn = document.getElementById('btn-copy-email');
  const copyText = document.getElementById('copy-email-text');

  if (footerEmail) {
    const email = footerEmail.textContent.trim();
    footerEmail.href = 'mailto:' + email;
    if (talkBtn) talkBtn.href = 'mailto:' + email;

    copyBtn?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
      } catch (err) {
        // Fallback for browsers/contexts without the Clipboard API
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { /* ignore */ }
        ta.remove();
      }
      if (copyText) {
        copyText.textContent = 'COPIED!';
        setTimeout(() => { copyText.textContent = 'COPY EMAIL'; }, 1800);
      }
    });
  }

  /* ==========================================================================
     9. MOBILE NAVIGATION TOGGLE & SMOOTH SCROLLING
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .brand-logo');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('is-active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-active');
      });
    });
  }

});

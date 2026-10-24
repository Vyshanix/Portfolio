/**
 * STEPHEN JAMES A. BULA — PORTFOLIO MAIN SCRIPT
 * Minimalist, Fast, Zero-Dependency JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCebuClock();
  initNavigation();
  initProjectFilters();
  initModals();
  initClipboardButtons();
  initContactForm();
  initScrollSpy();
});

/* ==========================================================================
   1. THEME SWITCHER (Dark / Light)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  // Check saved preference, existing attribute, or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialAttr = htmlEl.getAttribute('data-theme');

  const currentTheme = savedTheme || (initialAttr !== null ? initialAttr : (systemPrefersDark ? 'dark' : 'light'));
  htmlEl.setAttribute('data-theme', currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const active = htmlEl.getAttribute('data-theme');
      const next = active === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      showToast(`Switched to ${next} mode`);
    });
  }
}

/* ==========================================================================
   2. LIVE CEBU CLOCK (Asia/Manila, UTC+8)
   ========================================================================== */
function initCebuClock() {
  const clockEl = document.getElementById('cebuTime');
  if (!clockEl) return;

  function update() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      clockEl.textContent = formatter.format(now);
    } catch (e) {
      // Fallback for older browsers
      const d = new Date();
      clockEl.textContent = d.toLocaleTimeString();
    }
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   3. MOBILE NAVIGATION & SMOOTH SCROLL
   ========================================================================== */
function initNavigation() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileBtn.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileBtn.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !mobileBtn.contains(e.target)) {
        mobileNav.classList.remove('open');
        mobileBtn.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ==========================================================================
   4. SCROLL SPY (Active Link Highlight)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-desktop .nav-link');

  if (!sections.length || !desktopLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   5. PROJECT FILTERING
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          const categoryList = (card.dataset.category || '').split(/\s+/);
          if (categoryList.includes(filter)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        }
      });
    });
  });
}

/* ==========================================================================
   6. PROJECT & RESUME MODALS
   ========================================================================== */
const projectDatabase = {
  tastetrack: {
    title: "IPT-TasteTrack: Recipe & Social Platform",
    category: "Full-Stack Web (Python & Django)",
    year: "2026",
    image: "tastetrack_bicol.webp",
    overview: "A comprehensive full-stack social web platform designed for food enthusiasts and home cooks to document, share, and discover culinary recipes with interactive social feeds. Developed for the Integrative Programming & Technologies (IPT) course.",
    problem: "Traditional cooking websites are often static blogs that lack interactive social feedback, follower graphs, or intuitive dietary & difficulty filtering.",
    solution: "Engineered a full-stack Django application featuring relational database modeling, user profile following, instant comments, customized emoji reactions (Like, Love, Delicious), and recipe reposts.",
    features: [
      "Custom Django models for recipes, ingredients, instructions, and user profiles",
      "Dynamic social interaction: comments, multi-type emoji reactions, and follower notifications",
      "Smart search and filtering across recipe difficulty (Easy/Medium/Hard) and preparation duration",
      "User dashboard with published recipe management, follower metrics, and profile pictures"
    ],
    tech: ["Python", "Django Framework", "SQLite", "HTML5 / CSS3", "JavaScript", "Bootstrap", "Django ORM"],
    status: "Completed Course Project (IPT)"
  },
  safedrive: {
    title: "SafeDrive: Driver Safety & Navigation App",
    category: "Mobile Application (Flutter & Dart)",
    year: "2025",
    image: "safedrive_car.png",
    overview: "A cross-platform Flutter mobile application designed to promote vehicular safety, route guidance, and real-time emergency assistance for motorists and commuters.",
    problem: "Drivers require quick, distraction-free access to navigation, speed monitoring, and an immediate SOS emergency trigger in the event of accidents or roadside issues.",
    solution: "Developed a native mobile app utilizing Flutter Map, OpenStreetMap integration, and device geolocator APIs paired with a secure OTP onboarding flow and instant emergency contact dispatch.",
    features: [
      "Interactive map rendering with OpenStreetMap tiles using flutter_map and latlong2",
      "Live GPS geolocation tracking and heading orientation via geolocator",
      "Emergency SOS notification dispatch to designated family/friend contacts",
      "Custom OTP verification screen with 4-digit pin input (pinput library)",
      "Animated onboarding tutorials and driver profile management"
    ],
    tech: ["Flutter", "Dart", "flutter_map", "latlong2", "geolocator", "Local Notifications", "pinput"],
    status: "Completed Mobile Project"
  },
  adetfinal: {
    title: "ADET Music Player: Audio Streaming App",
    category: "Mobile Application (Flutter & Audio)",
    year: "2025",
    image: "music_player_thumb.jpg",
    overview: "A modern mobile music streaming application featuring high-fidelity audio playback, custom scrubbable progress bar, and elegant album art visualizers. Developed as the final project for App Development & Emerging Tech (ADET).",
    problem: "Creating a smooth audio player requires meticulous state synchronization between background audio threads, position listeners, and UI seek bars without latency or audio glitches.",
    solution: "Implemented a robust playback controller using Flutter's audioplayers package with asynchronous duration streams and a sleek, minimalist dark-mode interface powered by Google Fonts.",
    features: [
      "Real-time position and duration synchronization with interactive seek slider",
      "Dynamic playlist rendering with local audio assets and high-res album artwork",
      "Minimalist audio controls (play/pause toggle, skip, seek, and loop)",
      "Custom typography and modern card elevation compliant with Material 3"
    ],
    tech: ["Flutter", "Dart", "audioplayers", "Google Fonts", "Material 3", "State Management"],
    status: "Completed Final Project (ADET)"
  },
  scholarssystem: {
    title: "Lourdes Parish Scholars Record System",
    category: "Database & Management Portal",
    year: "2025",
    image: "scholars_system.png",
    overview: "An administrative web management system created to track scholar academic standings, GPA calculations, course enrollments, and status updates for Cebu Eastern College scholars.",
    problem: "Managing dozens of scholars across varied grade levels and degree programs via paper spreadsheets led to delayed evaluations, GPA audit errors, and missing contact profiles.",
    solution: "Built a unified web dashboard providing centralized search, grade level filtering, GPA thresholds, and structured CRUD operations for efficient administration.",
    features: [
      "Real-time search and filter by student name, ID ('CEC-2023-...'), or college course",
      "GPA monitoring and academic excellence audit for scholarship renewal",
      "Standardized scholar profiles with student headshots, emails, and grade levels",
      "Responsive administrative dashboard with calendar and settings navigation"
    ],
    tech: ["Web Database", "Query Building", "CRUD Architecture", "UI/UX Prototyping", "Data Reporting"],
    status: "Production Prototype"
  },
  figmaprototypes: {
    title: "Interactive System Flows & Wireframe Prototypes",
    category: "UI/UX Design & Prototyping (Figma)",
    year: "2025",
    image: "figma_flow.png",
    overview: "Comprehensive Figma design system and multi-node interactive prototypes spanning complex application flows and an e-commerce catalog redesign.",
    problem: "Translating multi-stakeholder requirements into intuitive user journeys requires clear visual architecture before writing frontend code.",
    solution: "Constructed comprehensive Figma flow diagrams mapping screen transitions, overlay states, modal dialogs, and component libraries across both desktop and mobile viewports.",
    features: [
      "Multi-screen connected prototyping demonstrating end-to-end user navigation",
      "Complete e-commerce redesign for retro gaming & electronics ('Atari / Best Electronics')",
      "Design system specifications: typography scales, card layouts, buttons, and form inputs",
      "User journey optimization for low cognitive friction and rapid task completion"
    ],
    tech: ["Figma", "Wireframing", "User Flow Mapping", "Information Architecture", "Design Systems"],
    status: "Figma Interactive Prototypes"
  }
};

function initModals() {
  const resumeModal = document.getElementById('resumeModal');
  const projectModal = document.getElementById('projectModal');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  const viewProjectBtns = document.querySelectorAll('.view-project-modal');
  const printResumeBtn = document.getElementById('printResumeBtn');

  // Open Resume Modal
  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(resumeModal);
    });
  });

  // Open Project Modal
  viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.dataset.project;
      const data = projectDatabase[projKey];
      if (data) {
        renderProjectModal(data);
        openModal(projectModal);
      }
    });
  });

  // Print button
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Close handlers
  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.removeAttribute('hidden');
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
  document.body.style.overflow = 'hidden';
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal-backdrop');
  modals.forEach(m => {
    m.classList.remove('active');
    setTimeout(() => {
      m.setAttribute('hidden', '');
    }, 250);
  });
  document.body.style.overflow = '';
}

function renderProjectModal(data) {
  const catEl = document.getElementById('projectModalCategory');
  const titleEl = document.getElementById('projectModalTitle');
  const bodyEl = document.getElementById('projectModalBody');

  if (catEl) catEl.textContent = `${data.category} • ${data.year}`;
  if (titleEl) titleEl.textContent = data.title;

  const imgHtml = data.image ? `
    <div style="width:100%; max-height:240px; overflow:hidden; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); margin-bottom:18px; background-color:var(--bg-surface);">
      <img src="${data.image}" alt="${data.title}" style="width:100%; height:100%; max-height:240px; object-fit:cover; display:block;">
    </div>
  ` : '';

  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:18px;">
        ${imgHtml}
        <div>
          <h4 style="font-size:0.86rem; font-family:var(--font-mono); text-transform:uppercase; color:var(--text-muted); margin-bottom:6px;">Project Overview</h4>
          <p style="font-size:0.94rem; color:var(--text-secondary); line-height:1.6;">${data.overview}</p>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
          <div style="background-color:var(--bg-surface); padding:14px 16px; border-radius:var(--radius-sm); border:1px solid var(--border-subtle);">
            <strong style="font-size:0.84rem; color:var(--text-primary); display:block; margin-bottom:4px;">The Challenge</strong>
            <p style="font-size:0.84rem; color:var(--text-secondary); line-height:1.5;">${data.problem}</p>
          </div>
          <div style="background-color:var(--bg-surface); padding:14px 16px; border-radius:var(--radius-sm); border:1px solid var(--border-subtle);">
            <strong style="font-size:0.84rem; color:var(--text-primary); display:block; margin-bottom:4px;">The Implementation</strong>
            <p style="font-size:0.84rem; color:var(--text-secondary); line-height:1.5;">${data.solution}</p>
          </div>
        </div>

        <div>
          <h4 style="font-size:0.86rem; font-family:var(--font-mono); text-transform:uppercase; color:var(--text-muted); margin-bottom:8px;">Key Features & Architecture</h4>
          <ul style="list-style:disc; padding-left:20px; font-size:0.86rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            ${data.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>

        <div>
          <h4 style="font-size:0.86rem; font-family:var(--font-mono); text-transform:uppercase; color:var(--text-muted); margin-bottom:8px;">Technologies Applied</h4>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${data.tech.map(t => `<span class="tech-tag" style="background-color:var(--accent-soft);">${t}</span>`).join('')}
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-subtle); padding-top:16px; margin-top:6px;">
          <span style="font-size:0.82rem; font-family:var(--font-mono); color:var(--text-muted);">Status: <strong style="color:var(--accent-green);">${data.status}</strong></span>
          <a href="#contact" class="btn btn-sm btn-primary" onclick="closeAllModals()">
            <span>Inquire About Project</span>
          </a>
        </div>
      </div>
    `;
  }
}

/* ==========================================================================
   7. 1-CLICK CLIPBOARD COPY
   ========================================================================== */
function initClipboardButtons() {
  const copyBtns = document.querySelectorAll('[data-copy]');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const text = btn.dataset.copy;
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        showToast(`Copied to clipboard: ${text}`);

        // Visual feedback on button
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-green);"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span style="color:var(--accent-green);">Copied!</span>
        `;
        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 2000);
      } catch (err) {
        // Fallback for non-https/unsupported
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(`Copied: ${text}`);
      }
    });
  });
}

/* ==========================================================================
   8. INTERACTIVE CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('senderSubject').value;
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !subject || !message) {
      if (feedback) {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Please fill out all required fields.';
      }
      return;
    }

    // Build mailto link
    const mailtoBody = encodeURIComponent(
      `Hello Stephen,\n\n${message}\n\nFrom:\n${name}\nEmail: ${email}\nRegarding: ${subject}`
    );
    const mailtoLink = `mailto:stephenbula07@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${mailtoBody}`;

    if (feedback) {
      feedback.className = 'form-feedback success';
      feedback.innerHTML = `
        <strong>Thank you, ${name}!</strong> Opening your default mail client to dispatch your message directly to <strong>stephenbula07@gmail.com</strong>.
      `;
    }

    showToast("Launching email composer...");

    setTimeout(() => {
      window.location.href = mailtoLink;
      form.reset();
    }, 800);
  });
}

/* ==========================================================================
   9. TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

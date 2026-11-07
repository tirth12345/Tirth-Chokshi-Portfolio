/**
 * TIRTH CHOKSHI PORTFOLIO — main.js
 * PM Sprint Preloader, Three.js Hero, GSAP Animations, Case Modals, Contact Form
 */

/* ═══════════════════════════════════════════
   PM SPRINT LAUNCH PRELOADER
═══════════════════════════════════════════ */
(function initPmPreloader() {
  const preloader = document.getElementById('pm-preloader');
  if (!preloader) return;

  const progressBar = document.getElementById('pm-progress-bar');
  const percentText = document.getElementById('pm-progress-percent');
  const statusText = document.getElementById('pm-status-text');
  const steps = document.querySelectorAll('.pipeline-step');
  const lines = document.querySelectorAll('.pipeline-line');

  const pmPhases = [
    { threshold: 0,  step: 1, text: 'Discovering user friction & research cohorts...' },
    { threshold: 28, step: 2, text: 'Evaluating RICE prioritization & unit metrics...' },
    { threshold: 60, step: 3, text: 'Synthesizing PRDs, wireframes & architecture...' },
    { threshold: 88, step: 4, text: 'Launching 0-to-1 Product Portfolio...' },
  ];

  let isDone = false;

  function updateUI(val) {
    if (progressBar) progressBar.style.width = val + '%';
    if (percentText) percentText.textContent = Math.round(val) + '%';

    for (let i = pmPhases.length - 1; i >= 0; i--) {
      if (val >= pmPhases[i].threshold) {
        if (statusText) {
          const currentHTML = `<span class="pm-status-spinner"></span> ${pmPhases[i].text}`;
          if (statusText.innerHTML.trim() !== currentHTML.trim()) {
            statusText.innerHTML = currentHTML;
          }
        }

        steps.forEach((st, idx) => {
          if (idx + 1 < pmPhases[i].step) {
            st.classList.add('completed');
            st.classList.remove('active');
          } else if (idx + 1 === pmPhases[i].step) {
            st.classList.add('active');
            st.classList.remove('completed');
          } else {
            st.classList.remove('active', 'completed');
          }
        });

        lines.forEach((ln, idx) => {
          if (idx + 1 < pmPhases[i].step) {
            ln.classList.add('filled');
          } else {
            ln.classList.remove('filled');
          }
        });
        break;
      }
    }
  }

  function finishLoader() {
    if (isDone) return;
    isDone = true;
    updateUI(100);
    steps.forEach(st => { st.classList.add('completed'); st.classList.remove('active'); });
    lines.forEach(ln => ln.classList.add('filled'));
    if (statusText) statusText.innerHTML = `✅ Product Experience Shipped!`;

    setTimeout(() => {
      preloader.classList.add('loaded');
      setTimeout(() => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 700);
    }, 400);
  }

  const startTime = performance.now();
  const DURATION = 1900; // 1.9 seconds total duration

  function frame(now) {
    if (isDone) return;
    const elapsed = now - startTime;
    const progress = Math.min(100, (elapsed / DURATION) * 100);
    updateUI(progress);

    if (progress < 100) {
      requestAnimationFrame(frame);
    } else {
      finishLoader();
    }
  }
  requestAnimationFrame(frame);

  // Click / tap anywhere to instantly skip
  preloader.addEventListener('click', () => {
    finishLoader();
  });
})();

/* ═══════════════════════════════════════════
   THREE.JS HERO — Particle Network + Floating Geometric
═══════════════════════════════════════════ */
(function initThreeHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x050814, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 30);

  // ── Particle Field ──
  const PARTICLE_COUNT = 2200;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors    = new Float32Array(PARTICLE_COUNT * 3);
  const sizes     = new Float32Array(PARTICLE_COUNT);

  const colorA = new THREE.Color('#4f8aff');
  const colorB = new THREE.Color('#7c54ff');
  const colorC = new THREE.Color('#00d4aa');

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    positions[i3]     = (Math.random() - 0.5) * 120;
    positions[i3 + 1] = (Math.random() - 0.5) * 80;
    positions[i3 + 2] = (Math.random() - 0.5) * 60;
    sizes[i]          = Math.random() * 2.5 + 0.5;
    const t     = Math.random();
    const mixed = t < 0.33 ? colorA.clone().lerp(colorB, t * 3)
                 : t < 0.66 ? colorB.clone().lerp(colorC, (t - 0.33) * 3)
                 : colorC.clone().lerp(colorA, (t - 0.66) * 3);
    colors[i3]     = mixed.r;
    colors[i3 + 1] = mixed.g;
    colors[i3 + 2] = mixed.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    size: 0.6, sizeAttenuation: true,
    vertexColors: true, transparent: true, opacity: 0.75,
    depthWrite: false, blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // ── Floating Wireframe Geometric Object (Icosahedron) ──
  const icoGeo = new THREE.IcosahedronGeometry(8, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x4f8aff, wireframe: true, transparent: true, opacity: 0.12
  });
  const ico = new THREE.Mesh(icoGeo, icoMat);
  ico.position.set(18, 0, -10);
  scene.add(ico);

  // ── Second glowing torus ──
  const torusGeo = new THREE.TorusGeometry(5, 0.15, 16, 80);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0x7c54ff, transparent: true, opacity: 0.25
  });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.position.set(18, 0, -10);
  torus.rotation.x = Math.PI / 4;
  scene.add(torus);

  // ── Second torus ring ──
  const torus2 = new THREE.Mesh(
    new THREE.TorusGeometry(5, 0.1, 16, 80),
    new THREE.MeshBasicMaterial({ color: 0x00d4aa, transparent: true, opacity: 0.18 })
  );
  torus2.position.set(18, 0, -10);
  torus2.rotation.y = Math.PI / 4;
  scene.add(torus2);

  // ── Mouse parallax ──
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── Animate ──
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.004;

    particles.rotation.y = t * 0.08;
    particles.rotation.x = t * 0.03;

    ico.rotation.x = t * 0.25;
    ico.rotation.y = t * 0.35;

    torus.rotation.z  = t * 0.5;
    torus2.rotation.z = -t * 0.4;

    // Camera parallax based on mouse
    camera.position.x += (mouseX * 3 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();

  // ── Resize ──
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();


/* ═══════════════════════════════════════════
   NAVBAR — Scroll behavior & mobile toggle
═══════════════════════════════════════════ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const links     = document.querySelectorAll('.nav-link');

  // Scroll-based scrolled class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section highlight
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });

  // Mobile hamburger
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close on nav link click (mobile)
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
})();


/* ═══════════════════════════════════════════
   ROLE TYPEWRITER EFFECT
═══════════════════════════════════════════ */
(function initTypewriter() {
  const el = document.getElementById('role-text');
  if (!el) return;

  const roles = [
    'Aspiring AI Product Manager',
    'Product × Data × Technology',
    'Technical Product Manager',
    'AI Product Strategist',
    'Growth & Product Enthusiast',
  ];
  let rIdx = 0, cIdx = 0, isDeleting = false;

  function type() {
    const current = roles[rIdx];

    if (!isDeleting) {
      el.textContent = current.substring(0, cIdx + 1);
      cIdx++;
      if (cIdx === current.length) {
        isDeleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      el.textContent = current.substring(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        isDeleting = false;
        rIdx = (rIdx + 1) % roles.length;
      }
    }
    setTimeout(type, isDeleting ? 55 : 90);
  }
  type();
})();


/* ═══════════════════════════════════════════
   GSAP SCROLL ANIMATIONS
═══════════════════════════════════════════ */
(function initAnimations() {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  // Section headers
  document.querySelectorAll('.section-header').forEach(el => {
    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      { scrollTrigger: { trigger: el, start: 'top 85%', once: true }, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  });

  // About grid
  gsap.fromTo('.about-text',
    { x: -50, opacity: 0 },
    { scrollTrigger: { trigger: '.about-text', start: 'top 85%', once: true }, x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
  );
  gsap.fromTo('.skills-container',
    { x: 50, opacity: 0 },
    { scrollTrigger: { trigger: '.skills-container', start: 'top 85%', once: true }, x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
  );

  // Timeline items stagger
  gsap.fromTo('.timeline-item',
    { y: 50, opacity: 0 },
    { scrollTrigger: { trigger: '.timeline', start: 'top 80%', once: true }, y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
  );

  // Project cards stagger
  gsap.fromTo('.project-card',
    { y: 60, opacity: 0 },
    { scrollTrigger: { trigger: '.projects-grid', start: 'top 80%', once: true }, y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
  );

  // Case study cards & blog cards stagger
  gsap.fromTo('.case-card, .blog-card',
    { y: 50, opacity: 0 },
    { scrollTrigger: { trigger: '.case-grid, .blog-grid', start: 'top 85%', once: true }, y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
  );

  // Contact grid
  gsap.fromTo('.contact-info',
    { x: -40, opacity: 0 },
    { scrollTrigger: { trigger: '.contact-grid', start: 'top 85%', once: true }, x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
  );
  gsap.fromTo('.contact-form-container',
    { x: 40, opacity: 0 },
    { scrollTrigger: { trigger: '.contact-grid', start: 'top 85%', once: true }, x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
  );

  // Stat counters
  document.querySelectorAll('.stat-number').forEach(el => {
    const targetText = el.textContent;
    const target = parseInt(targetText);
    if (isNaN(target)) return;
    const suffix = targetText.replace(/[0-9]/g, '');
    const obj = { val: 0 };

    gsap.to(obj, {
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.round(obj.val) + suffix;
      }
    });

    // Explicitly set to 0 initially
    el.textContent = '0' + suffix;
  });
})();


/* ═══════════════════════════════════════════
   3D PROJECT CARD TILT
═══════════════════════════════════════════ */
(function initCardTilt() {
  document.querySelectorAll('.project-card, .blog-card, .case-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const tiltX  = dy * -6;
      const tiltY  = dx *  6;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ═══════════════════════════════════════════
   CONTACT FORM — EmailJS
═══════════════════════════════════════════ */
(function initContactForm() {
  const form      = document.getElementById('contact-form');
  const fields    = document.getElementById('form-fields');
  const success   = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      showFormError('Please fill in all required fields.');
      return;
    }
    if (!isValidEmail(email)) {
      showFormError('Please enter a valid email address.');
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').style.display  = 'none';
    submitBtn.querySelector('.btn-loading').style.display = 'inline-flex';
    submitBtn.querySelector('.btn-icon').style.display   = 'none';

    // Build mailto link as a reliable fallback
    // Also attempt EmailJS if configured
    const emailjsAvailable = typeof emailjs !== 'undefined' &&
      window.EMAILJS_SERVICE_ID && window.EMAILJS_TEMPLATE_ID && window.EMAILJS_PUBLIC_KEY;

    if (emailjsAvailable) {
      try {
        await emailjs.send(
          window.EMAILJS_SERVICE_ID,
          window.EMAILJS_TEMPLATE_ID,
          { from_name: name, from_email: email, subject, message },
          window.EMAILJS_PUBLIC_KEY
        );
        showSuccess();
      } catch (err) {
        console.warn('EmailJS failed, falling back to mailto:', err);
        openMailto(name, email, subject, message);
        showSuccess();
      }
    } else {
      // Fallback: open mailto
      openMailto(name, email, subject, message);
      showSuccess();
    }
  });

  function openMailto(name, email, subject, message) {
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const href = `mailto:tirthchokshi20@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  function showSuccess() {
    fields.style.display   = 'none';
    success.style.display  = 'block';
    submitBtn.disabled     = false;
    submitBtn.querySelector('.btn-text').style.display    = 'inline';
    submitBtn.querySelector('.btn-loading').style.display = 'none';
    submitBtn.querySelector('.btn-icon').style.display    = 'inline';
    form.reset();
  }

  function showFormError(msg) {
    // Remove old errors
    const old = form.querySelector('.form-error-msg');
    if (old) old.remove();
    const err = document.createElement('p');
    err.className = 'form-error-msg';
    err.style.cssText = 'color:#ff6b6b;font-size:13px;margin-bottom:12px;';
    err.textContent = msg;
    const submitRow = submitBtn.parentNode;
    submitRow.insertBefore(err, submitBtn);
    setTimeout(() => err.remove(), 4000);

    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').style.display    = 'inline';
    submitBtn.querySelector('.btn-loading').style.display = 'none';
    submitBtn.querySelector('.btn-icon').style.display    = 'inline';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
})();


/* ═══════════════════════════════════════════
   SKILLS TAGS — Staggered entrance
═══════════════════════════════════════════ */
(function initSkillTags() {
  if (typeof gsap === 'undefined') return;
  document.querySelectorAll('.skills-category').forEach((cat, ci) => {
    const tags = cat.querySelectorAll('.skill-tag');
    gsap.fromTo(tags,
      { scale: 0.8, opacity: 0 },
      {
        scrollTrigger: { trigger: cat, start: 'top 85%', once: true },
        scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(1.5)',
        delay: ci * 0.15
      }
    );
  });
})();


/* ═══════════════════════════════════════════
   SMOOTH CURSOR GLOW (desktop only)
═══════════════════════════════════════════ */
(function initCursorGlow() {
  if (window.innerWidth < 1024) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 350px; height: 350px; border-radius: 50%;
    background: radial-gradient(circle, rgba(79,138,255,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%); transition: opacity 0.4s;
    top: 0; left: 0;
  `;
  document.body.appendChild(glow);

  let currentX = 0, currentY = 0;
  let targetX  = 0, targetY  = 0;

  document.addEventListener('mousemove', e => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  (function animGlow() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    glow.style.left = currentX + 'px';
    glow.style.top  = currentY + 'px';
    requestAnimationFrame(animGlow);
  })();
})();


/* ═══════════════════════════════════════════
   CASE STUDY MODAL CONTROLLER
═══════════════════════════════════════════ */
(function initCaseModals() {
  const backdrops = document.querySelectorAll('.case-modal-backdrop');
  if (!backdrops.length) return;

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    // Only reset body overflow if no other modal is open
    const anyOpen = document.querySelector('.case-modal-backdrop.open');
    if (!anyOpen) {
      document.body.style.overflow = '';
    }
  }

  // Trigger buttons
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-open-modal');
      openModal(targetId);
    });
  });

  // Close buttons inside modals
  document.querySelectorAll('.case-modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.case-modal-backdrop');
      closeModal(modal);
    });
  });

  // Click outside to close
  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  // ESC key listener
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const openOne = document.querySelector('.case-modal-backdrop.open');
      if (openOne) closeModal(openOne);
    }
  });

  // Tab switching inside modals
  document.querySelectorAll('.modal-nav-tabs').forEach(tabGroup => {
    const tabBtns = tabGroup.querySelectorAll('.modal-tab-btn');
    const modalDialog = tabGroup.closest('.case-modal-dialog');
    const panels = modalDialog ? modalDialog.querySelectorAll('.modal-tab-panel') : [];

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabTarget = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        panels.forEach(panel => {
          if (panel.getAttribute('data-panel') === tabTarget) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  });
})();

/* ═══════════════════════════════════════════
   FOOTER YEAR
═══════════════════════════════════════════ */
document.querySelectorAll('.footer-text').forEach(el => {
  el.innerHTML = el.innerHTML.replace(/2025/, new Date().getFullYear());
});

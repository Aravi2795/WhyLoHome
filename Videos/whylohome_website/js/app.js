/**
 * WHYLOHOME EVENT MANAGEMENT & DECOR — APPLICATION ENGINE
 * Features:
 * - Soulful "Kaadhalenum Thervezhudhi" (A.R. Rahman Classic) Slow Romantic BGM Engine with Expressive Flute & Warm Strings
 * - 3-Tier Categorized Showcase Gallery (Premium, Standard, Basic) with smooth filtering
 * - Interactive Budget & Package Estimator
 * - Venue Before & After Transformation Slider
 * - Enhanced Lightbox Preview Modal
 * - Fluid Navbar Scrollspy & Mobile Drawer
 * - Silk Stardust Canvas & Scroll Reveals
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initParticles();
  initHeroSlider();
  initStatsCounter();
  initBeforeAfterSlider();
  initPackageEstimator();
  init3TierGallery();
  initLightbox();
  initBookingForm();
  initNavbarScroll();
  initMobileMenu();
  initScrollAnimations();
  initAIAssistant();
});

/* ==========================================================================
   1. MULTI-THEME LUXURY ENGINE (4 PALETTES + QUICK SWITCH)
   Themes:
   - 'midnight' (Royal Midnight Gold - Dark)
   - 'pearl' / 'light' (Luxe Champagne Pearl - Light White)
   - 'emerald' (Emerald Palace Royale)
   - 'rosegold' (Rose Gold Romance)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const themePickerBtn = document.getElementById('themePickerBtn');
  const themeDropdownMenu = document.getElementById('themeDropdownMenu');
  const themeOptionBtns = document.querySelectorAll('.theme-option-btn');
  const activeLabel = document.getElementById('activeThemeLabel');

  const themeLabels = {
    'midnight': 'Royal Gold',
    'dark': 'Royal Gold',
    'pearl': 'Champagne Pearl',
    'light': 'Champagne Pearl',
    'emerald': 'Emerald Royale',
    'rosegold': 'Rose Gold'
  };

  function applyTheme(themeKey) {
    // Normalize light to pearl
    let normalized = themeKey;
    if (themeKey === 'light') normalized = 'pearl';
    if (themeKey === 'dark') normalized = 'midnight';

    document.documentElement.setAttribute('data-theme', normalized);
    localStorage.setItem('whylohome_theme', normalized);

    if (activeLabel) {
      activeLabel.textContent = themeLabels[normalized] || 'Theme';
    }

    themeOptionBtns.forEach(btn => {
      const val = btn.getAttribute('data-theme-val');
      btn.classList.toggle('active', val === normalized);
    });

    updateThemeIcon(normalized);
  }

  // Initial load
  const savedTheme = localStorage.getItem('whylohome_theme') || 'midnight';
  applyTheme(savedTheme);

  // Dropdown Open / Close
  if (themePickerBtn && themeDropdownMenu) {
    themePickerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDropdownMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!themeDropdownMenu.contains(e.target) && !themePickerBtn.contains(e.target)) {
        themeDropdownMenu.classList.remove('active');
      }
    });
  }

  // Theme Option Click
  themeOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const themeVal = btn.getAttribute('data-theme-val');
      applyTheme(themeVal);
      if (themeDropdownMenu) themeDropdownMenu.classList.remove('active');
    });
  });

  // Quick Toggle Button (Fast One-Click Switch between Midnight & Pearl)
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = (current === 'pearl' || current === 'light') ? 'midnight' : 'pearl';
      applyTheme(next);
    });
  }
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;
  const isLight = (theme === 'pearl' || theme === 'light');
  themeBtn.innerHTML = isLight
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
}

/* ==========================================================================
   2. DUAL & MULTI-THEME CELESTIAL BACKGROUND PARTICLE ENGINE
   Adapts in real-time between Midnight, Pearl, Emerald, and Rose Gold
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const count = Math.min(55, Math.floor(width / 24));

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.3 - 0.1,
      opacity: Math.random() * 0.55 + 0.25,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      type: Math.random() > 0.3 ? 'primary' : 'accent'
    });
  }

  function getThemeColors() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'midnight';

    if (currentTheme === 'pearl' || currentTheme === 'light') {
      return {
        primaryFill: (a) => `rgba(180, 120, 15, ${a * 0.75})`,
        accentFill: (a) => `rgba(217, 119, 6, ${a * 0.7})`,
        shadow: 'rgba(217, 119, 6, 0.3)',
        lineColor: (a) => `rgba(180, 120, 15, ${a * 0.15})`
      };
    } else if (currentTheme === 'emerald') {
      return {
        primaryFill: (a) => `rgba(252, 216, 100, ${a * 0.9})`,
        accentFill: (a) => `rgba(16, 185, 129, ${a * 0.85})`,
        shadow: 'rgba(252, 216, 100, 0.45)',
        lineColor: (a) => `rgba(252, 216, 100, ${a * 0.12})`
      };
    } else if (currentTheme === 'rosegold') {
      return {
        primaryFill: (a) => `rgba(244, 166, 166, ${a * 0.9})`,
        accentFill: (a) => `rgba(244, 114, 182, ${a * 0.85})`,
        shadow: 'rgba(244, 166, 166, 0.45)',
        lineColor: (a) => `rgba(244, 166, 166, ${a * 0.14})`
      };
    } else {
      // Midnight Dark
      return {
        primaryFill: (a) => `rgba(245, 198, 77, ${a})`,
        accentFill: (a) => `rgba(52, 211, 153, ${a * 0.85})`,
        shadow: 'rgba(245, 198, 77, 0.5)',
        lineColor: (a) => `rgba(245, 198, 77, ${a * 0.12})`
      };
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const colors = getThemeColors();

    // 1. Draw subtle constellation connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 95) {
          const lineAlpha = (1 - dist / 95);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = colors.lineColor(lineAlpha);
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    // 2. Draw & update individual particles
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.006;
      
      if (p.opacity > 0.85) p.opacity = 0.85;
      if (p.opacity < 0.2) p.opacity = 0.2;

      if (p.y < -15) { p.y = height + 15; p.x = Math.random() * width; }
      if (p.x < -15) p.x = width + 15;
      if (p.x > width + 15) p.x = -15;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.type === 'primary' ? colors.primaryFill(p.opacity) : colors.accentFill(p.opacity);
      ctx.shadowBlur = 8;
      ctx.shadowColor = colors.shadow;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   3. HERO SLIDESHOW ENGINE
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.pagination-dot');
  const prevBtn = document.querySelector('.hero-nav-arrow.prev');
  const nextBtn = document.querySelector('.hero-nav-arrow.next');
  const progressBar = document.querySelector('.hero-progress-bar');
  
  if (!slides.length) return;

  let currentSlide = 0;
  const slideDuration = 6000;
  let slideInterval;
  let progressInterval;
  let progress = 0;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    currentSlide = index;
    resetProgress();
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function resetProgress() {
    progress = 0;
    if (progressBar) progressBar.style.width = '0%';
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, slideDuration);
    
    if (progressBar) {
      const step = 50;
      progressInterval = setInterval(() => {
        progress += (step / slideDuration) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
      }, step);
    }
  }

  function stopAutoplay() {
    clearInterval(slideInterval);
    clearInterval(progressInterval);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(index);
      startAutoplay();
    });
  });

  // Touch Swipe for Mobile
  const slider = document.querySelector('.hero-slider');
  if (slider) {
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    slider.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) nextSlide();
      if (touchEndX - touchStartX > 50) prevSlide();
      startAutoplay();
    }, { passive: true });

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
  }

  showSlide(0);
  startAutoplay();
}

/* ==========================================================================
   4. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetStr = el.getAttribute('data-target') || '0';
        const isDecimal = targetStr.includes('.');
        const target = parseFloat(targetStr);
        const suffix = el.getAttribute('data-suffix') || '';
        let count = 0;
        const duration = 1600;
        const stepTime = 25;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const counter = setInterval(() => {
          count += increment;
          if (count >= target) {
            el.textContent = `${isDecimal ? target.toFixed(1) : target}${suffix}`;
            clearInterval(counter);
          } else {
            el.textContent = `${isDecimal ? count.toFixed(1) : Math.floor(count)}${suffix}`;
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}

/* ==========================================================================
   5. MODERN 60FPS VENUE MAGIC TRANSFORMATION ENGINE (ZERO LAG)
   Features:
   - GPU-accelerated requestAnimationFrame slider tracking
   - Cinematic Auto-Scan Magic mode with laser sweep
   - 50/50 Split View and interactive stage concept selector
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('beforeAfterContainer');
  const handle = document.getElementById('baHandle');
  const tooltip = document.getElementById('baTooltip');
  const beforeImgTag = document.getElementById('baBeforeImgTag');
  const afterImgTag = document.getElementById('baAfterImgTag');
  const afterBadge = document.getElementById('baAfterBadge');

  // Controls
  const btnDrag = document.getElementById('baModeDrag');
  const btnAuto = document.getElementById('baModeAuto');
  const btnSplit = document.getElementById('baModeSplit');
  const stagePills = document.querySelectorAll('.ba-stage-pill');

  if (!container || !handle) return;

  let isDragging = false;
  let isAutoScanning = false;
  let autoScanRafId = null;
  let currentPos = 50; // percentage
  let targetPos = 50;
  let isRendering = false;

  function renderPosition(pos) {
    currentPos = Math.max(0, Math.min(100, pos));
    container.style.setProperty('--split-pos', `${currentPos.toFixed(2)}%`);
    if (tooltip) {
      tooltip.textContent = `${Math.round(currentPos)}% Transformed`;
    }
  }

  function onPointerMove(clientX) {
    if (!isDragging) return;
    const rect = container.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    targetPos = Math.max(0, Math.min(100, pos));

    if (!isRendering) {
      isRendering = true;
      requestAnimationFrame(() => {
        renderPosition(targetPos);
        isRendering = false;
      });
    }
  }

  // Pointer & Touch Listeners with Hardware Acceleration
  container.addEventListener('pointerdown', (e) => {
    stopAutoScan();
    isDragging = true;
    container.setPointerCapture(e.pointerId);
    onPointerMove(e.clientX);
    if (btnDrag) {
      document.querySelectorAll('.ba-control-btn').forEach(b => b.classList.remove('active'));
      btnDrag.classList.add('active');
    }
  });

  container.addEventListener('pointermove', (e) => {
    if (isDragging) onPointerMove(e.clientX);
  });

  container.addEventListener('pointerup', (e) => {
    if (isDragging) {
      isDragging = false;
      try { container.releasePointerCapture(e.pointerId); } catch (err) {}
    }
  });

  container.addEventListener('pointercancel', (e) => {
    isDragging = false;
    try { container.releasePointerCapture(e.pointerId); } catch (err) {}
  });

  // Mode: Auto-Scan Magic
  function startAutoScan() {
    stopAutoScan();
    isAutoScanning = true;
    if (btnAuto) {
      document.querySelectorAll('.ba-control-btn').forEach(b => b.classList.remove('active'));
      btnAuto.classList.add('active');
    }

    const startTime = performance.now();
    function scanStep(now) {
      if (!isAutoScanning) return;
      const elapsed = (now - startTime) / 1000;
      // Smooth sinusoidal glide back and forth between 12% and 88%
      const scanPos = 50 + Math.sin(elapsed * 1.6) * 38;
      renderPosition(scanPos);
      autoScanRafId = requestAnimationFrame(scanStep);
    }
    autoScanRafId = requestAnimationFrame(scanStep);
  }

  function stopAutoScan() {
    if (isAutoScanning) {
      isAutoScanning = false;
      if (autoScanRafId) cancelAnimationFrame(autoScanRafId);
    }
  }

  if (btnAuto) {
    btnAuto.addEventListener('click', () => {
      startAutoScan();
    });
  }

  if (btnDrag) {
    btnDrag.addEventListener('click', () => {
      stopAutoScan();
      document.querySelectorAll('.ba-control-btn').forEach(b => b.classList.remove('active'));
      btnDrag.classList.add('active');
      renderPosition(50);
    });
  }

  if (btnSplit) {
    btnSplit.addEventListener('click', () => {
      stopAutoScan();
      document.querySelectorAll('.ba-control-btn').forEach(b => b.classList.remove('active'));
      btnSplit.classList.add('active');
      renderPosition(50);
    });
  }

  // Transformed Stage Concept Switcher
  stagePills.forEach(pill => {
    pill.addEventListener('click', () => {
      stagePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const newBefore = pill.getAttribute('data-stage-before');
      const newImg = pill.getAttribute('data-stage-img');
      const newTitle = pill.getAttribute('data-stage-title');

      if (beforeImgTag && newBefore) {
        beforeImgTag.style.opacity = '0';
        setTimeout(() => {
          beforeImgTag.src = newBefore;
          beforeImgTag.style.opacity = '1';
        }, 150);
      }

      if (afterImgTag && newImg) {
        afterImgTag.style.opacity = '0';
        setTimeout(() => {
          afterImgTag.src = newImg;
          afterImgTag.style.opacity = '1';
        }, 150);
      }

      if (afterBadge && newTitle) {
        afterBadge.innerHTML = `<span class="badge-dot dot-gold"></span> ${newTitle}`;
      }
    });
  });

  renderPosition(50);
}

/* ==========================================================================
   6. 3-TIER CATEGORIZED SHOWCASE GALLERY (Premium, Standard, Basic)
   ========================================================================== */
function init3TierGallery() {
  const tierTabs = document.querySelectorAll('.tier-tab-btn');
  const sampleCards = document.querySelectorAll('.sample-card');
  const bannerTitle = document.getElementById('tierBannerTitle');
  const bannerDesc = document.getElementById('tierBannerDesc');
  const bannerPrice = document.getElementById('tierBannerPrice');

  const tierInfoData = {
    'all': {
      title: '🌟 All Celebration Collections',
      desc: 'Explore our complete portfolio ranging from essential celebration packages to palace-grade royal wedding architecture across Salem & Tamil Nadu.',
      price: '👑 Complete Celebration Portfolio'
    },
    'premium': {
      title: '👑 1) Premium Showcase — Royal & Palace Grandeur',
      desc: 'Our flagship luxury productions: 45ft+ curved velvet floral walls, dense cascading fresh jasmine canopies, 5+ hanging Bohemian crystal chandeliers, laser-cut jaali domes, and hand-carved heritage throne sets.',
      price: '👑 Bespoke Royal Productions'
    },
    'standard': {
      title: '✨ 2) Standard Showcase — Classic Elegance & Festive Charm',
      desc: 'Our popular curated real stages: marble texture multi-arches, white palace pavilions with crimson florals, royal gold canopies, pastel floral crests, mahogany pergolas, and sacred kolam mandaps.',
      price: '✨ Curated Elegant Concepts'
    },
    'basic': {
      title: '🌟 3) Basic Showcase — Essential & Vibrant Celebrations',
      desc: 'High-impact, joyful packages tailored for birthday parties, intimate family ceremonies, welcome hostesses, live Teddy mascots, and traditional Kalyana Melam vidwans.',
      price: '🌟 Essential Celebration Sets'
    }
  };

  tierTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tierTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selectedTier = tab.getAttribute('data-tier');

      // Update Header Banner
      if (tierInfoData[selectedTier]) {
        if (bannerTitle) bannerTitle.innerHTML = tierInfoData[selectedTier].title;
        if (bannerDesc) bannerDesc.textContent = tierInfoData[selectedTier].desc;
        if (bannerPrice) bannerPrice.textContent = tierInfoData[selectedTier].price;
      }

      // Filter Sample Cards with smooth stagger animation
      sampleCards.forEach(card => {
        const cardTier = card.getAttribute('data-tier');
        if (selectedTier === 'all' || cardTier === selectedTier) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   7. ENHANCED LIGHTBOX WITH SLIDE NAVIGATION
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const sampleImages = document.querySelectorAll('.sample-img-wrap, .sample-view-btn');

  if (!modal || !modalImg) return;

  sampleImages.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = trigger.closest('.sample-card');
      if (!card) return;

      const img = card.querySelector('.sample-img');
      const title = card.querySelector('.sample-title')?.textContent || 'Whylohome Luxury Showcase';
      const tier = card.querySelector('.sample-tier-tag')?.textContent || '';

      modalImg.src = img.src;
      if (modalCaption) {
        modalCaption.innerHTML = `<strong>${title}</strong> &bull; <span style="color: var(--text-gold);">${tier}</span>`;
      }
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('active');
  });
}

/* ==========================================================================
   8. INTERACTIVE BUDGET & PACKAGE ESTIMATOR
   ========================================================================== */
function initPackageEstimator() {
  const eventCards = document.querySelectorAll('.calc-event-card');
  const tierCards = document.querySelectorAll('.calc-tier-card');
  const guestSlider = document.getElementById('guestCountSlider');
  const guestDisplay = document.getElementById('guestCountDisplay');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
  const totalPriceDisplay = document.getElementById('calcTotalPrice');
  const packageTierTitle = document.getElementById('calcTierTitle');
  const sendQuoteBtn = document.getElementById('sendWhatsappQuoteBtn');

  if (!guestSlider || !totalPriceDisplay) return;

  const eventBaseRates = {
    'wedding': 45000,
    'engagement': 30000,
    'babyshower': 25000,
    'birthday': 20000,
    'political': 60000,
    'housewarming': 22000
  };

  const tierMultipliers = {
    'classic': 1.0,
    'royal': 1.5,
    'imperial': 2.2
  };

  let selectedEvent = 'wedding';
  let selectedTier = 'royal';
  let guests = parseInt(guestSlider.value, 10);

  const eventDisplayNames = {
    'wedding': 'WEDDING',
    'engagement': 'ENGAGEMENT',
    'babyshower': 'BABY SHOWER',
    'birthday': 'BIRTHDAY',
    'college': 'COLLEGE & PUBLIC',
    'political': 'COLLEGE & PUBLIC',
    'housewarming': 'HOUSEWARMING'
  };

  function calculateQuote() {
    const selectedAddonNames = [];

    addonCheckboxes.forEach(chk => {
      const parent = chk.closest('.addon-checkbox-label');
      if (chk.checked) {
        parent.classList.add('checked');
        selectedAddonNames.push(chk.getAttribute('data-name') || chk.nextElementSibling?.textContent?.trim());
      } else {
        parent.classList.remove('checked');
      }
    });

    totalPriceDisplay.textContent = 'Custom Quote on Request';
    
    const eventNameFormatted = eventDisplayNames[selectedEvent] || selectedEvent.toUpperCase();

    if (packageTierTitle) {
      packageTierTitle.textContent = `${selectedTier.toUpperCase()} ${eventNameFormatted} PACKAGE`;
    }

    if (sendQuoteBtn) {
      const addonsSummary = selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : 'Base Stage & Decor Setup';
      const whatsappMsg = encodeURIComponent(
        `🌟 *WHYLOHOME EVENT PACKAGE ESTIMATE* 🌟\n\n` +
        `• *Event Type:* ${eventNameFormatted}\n` +
        `• *Package Tier:* ${selectedTier.toUpperCase()}\n` +
        `• *Estimated Guests:* ${guests} Guests\n` +
        `• *Selected Add-ons:* ${addonsSummary}\n\n` +
        `Hello Whylohome Team, I customized this event package on your website and would like to receive an official quote & confirm date availability!`
      );
      sendQuoteBtn.href = `https://wa.me/916383159866?text=${whatsappMsg}`;
    }
  }

  eventCards.forEach(card => {
    card.addEventListener('click', () => {
      eventCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedEvent = card.getAttribute('data-event');
      calculateQuote();
    });
  });

  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      tierCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedTier = card.getAttribute('data-tier');
      calculateQuote();
    });
  });

  guestSlider.addEventListener('input', (e) => {
    guests = parseInt(e.target.value, 10);
    if (guestDisplay) guestDisplay.textContent = `${guests} Guests`;
    calculateQuote();
  });

  addonCheckboxes.forEach(chk => {
    chk.addEventListener('change', calculateQuote);
  });

  calculateQuote();
}

/* ==========================================================================
   9. BOOKING FORM & DIRECT WHATSAPP SUBMIT
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('eventBookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('bookName')?.value.trim();
    const phone = document.getElementById('bookPhone')?.value.trim();
    const eventType = document.getElementById('bookEventType')?.value;
    const eventDate = document.getElementById('bookDate')?.value;
    const location = document.getElementById('bookLocation')?.value.trim();
    const guestCount = document.getElementById('bookGuests')?.value;
    const requirements = document.getElementById('bookNotes')?.value.trim();

    if (!name || !phone || !eventDate) {
      alert('Please fill in your Name, Phone Number, and Event Date.');
      return;
    }

    const message = encodeURIComponent(
      `🎊 *NEW EVENT BOOKING INQUIRY — WHYLOHOME* 🎊\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `🎉 *Event:* ${eventType}\n` +
      `📅 *Date:* ${eventDate}\n` +
      `📍 *Location / Venue:* ${location || 'Salem / Tamil Nadu'}\n` +
      `👥 *Guest Count:* ${guestCount || 'Not specified'}\n` +
      `📝 *Notes / Services Requested:* ${requirements || 'All Event Services Required'}\n\n` +
      `Please check date availability and share catalog & quote!`
    );

    window.open(`https://wa.me/916383159866?text=${message}`, '_blank');
    
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '✓ Inquiry Sent via WhatsApp!';
      submitBtn.style.background = '#22C55E';
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        form.reset();
      }, 4000);
    }
  });
}

/* ==========================================================================
   10. NAVBAR SCROLL & SMOOTH NAVIGATION SCROLLSPY
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 60) {
      if (navbar) navbar.classList.add('scrolled');
      if (backToTopBtn) backToTopBtn.classList.add('visible');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
      if (backToTopBtn) backToTopBtn.classList.remove('visible');
    }

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ==========================================================================
   12. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuBtn.innerHTML = navMenu.classList.contains('open') ? '✕' : '☰';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuBtn.innerHTML = '☰';
    });
  });
}

/* ==========================================================================
   13. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   14. LUXURY AI EVENT CONCIERGE & ADVISOR ENGINE
   ========================================================================== */
function initAIAssistant() {
  const toggleBtn = document.getElementById('aiChatToggleBtn');
  const chatWindow = document.getElementById('aiChatWindow');
  const closeBtn = document.getElementById('aiChatClose');
  const minimizeBtn = document.getElementById('aiChatMinimize');
  const chatForm = document.getElementById('aiChatForm');
  const chatInput = document.getElementById('aiChatInput');
  const messagesContainer = document.getElementById('aiChatMessages');
  const promptChips = document.querySelectorAll('.ai-prompt-chip');

  if (!toggleBtn || !chatWindow) return;

  function toggleChat() {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active') && chatInput) {
      setTimeout(() => chatInput.focus(), 200);
    }
  }

  toggleBtn.addEventListener('click', toggleChat);
  if (closeBtn) closeBtn.addEventListener('click', () => chatWindow.classList.remove('active'));
  if (minimizeBtn) minimizeBtn.addEventListener('click', () => chatWindow.classList.remove('active'));

  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  function appendUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'ai-msg ai-msg-user';
    msgDiv.innerHTML = `
      <div class="ai-msg-avatar">👤</div>
      <div class="ai-msg-bubble">
        <p>${escapeHTML(text)}</p>
      </div>
    `;
    messagesContainer.appendChild(msgDiv);
    scrollToBottom();
  }

  function appendBotTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-msg ai-msg-bot ai-typing-indicator';
    typingDiv.id = 'aiTypingIndicator';
    typingDiv.innerHTML = `
      <div class="ai-msg-avatar">✨</div>
      <div class="ai-msg-bubble" style="color: var(--text-gold); font-style: italic;">
        <span>Crafting your event recommendations...</span>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    scrollToBottom();
  }

  function removeBotTyping() {
    const typingEl = document.getElementById('aiTypingIndicator');
    if (typingEl) typingEl.remove();
  }

  function appendBotMessage(htmlContent) {
    removeBotTyping();
    const msgDiv = document.createElement('div');
    msgDiv.className = 'ai-msg ai-msg-bot';
    msgDiv.innerHTML = `
      <div class="ai-msg-avatar">✨</div>
      <div class="ai-msg-bubble">
        ${htmlContent}
      </div>
    `;
    messagesContainer.appendChild(msgDiv);
    scrollToBottom();
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  function generateAIResponse(userText) {
    const query = userText.toLowerCase().trim();

    // 1. Stages & Gallery
    if (query.includes('stage') || query.includes('mandap') || query.includes('decor') || query.includes('collection') || query.includes('tier')) {
      return `
        <p><strong>👑 Whylohome Decor Collections:</strong></p>
        <p>We provide 3 curated tiers of bespoke stage architecture:</p>
        <ul style="margin: 0.4rem 0 0.6rem 1.2rem; font-size: 0.8rem; line-height: 1.5;">
          <li><strong>1) Premium Showcase:</strong> 45ft+ curved velvet floral walls, 5+ Bohemian crystal chandeliers & royal throne sets.</li>
          <li><strong>2) Standard Showcase:</strong> Marble arches, crimson & pastel floral crests, and mahogany pergolas.</li>
          <li><strong>3) Basic Showcase:</strong> Sunburst lotus petals, white silk waterfall drapery, and balloon architecture.</li>
        </ul>
        <a href="#gallery" class="ai-chat-btn-action" onclick="document.getElementById('aiChatWindow').classList.remove('active')">
          <span>🖼️ Explore 3-Tier Gallery</span>
        </a>
      `;
    }

    // 2. Pricing & Cost Estimation
    if (query.includes('cost') || query.includes('price') || query.includes('budget') || query.includes('rate') || query.includes('how much') || query.includes('estimate')) {
      return `
        <p><strong>💰 Bespoke Pricing & Customized Quotes:</strong></p>
        <p>We provide fully transparent, customized proposals tailored to your venue dimensions, guest count, and specific decor preferences.</p>
        <p>You can use our <strong>Live Interactive Cost Estimator</strong> to configure options, or connect directly on WhatsApp for an instant customized quote!</p>
        <a href="#estimator" class="ai-chat-btn-action" onclick="document.getElementById('aiChatWindow').classList.remove('active')">
          <span>🧮 Open Live Cost Estimator</span>
        </a>
      `;
    }

    // 3. Catering, DJ, Melam & Services
    if (query.includes('cater') || query.includes('food') || query.includes('dj') || query.includes('sound') || query.includes('photo') || query.includes('video') || query.includes('melam') || query.includes('mascot') || query.includes('hostess') || query.includes('service')) {
      return `
        <p><strong>🌟 All-in-One Event Services:</strong></p>
        <ul style="margin: 0.4rem 0 0.6rem 1.2rem; font-size: 0.8rem; line-height: 1.5;">
          <li><strong>🍽️ Gourmet Catering:</strong> Traditional banana leaf feasts, live counters & dessert buffets.</li>
          <li><strong>🎵 DJ & Sound:</strong> JBL VRX Line Array, moving head beams & haze fog.</li>
          <li><strong>🪕 Kalyana Melam:</strong> Nadaswaram & Thavil vidwans for sacred muhurthams.</li>
          <li><strong>📸 4K Drone & Cinematography:</strong> Candid wedding films & traditional reels.</li>
          <li><strong>🧸 Mascot & Hostesses:</strong> Giant dancing Teddy mascots & silk saree hostesses.</li>
        </ul>
        <a href="#services" class="ai-chat-btn-action" onclick="document.getElementById('aiChatWindow').classList.remove('active')">
          <span>⚡ View All Services</span>
        </a>
      `;
    }

    // 4. Locations & Coverage
    if (query.includes('salem') || query.includes('attur') || query.includes('erode') || query.includes('namakkal') || query.includes('dharmapuri') || query.includes('coimbatore') || query.includes('hosur') || query.includes('location') || query.includes('where') || query.includes('area') || query.includes('tamil nadu')) {
      return `
        <p><strong>📍 Service Coverage:</strong></p>
        <p>Our headquarters and central production warehouse are based in <strong>Salem, Tamil Nadu</strong>.</p>
        <p>Our fleet & decor crew actively travel across <strong>Salem, Attur, Erode, Namakkal, Dharmapuri, Coimbatore, Hosur, Chennai</strong>, and all districts in Tamil Nadu with zero logistical compromise.</p>
        <a href="#contact" class="ai-chat-btn-action" onclick="document.getElementById('aiChatWindow').classList.remove('active')">
          <span>🗺️ View Office & Map</span>
        </a>
      `;
    }

    // 5. Booking, Contact & WhatsApp
    if (query.includes('book') || query.includes('date') || query.includes('contact') || query.includes('phone') || query.includes('call') || query.includes('whatsapp') || query.includes('number') || query.includes('director')) {
      return `
        <p><strong>📅 Booking & Fast Connect:</strong></p>
        <p>You can reach our Senior Event Directors directly at:</p>
        <ul style="margin: 0.4rem 0 0.6rem 1.2rem; font-size: 0.8rem; line-height: 1.5;">
          <li>📞 <strong>63831 59866</strong> (Primary Dispatch)</li>
          <li>📞 <strong>82485 04908</strong></li>
          <li>📞 <strong>63823 40520</strong></li>
        </ul>
        <a href="https://wa.me/916383159866?text=Hi%20Whylohome,%20I%20am%20chatting%20with%20your%20AI%20Assistant%20and%20would%20like%20to%20book%20an%20event%20consultation!" target="_blank" rel="noopener" class="ai-chat-btn-action">
          <span>💬 Chat on WhatsApp Directly</span>
        </a>
      `;
    }

    // 6. Occasions (Engagement, Birthday, Seemantham, Wedding)
    if (query.includes('wedding') || query.includes('marriage') || query.includes('engagement') || query.includes('reception') || query.includes('birthday') || query.includes('baby') || query.includes('seemantham') || query.includes('housewarming') || query.includes('gruhapravesam')) {
      return `
        <p><strong>🎉 Customized Celebration Management:</strong></p>
        <p>Whether it's a traditional South Indian wedding, modern engagement reception, colorful baby shower (Seemantham), or milestone birthday, we handle end-to-end decor, lighting, catering, and entertainment!</p>
        <a href="#booking" class="ai-chat-btn-action" onclick="document.getElementById('aiChatWindow').classList.remove('active')">
          <span>📝 Reserve Your Date Now</span>
        </a>
      `;
    }

    // Default Friendly AI Response
    return `
      <p>Thank you for asking! I'm here to help you design a stunning celebration with <strong>WHYLOHOME Event Management</strong>.</p>
      <p>Would you like to explore our <strong>Wedding Stages</strong>, calculate an <strong>Instant Budget</strong>, or connect directly with our director on <strong>WhatsApp</strong>?</p>
      <a href="https://wa.me/916383159866?text=Hello%20Whylohome,%20I'm%20inquiring%20about%20event%20management%20services!" target="_blank" rel="noopener" class="ai-chat-btn-action">
        <span>💬 Instant WhatsApp Inquiry</span>
      </a>
    `;
  }

  function handleUserQuery(text) {
    if (!text || !text.trim()) return;
    appendUserMessage(text);
    if (chatInput) chatInput.value = '';

    appendBotTyping();
    setTimeout(() => {
      const responseHTML = generateAIResponse(text);
      appendBotMessage(responseHTML);
    }, 600);
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserQuery(chatInput.value);
    });
  }

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.getAttribute('data-prompt') || chip.textContent;
      handleUserQuery(promptText);
    });
  });
}

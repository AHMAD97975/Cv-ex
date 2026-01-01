// script.js - مصحح ومنظم
// وظائف: قائمة محمولة، زر عائم، إظهار/إخفاء الهيدر عند التمرير، تبديل اللغة، تنزيل/طباعة السيرة (pdf إذا توفر html2pdf).

(() => {
  // عناصر رئيسية
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinksPanel = document.querySelector('.nav-links');
  const mobileBackdrop = document.querySelector('.mobile-menu-backdrop');
  const floatingBtn = document.getElementById('floating-hamburger');
  const langText = document.getElementById('lang-text');
  let currentLang = 'ar';
  const SCROLL_DELTA = 10;
  let lastScroll = 0;
  let scrollThrottle = null;

  // Helper: create backdrop if missing
  function ensureBackdrop() {
    let backdrop = document.querySelector('.mobile-menu-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'mobile-menu-backdrop';
      backdrop.onclick = closeMobileMenu;
      document.body.appendChild(backdrop);
    }
    return backdrop;
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    if (!navLinksPanel || !hamburger) return;
    const isActive = navLinksPanel.classList.toggle('active');
    hamburger.classList.toggle('active', isActive);

    // aria
    hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    navLinksPanel.setAttribute('aria-hidden', isActive ? 'false' : 'true');

    // backdrop
    const backdrop = ensureBackdrop();
    backdrop.classList.toggle('active', isActive);

    // hide floating button when menu open
    if (floatingBtn) floatingBtn.classList.toggle('active', !isActive && window.pageYOffset > 120);
  }

  // Close menu
  function closeMobileMenu() {
    if (navLinksPanel) navLinksPanel.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    if (backdrop) backdrop.classList.remove('active');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    if (navLinksPanel) navLinksPanel.setAttribute('aria-hidden', 'true');
    // show floating button if appropriate
    if (floatingBtn && window.innerWidth <= 768 && window.pageYOffset > 120) floatingBtn.classList.add('active');
  }

  // Scroll handler: hide/show navbar, show floating button on mobile when scrolling down
  function handleScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (Math.abs(st - lastScroll) < SCROLL_DELTA) return;

    if (st <= 80) {
      navbar.classList.remove('hidden'); navbar.classList.add('visible');
      if (floatingBtn) floatingBtn.classList.remove('active');
    } else if (st > lastScroll) {
      // down
      navbar.classList.remove('visible'); navbar.classList.add('hidden');
      if (window.innerWidth <= 768 && floatingBtn) floatingBtn.classList.add('active');
    } else {
      // up
      navbar.classList.remove('hidden'); navbar.classList.add('visible');
      if (floatingBtn) floatingBtn.classList.remove('active');
    }

    lastScroll = Math.max(0, st);
  }

  // Throttled scroll
  function onScrollThrottled() {
    if (scrollThrottle) return;
    scrollThrottle = setTimeout(() => {
      handleScroll();
      activateNavLinkOnScroll(); // keep nav highlight sync
      scrollThrottle = null;
    }, 120);
  }

  // Smooth scroll with header offset
  function scrollToWithOffset(targetEl) {
    const headerHeight = navbar ? navbar.offsetHeight : 0;
    const rect = targetEl.getBoundingClientRect();
    const top = rect.top + window.pageYOffset - headerHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  // Language toggle (uses data-ar/data-en when present)
  function applyLanguage(lang) {
    const html = document.documentElement;
    if (lang === 'en') {
      html.setAttribute('lang', 'en'); html.setAttribute('dir', 'ltr');
      if (langText) langText.textContent = 'AR';
    } else {
      html.setAttribute('lang', 'ar'); html.setAttribute('dir', 'rtl');
      if (langText) langText.textContent = 'EN';
    }

    // swap elements with data-ar/data-en
    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
      const ar = el.getAttribute('data-ar');
      const en = el.getAttribute('data-en');
      if (lang === 'en') {
        if (!el.hasAttribute('data-original-ar')) el.setAttribute('data-original-ar', el.textContent.trim());
        el.textContent = en || ar;
      } else {
        const orig = el.getAttribute('data-original-ar');
        if (orig) el.textContent = orig;
        else el.textContent = ar;
        el.removeAttribute('data-original-ar');
      }
    });

    // adjust brand if present
    const brand = document.querySelector('.nav-brand');
    if (brand) brand.textContent = (lang === 'en') ? 'Moein Najem' : 'معين نجم';

    // adjust floating/backdrop positions by dir handled by CSS selectors
    localStorage.setItem('preferredLang', lang);
    currentLang = lang;
  }

  function toggleLanguage() {
    const newLang = (currentLang === 'ar') ? 'en' : 'ar';
    applyLanguage(newLang);
  }

  // PDF / Print: use html2pdf when available, otherwise print
  async function downloadCV() {
    const confirmed = confirm('هل تريد حفظ السيرة كملف PDF؟\nWould you like to save the CV as a PDF?');
    if (!confirmed) return;

    // Prepare: clone body, remove interactive bits
    const clone = document.body.cloneNode(true);
    // remove elements we don't want in pdf
    clone.querySelectorAll('.navbar, .hamburger-menu, .mobile-menu-backdrop, .floating-hamburger, .btn-download, .btn-lang, .nav-actions, .back-to-top, .mobile-only').forEach(n => n.remove());
    // remove active classes
    clone.querySelectorAll('.active').forEach(n => n.classList.remove('active'));

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.style.background = '#fff';
    wrapper.appendChild(clone);
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-9999px';
    document.body.appendChild(wrapper);

    // If html2pdf exists use it
    if (window.html2pdf) {
      const filenameEl = document.querySelector('.profile-name');
      const nameText = filenameEl ? filenameEl.textContent.trim().replace(/\s+/g, '_') : 'CV';
      const opt = {
        margin: [10, 12, 10, 12],
        filename: `${nameText}_CV.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      try {
        await window.html2pdf().set(opt).from(wrapper).save();
      } catch (err) {
        console.error('html2pdf error', err);
        alert('حدث خطأ أثناء إنشاء PDF. سيتم فتح نافذة الطباعة كبديل.');
        window.print();
      } finally {
        wrapper.remove();
      }
    } else {
      // fallback to print dialog
      alert('مكوّن توليد PDF غير متاح، سيتم فتح نافذة الطباعة. \nIf you prefer an actual file, include html2pdf.js in the page.');
      window.print();
      wrapper.remove();
    }
  }

  // Activate nav link on scroll (simple)
  function activateNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    const offset = (navbar ? navbar.offsetHeight : 0) + 120;
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top + window.pageYOffset - offset;
      if (window.pageYOffset >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  // Init - attach listeners
  document.addEventListener('DOMContentLoaded', () => {
    // ensure backdrop exists
    ensureBackdrop();

    // load language from storage
    const saved = localStorage.getItem('preferredLang');
    if (saved) {
      currentLang = saved;
      applyLanguage(currentLang);
    } else {
      currentLang = document.documentElement.getAttribute('lang') || 'ar';
      applyLanguage(currentLang);
    }

    // hamburger
    if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
    if (floatingBtn) floatingBtn.addEventListener('click', toggleMobileMenu);

    // close menu when clicking nav link (mobile)
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            closeMobileMenu();
            // short delay to allow menu close animation
            setTimeout(() => scrollToWithOffset(target), 100);
          }
        } else {
          closeMobileMenu();
        }
      });
    });

    // backdrop click already handled by element's onclick when created

    // smooth anchor links elsewhere
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href === '#' || !href.startsWith('#')) return;
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          scrollToWithOffset(el);
          closeMobileMenu();
        }
      });
    });

    // scroll listeners
    window.addEventListener('scroll', onScrollThrottled);
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMobileMenu();
    });

    // initial states
    handleScroll();
    activateNavLinkOnScroll();

    // Attach download button(s)
    document.querySelectorAll('.btn-download, .download-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        downloadCV();
      });
    });

    // accessibility: close mobile menu with Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });
  });

  // Expose some functions for HTML onclick attributes if used
  window.toggleMobileMenu = toggleMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
  window.toggleLanguage = toggleLanguage;
  window.downloadCV = downloadCV;

})();

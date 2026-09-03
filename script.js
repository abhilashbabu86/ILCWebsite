/* ============================================
   ILC — Indian Logistics Company
   JavaScript: nav, modals, forms, scroll
   ============================================ */

(function () {
  'use strict';

  // ============== CONFIG ==============
  // Forms are submitted via FormSubmit.co — a free service that forwards
  // form submissions to your email. No signup is needed; the FIRST time
  // a form is submitted, FormSubmit will send a confirmation email to
  // Info.indianlogisticscompany@gmail.com — click the link in that email once
  // to activate. After that, every submission arrives in your inbox.
  const FORM_EMAIL = 'Info.indianlogisticscompany@gmail.com';
  const FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + FORM_EMAIL;

  // ============== DOM REFS ==============
  const header = document.querySelector('.header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactModal = document.getElementById('contactModal');
  const quoteModal = document.getElementById('quoteModal');

  // ============== STICKY HEADER SHADOW ==============
  const onScroll = () => {
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    // active nav link
    updateActiveLink();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ============== MOBILE NAV ==============
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav after clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // ============== SMOOTH SCROLL & ACTIVE LINK ==============
  // Smooth scroll is mostly handled by CSS (scroll-behavior: smooth),
  // but we need to account for the sticky header height.
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      // Skip if this is a modal trigger (handled separately)
      if (this.classList.contains('js-open-contact') || this.classList.contains('js-open-quote')) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });

  function updateActiveLink() {
    const sections = ['home', 'about', 'services', 'industries', 'contact'];
    const headerHeight = header.offsetHeight;
    const scrollPos = window.scrollY + headerHeight + 100;

    let current = 'home';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) current = id;
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + current) link.classList.add('active');
    });
  }

  // ============== MODALS ==============
  function openModal(modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function closeAllModals() {
    document.querySelectorAll('.modal.open').forEach(closeModal);
  }

  document.querySelectorAll('.js-open-contact').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(contactModal);
    });
  });
  document.querySelectorAll('.js-open-quote').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(quoteModal);
    });
  });
  document.querySelectorAll('.js-close-modal').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  // ============== FORMS ==============
  // Submits to FormSubmit.co (AJAX). Plain JSON, no setup beyond the
  // first-time email verification described at the top of this file.
  function showStatus(statusEl, msg, ok) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.classList.remove('success', 'error');
    statusEl.classList.add(ok ? 'success' : 'error');
  }

  document.querySelectorAll('form.contact-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const statusEl = form.querySelector('.form-status');
      const originalBtnText = submitBtn.innerHTML;

      // Validate native
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Gather form data
      const formData = new FormData(form);
      const data = {};
      formData.forEach((v, k) => { data[k] = v; });

      // Build a friendly subject line
      const which = form.getAttribute('data-form') || 'website';
      data._subject = which === 'quote-popup'
        ? `New Quote Request from ${data.name || 'Website'}`
        : `New Enquiry from ${data.name || 'Website'} (${which})`;
      data._template = 'table';
      data._captcha = 'false';
      data._source = which;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> SENDING...';
      showStatus(statusEl, '', true);

      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const json = await res.json().catch(() => ({}));

        if (res.ok && (json.success === 'true' || json.success === true || res.status === 200)) {
          showStatus(statusEl, '✓ Thank you! Your message has been sent. We\'ll get back to you shortly.', true);
          form.reset();
          // Auto-close popup after a short delay if inside a modal
          const inModal = form.closest('.modal');
          if (inModal) {
            setTimeout(() => {
              closeModal(inModal);
              showStatus(statusEl, '', true);
            }, 2800);
          }
        } else {
          throw new Error(json.message || 'Submission failed');
        }
      } catch (err) {
        showStatus(statusEl, '✕ Sorry, something went wrong. Please email us directly at ' + FORM_EMAIL, false);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  });

  // ============== REVEAL ON SCROLL ==============
  const revealTargets = document.querySelectorAll(
    '.service-card, .industry-item, .why-item, .about-block, .stat, .section-heading'
  );

  if ('IntersectionObserver' in window) {
    revealTargets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement.children).filter(c => c.classList.contains('reveal'));
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = (index >= 0 ? Math.min(index, 6) * 80 : 0) + 'ms';
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 200px 0px' });

    revealTargets.forEach(el => observer.observe(el));

    // Safety net: if anything is still hidden after 1.2 seconds, reveal it.
    // Also reveal on print and reduced-motion preferences.
    setTimeout(() => {
      revealTargets.forEach(el => el.classList.add('visible'));
    }, 1200);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealTargets.forEach(el => el.classList.add('visible'));
    }
  }

  // ============== CURRENT YEAR (footer) ==============
  // (Static "© 2026" in HTML — but if you want it dynamic, uncomment:)
  // const yearEl = document.querySelector('.footer-bottom p');
  // if (yearEl) yearEl.textContent = `© ${new Date().getFullYear()} Indian Logistics Company (ILC). All Rights Reserved.`;

})();
